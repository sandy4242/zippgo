import { Zap, Shield, Headphones, Star, Package, CreditCard } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Get your order delivered in just 10 minutes or less'
    },
    {
      icon: Shield,
      title: 'Secure Payments',
      description: 'Multiple secure payment options with end-to-end encryption'
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description: 'Round-the-clock customer support for all your queries'
    },
    {
      icon: Star,
      title: 'Quality Products',
      description: 'Fresh and authentic products with quality guarantee'
    },
    {
      icon: Package,
      title: 'Easy Returns',
      description: 'Hassle-free returns and refunds within 24 hours'
    },
    {
      icon: CreditCard,
      title: 'Best Prices',
      description: 'Competitive pricing with exclusive deals and offers'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Choose Us?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience the best in quick commerce with our reliable service
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-blue-100"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
