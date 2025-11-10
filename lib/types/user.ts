export type UserRole = 'buyer' | 'seller';

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  phone?: string;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface BuyerProfile extends UserProfile {
  role: 'buyer';
  address?: string;
  city?: string;
  pincode?: string;
}

export interface SellerProfile extends UserProfile {
  role: 'seller';
  business_name: string;
  business_address?: string;
  gst_number?: string;
  verified: boolean;
}
