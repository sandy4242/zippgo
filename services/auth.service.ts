import { supabaseBrowser } from '@/lib/supabase/client';
import { UserRole } from '@/lib/types/user';

export interface SignUpData {
  email: string;
  password: string;
  fullName: string;
  phone?: string;
  role: UserRole;
  businessName?: string;
}

export interface SignInData {
  email: string;
  password: string;
}

class AuthService {
  // Sign up new user
  async signUp(data: SignUpData) {
    try {
      // Create auth user
      const { data: authData, error: authError } = await supabaseBrowser.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.fullName,
            role: data.role,
          },
        },
      });

      if (authError) throw authError;

      // Create profile based on role
      if (authData.user) {
        const profileData = {
          id: authData.user.id,
          email: data.email,
          full_name: data.fullName,
          phone: data.phone,
          role: data.role,
          ...(data.role === 'seller' && {
            business_name: data.businessName,
            verified: false,
          }),
        };

        const tableName = data.role === 'buyer' ? 'buyer_profiles' : 'seller_profiles';
        const { error: profileError } = await supabaseBrowser
          .from(tableName)
          .insert([profileData]);

        if (profileError) throw profileError;
      }

      return { data: authData, error: null };
    } catch (error: any) {
      return { data: null, error: error.message };
    }
  }

  // Sign in user
  async signIn(data: SignInData) {
    try {
      const { data: authData, error } = await supabaseBrowser.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) throw error;

      return { data: authData, error: null };
    } catch (error: any) {
      return { data: null, error: error.message };
    }
  }

  // Sign out
  async signOut() {
    try {
      const { error } = await supabaseBrowser.auth.signOut();
      if (error) throw error;
      return { error: null };
    } catch (error: any) {
      return { error: error.message };
    }
  }

  // Get current user
  async getCurrentUser() {
    try {
      const { data: { user }, error } = await supabaseBrowser.auth.getUser();
      if (error) throw error;
      return { user, error: null };
    } catch (error: any) {
      return { user: null, error: error.message };
    }
  }

  // Get user profile by role
  async getUserProfile(userId: string, role: UserRole) {
    try {
      const tableName = role === 'buyer' ? 'buyer_profiles' : 'seller_profiles';
      const { data, error } = await supabaseBrowser
        .from(tableName)
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;
      return { data, error: null };
    } catch (error: any) {
      return { data: null, error: error.message };
    }
  }

  // Reset password
  async resetPassword(email: string) {
    try {
      const { error } = await supabaseBrowser.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });
      if (error) throw error;
      return { error: null };
    } catch (error: any) {
      return { error: error.message };
    }
  }
}

export const authService = new AuthService();
