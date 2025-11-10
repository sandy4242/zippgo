'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Tag, Truck } from 'lucide-react';
import Link from 'next/link';

export default function CartPage() {
  const router = useRouter();
  const {
    items,
    removeFromCart,
    updateQuantity,
    getTotalPrice,
    getDiscount,
    getDeliveryFee,
    getFinalAmount,
  } = useCart();

  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoDiscount, setPromoDiscount] = useState(0);

  const handleApplyPromo = () => {
    // Mock promo code logic
    if (promoCode.toUpperCase() === 'FIRST20') {
      setAppliedPromo('FIRST20');
      setPromoDiscount(getTotalPrice() * 0.2);
      alert('Promo code applied! 20% off');
    } else if (promoCode.toUpperCase() === 'SAVE50') {
      setAppliedPromo('SAVE50');
      setPromoDiscount(50);
      alert('Promo code applied! ₹50 off');
    } else {
      alert('Invalid promo code');
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setPromoDiscount(0);
    setPromoCode('');
  };

  const finalAmount = getFinalAmount() - promoDiscount;

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">Add some products to get started!</p>
          <Link href="/buyer/dashboard">
            <button className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
        <p className="text-gray-600">{items.length} items in your cart</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
            >
              <div className="flex gap-4">
                {/* Product Image */}
                <div className="w-24 h-24 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <ShoppingBag className="w-10 h-10 text-blue-600" />
                </div>

                {/* Product Details */}
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
                      <p className="text-sm text-gray-600">{item.category}</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    {/* Price */}
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-bold text-gray-900">₹{item.price}</span>
                        {item.originalPrice > item.price && (
                          <span className="text-sm text-gray-500 line-through">
                            ₹{item.originalPrice}
                          </span>
                        )}
                      </div>
                      {item.originalPrice > item.price && (
                        <p className="text-sm text-green-600 font-medium">
                          Save ₹{item.originalPrice - item.price}
                        </p>
                      )}
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition text-black"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-semibold text-black">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center hover:bg-blue-700 transition text-black"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Subtotal */}
                  <div className="mt-3 pt-3 border-t">
                    <p className="text-sm text-gray-600">
                      Subtotal: <span className="font-bold text-gray-900">₹{item.price * item.quantity}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-md p-6 sticky top-20">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

            {/* Promo Code */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Promo Code
              </label>
              {appliedPromo ? (
                <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-green-600 " />
                    <span className="text-sm font-medium text-green-700">{appliedPromo}</span>
                  </div>
                  <button
                    onClick={handleRemovePromo}
                    className="text-red-600 text-sm hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter code"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-black"
                  />
                  <button
                    onClick={handleApplyPromo}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    Apply
                  </button>
                </div>
              )}
            </div>

            {/* Price Breakdown */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-medium">₹{getTotalPrice()}</span>
              </div>

              {getDiscount() > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Product Discount</span>
                  <span className="font-medium">-₹{getDiscount()}</span>
                </div>
              )}

              {appliedPromo && promoDiscount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Promo Discount</span>
                  <span className="font-medium">-₹{promoDiscount}</span>
                </div>
              )}

              <div className="flex justify-between text-gray-600">
                <div className="flex items-center gap-1">
                  <Truck className="w-4 h-4" />
                  <span>Delivery Fee</span>
                </div>
                <span className="font-medium">
                  {getDeliveryFee() === 0 ? (
                    <span className="text-green-600">FREE</span>
                  ) : (
                    `₹${getDeliveryFee()}`
                  )}
                </span>
              </div>

              {getDeliveryFee() > 0 && (
                <p className="text-xs text-gray-500">
                  Add ₹{500 - getTotalPrice()} more for free delivery
                </p>
              )}

              <div className="pt-3 border-t-2 border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">Total Amount</span>
                  <span className="text-2xl font-bold text-blue-600">₹{finalAmount}</span>
                </div>
              </div>
            </div>

            {/* Savings Info */}
            {(getDiscount() + promoDiscount) > 0 && (
              <div className="mb-6 p-3 bg-green-50 rounded-lg">
                <p className="text-sm text-green-700 font-medium text-center">
                  🎉 You're saving ₹{getDiscount() + promoDiscount} on this order!
                </p>
              </div>
            )}

            {/* Checkout Button */}
            <Link href="/buyer/checkout">
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2 shadow-lg">
                Proceed to Checkout
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>

            {/* Continue Shopping */}
            <Link href="/buyer/dashboard">
              <button className="w-full mt-3 border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition">
                Continue Shopping
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
