// app/page.tsx
'use client';

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

const products: Product[] = [
  { id: 1, name: "Kingship Unfazed(Red)", price: 23000, image: "/a.jpg" },
  { id: 2, name: "Kingship Unfazed(Blue)", price: 23000, image: "/aaa.jpg" },
  { id: 3, name: "Kingship T-Shirt", price: 25000, image: "/aaaaa.jpg" },
   { id: 4, name: "Pink Crop Top", price: 13000, image: "/aaaaaaa.jpg" },
  { id: 5, name: "Black Crop Top", price: 13000, image: "/aaaaaaaa.jpg" },
  { id: 7, name: "Blue Crop Top", price: 13000, image: "/aaaaaaaaa.jpg" },
  { id: 8, name: "Green Crop Top", price: 13000, image: "/aaaaaaaaaa.jpg" },
];

export default function Home() {
  const [cart, setCart] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3500); // 3.5 secs
    return () => clearTimeout(timer);
  }, []);

  const addToCart = (product: Product) => {
    setCart((prev) => [...prev, product]);
  };

  const handleBuy = (product: Product) => {
    const message = `Hello 👑, I want to buy the ${product.name} for ₦${product.price.toLocaleString()}`;
    const whatsappUrl = `https://wa.me/2348146240786?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    const items = cart.map((p) => `${p.name} - ₦${p.price.toLocaleString()}`).join("\n");
    const total = cart.reduce((sum, p) => sum + p.price, 0);
    const message = `Hello 👑, I want to buy:\n${items}\n\nTotal: ₦${total.toLocaleString()}`;
    const whatsappUrl = `https://wa.me/2348146240786?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <main className="min-h-screen bg-white text-red-600">
      {/* Splash Screen */}
      <AnimatePresence>
        {loading && (
          <motion.div
            className="fixed inset-0 bg-red-600 flex items-center justify-center text-white z-50"
            initial={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-2xl md:text-4xl font-bold text-center">
              Welcome to Kingship Clothing Brand 👑
            </h1>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navbar */}
      <header className="flex items-center justify-between px-6 py-4 bg-red-600 text-white shadow-md">
        <div className="flex items-center space-x-2">
          <Image src="/kinglogo.jpg" alt="Kingship Logo" width={80} height={40} />
          <h1 className="text-xl font-bold">KINGSHIP</h1>
        </div>
        <button
          onClick={handleCheckout}
          className="bg-white text-red-600 px-4 py-2 rounded-xl shadow hover:bg-gray-100 transition"
        >
          Cart ({cart.length})
        </button>
      </header>

      {/* Hero Section */}
      <section className="text-center py-16 px-6 bg-red-50">
        <h2 className="text-3xl font-bold mb-4">Welcome to KINGSHIP 👑</h2>
        <p className="max-w-2xl mx-auto text-lg text-gray-700">
          Where style reigns and confidence rules. <br />
          Discover our latest collection — crafted for those who wear their crown with pride. <br />
          Thank you for being part of our journey 👑
        </p>
      </section>

      {/* About Section */}
      <section className="py-12 px-6 bg-white text-center">
        <h3 className="text-2xl font-bold mb-4">About Us</h3>
        <p className="max-w-2xl mx-auto text-gray-700">
          KINGSHIP is more than a brand — it’s a statement of royalty and self-assurance.
          Every piece is designed to embody strength, elegance, and timeless confidence.
          We create fashion for those who lead, not follow — because true style wears the crown. 👑
        </p>
      </section>

      {/* Products */}
      <section className="py-12 px-6 bg-red-50">
        <h3 className="text-2xl font-bold text-center mb-8">Our Collection</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow rounded-2xl overflow-hidden flex flex-col items-center p-4"
            >
              <Image
                src={product.image}
                alt={product.name}
                width={200}
                height={200}
                className="rounded-lg"
              />
              <h4 className="mt-4 font-semibold">{product.name}</h4>
              <p className="text-gray-600">₦{product.price.toLocaleString()}</p>
              <div className="flex space-x-2 mt-4">
                <button
                  onClick={() => handleBuy(product)}
                  className="bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700 transition"
                >
                  Buy Now
                </button>
                <button
                  onClick={() => addToCart(product)}
                  className="border border-red-600 text-red-600 px-4 py-2 rounded-xl hover:bg-red-100 transition"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 bg-red-600 text-white">
        <p>© {new Date().getFullYear()} KINGSHIP 👑. All Rights Reserved.</p>
      </footer>
    </main>
  );
}
