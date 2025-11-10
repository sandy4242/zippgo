import { Search, ShoppingCart, Truck, CheckCircle } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      icon: Search,
      title: 'Browse Products',
      description: 'Search from 5000+ products across categories'
    },
    {
      icon: ShoppingCart,
      title: 'Add to Cart',
      description: 'Select items and add them to your cart'
    },
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'Get your order delivered in 10 minutes'
    },
    {
      icon: CheckCircle,
      title: 'Enjoy!',
      description: 'Receive fresh products at your doorstep'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get started in 4 simple steps
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8 relative">
          {/* Connection Line */}
          <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5 bg-blue-200" style={{ width: '85%', left: '7.5%' }}></div>

          {steps.map((step, index) => (
            <div key={index} className="relative text-center">
              <div className="relative inline-flex items-center justify-center w-24 h-24 bg-blue-600 rounded-full mb-6 shadow-lg">
                <step.icon className="w-10 h-10 text-white" />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-white text-blue-600 rounded-full flex items-center justify-center font-bold border-2 border-blue-600">
                  {index + 1}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
