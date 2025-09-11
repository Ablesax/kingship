"use client";

import { useCart } from "../context/CartContext";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function CartPage() {
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart, clearCart } =
    useCart();
  const router = useRouter();

  const handlePurchaseAll = () => {
    if (cart.length === 0) return;

    const message = cart
      .map(
        (item) =>
          `${item.name} (x${item.quantity}) - ₦${(
            item.price * (item.quantity || 1)
          ).toLocaleString()}`
      )
      .join("\n");

    const total = cart.reduce(
      (sum, item) => sum + item.price * (item.quantity || 1),
      0
    );

    const whatsappUrl = `https://wa.me/2348146240786?text=${encodeURIComponent(
      `Hello 👑, I’d like to order:\n\n${message}\n\nTOTAL: ₦${total.toLocaleString()}`
    )}`;

    window.open(whatsappUrl, "_blank");
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-red-50 to-white text-red-600 p-6">
      <motion.h1
        className="text-3xl font-bold mb-6 text-center"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Your Cart 👑
      </motion.h1>

      <AnimatePresence>
        {cart.length === 0 ? (
          <motion.p
            className="text-gray-600 text-center mt-12 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Your cart is empty.
          </motion.p>
        ) : (
          <motion.div
            className="space-y-6 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {cart.map((item) => (
              <motion.div
                key={item.id}
                className="flex flex-col md:flex-row items-center justify-between border p-4 rounded-xl shadow-md bg-white hover:shadow-lg transition"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-center md:text-left">
                  <h2 className="font-semibold text-lg">{item.name}</h2>
                  <p className="text-gray-600">₦{item.price.toLocaleString()}</p>
                </div>
                <div className="flex items-center space-x-2 mt-4 md:mt-0">
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                  >
                    -
                  </button>
                  <span className="font-semibold">{item.quantity}</span>
                  <button
                    onClick={() => increaseQuantity(item.id)}
                    className="px-3 py-1 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="ml-4 px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                  >
                    Remove
                  </button>
                </div>
              </motion.div>
            ))}

            {/* Total */}
            <div className="mt-8 flex justify-between items-center font-bold text-lg border-t pt-4">
              <span>Total:</span>
              <span>
                ₦
                {cart
                  .reduce(
                    (sum, item) => sum + item.price * (item.quantity || 1),
                    0
                  )
                  .toLocaleString()}
              </span>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap justify-center md:justify-between gap-4 mt-8">
              <button
                onClick={clearCart}
                className="bg-gray-200 px-5 py-2 rounded-lg hover:bg-gray-300 transition"
              >
                Clear Cart
              </button>
              <button
                onClick={handlePurchaseAll}
                className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition"
              >
                Purchase All
              </button>
              <button
                onClick={() => router.back()}
                className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition"
              >
                Go Back
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
