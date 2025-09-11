"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useCart } from "./context/CartContext";
import { useRouter } from "next/navigation";

interface Product {
  id: number;
  name: string;
  price: number;
  images: string[];
}

const products: Product[] = [
  { id: 1, name: "Kingship Unfazed (Red)", price: 23000, images: ["/a.jpg", "/aa.jpg"] },
  { id: 2, name: "Kingship Unfazed (Blue)", price: 23000, images: ["/aaa.jpg", "/aaaa.jpg"] },
  { id: 3, name: "Kingship T-Shirt", price: 25000, images: ["/aaaaa.jpg", "/aaaaaa.jpg", "/b.jpg"] },
  { id: 4, name: "Born To Rule", price: 15000, images: ["/bb.jpg", "/bbb.jpg"] },
  { id: 5, name: "Pink Crop Top", price: 13000, images: ["/aaaaaaa.jpg"] },
  { id: 6, name: "Black Crop Top", price: 13000, images: ["/aaaaaaaa.jpg"] },
  { id: 8, name: "Blue Crop Top", price: 13000, images: ["/aaaaaaaaa.jpg"] },
  { id: 9, name: "Green Crop Top", price: 13000, images: ["/aaaaaaaaaa.jpg"] },
];

export default function Home() {
  const [loading, setLoading] = useState(true);
  const { addToCart, cart } = useCart();
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleBuy = (product: Product) => {
    const message = `Hello 👑, I want to buy the ${product.name} for ₦${product.price.toLocaleString()}`;
    const whatsappUrl = `https://wa.me/2348146240786?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    adaptiveHeight: true,
  };

  return (
    <main className="min-h-screen bg-white text-red-600">
      {/* Splash Screen */}
      <AnimatePresence>
        {loading && (
          <motion.div
            className="fixed inset-0 bg-red-600 flex items-center justify-center text-white z-50"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 1 }}
          >
            <motion.h1
              initial={{ scale: 0.8 }}
              animate={{ scale: 1.1 }}
              exit={{ scale: 0.8 }}
              transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
              className="text-3xl md:text-5xl font-bold text-center"
            >
              Welcome to Kingship Clothing Brand 👑
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navbar */}
      <header className="flex items-center justify-between px-6 py-4 bg-red-600 text-white shadow-md sticky top-0 z-40">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center space-x-2"
        >
          <Image src="/kinglogo.jpg" alt="Kingship Logo" width={60} height={40} className="rounded-full" />
          <h1 className="text-lg md:text-xl font-bold">KINGSHIP</h1>
        </motion.div>
        <motion.button
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.05 }}
          onClick={() => router.push("/cart")}
          className="bg-white text-red-600 px-4 py-2 rounded-xl shadow hover:bg-gray-100 transition font-semibold"
        >
          Cart ({cart.length})
        </motion.button>
      </header>

      {/* Hero Section */}
      <section className="text-center py-16 px-6 bg-gradient-to-b from-red-50 to-white">
        <motion.h2
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-extrabold mb-6"
        >
          Welcome to KINGSHIP 👑
        </motion.h2>
        <motion.p
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-lg md:text-xl text-gray-700 leading-relaxed"
        >
          Where style reigns and confidence rules. <br />
          Discover our latest collection — crafted for those who wear their crown with pride. <br />
          Thank you for being part of our journey 👑
        </motion.p>
      </section>

      {/* About Section */}
      <section className="py-12 px-6 bg-white text-center">
        <motion.h3
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-bold mb-4"
        >
          About Us
        </motion.h3>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-gray-700 text-base md:text-lg leading-relaxed"
        >
          KINGSHIP is more than a brand — it’s a statement of royalty and self-assurance.
          Every piece is designed to embody strength, elegance, and timeless confidence.
          We create fashion for those who lead, not follow — because true style wears the crown. 👑
        </motion.p>
      </section>

      {/* Products */}
      <section className="py-12 px-4 md:px-6 bg-red-50">
        <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">Our Collection</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white shadow-lg hover:shadow-2xl rounded-2xl overflow-hidden flex flex-col items-center p-4 transform hover:scale-[1.02] transition"
            >
              {/* Slider */}
              <div className="w-full">
                <Slider {...sliderSettings}>
                  {product.images.map((img, idx) => (
                    <div key={idx} className="flex justify-center items-center h-64">
                      <Image
                        src={img}
                        alt={`${product.name} view ${idx + 1}`}
                        width={240}
                        height={240}
                        className="rounded-lg object-cover"
                      />
                    </div>
                  ))}
                </Slider>
              </div>

              <h4 className="mt-4 font-semibold text-lg">{product.name}</h4>
              <p className="text-gray-600 text-base">₦{product.price.toLocaleString()}</p>
              <div className="flex space-x-3 mt-4">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => handleBuy(product)}
                  className="bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700 transition"
                >
                  Buy Now
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => addToCart(product)}
                  className="bg-gray-900 text-white px-4 py-2 rounded-xl hover:bg-gray-800 transition"
                >
                  Add to Cart
                </motion.button>
              </div>
            </motion.div>
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
