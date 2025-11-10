import Link from 'next/link';

export default function CallToAction() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Ready to Get Started?
        </h2>
        <p className="text-xl text-blue-100 mb-8">
          Join millions of happy customers and sellers today
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/buyer/login">
            <button className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-all transform hover:scale-105 shadow-xl">
              Start Shopping
            </button>
          </Link>
          <Link href="/seller/login">
            <button className="px-8 py-4 bg-blue-700 text-white border-2 border-white rounded-lg font-semibold hover:bg-blue-800 transition-all transform hover:scale-105">
              Start Selling
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
