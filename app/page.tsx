"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 });
  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    setMounted(true);
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleGiftClick = () => {
    setIsOpened(true);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#003e7e] via-[#068b7d] to-[#46a896] relative overflow-hidden">
      {/* Confetti Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => {
          const startX = Math.random() * dimensions.width;
          const endX = Math.random() * dimensions.width;
          return (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-yellow-400 rounded-sm"
              initial={{
                x: startX,
                y: -20,
                rotate: 0,
              }}
              animate={{
                y: dimensions.height + 20,
                rotate: 360,
                x: endX,
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
              style={{
                backgroundColor: [
                  "#FFD700",
                  "#FF6B6B",
                  "#4ECDC4",
                  "#FFE66D",
                  "#FF8B94",
                ][Math.floor(Math.random() * 5)],
              }}
            />
          );
        })}
      </div>

      {/* Ribbons Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-64"
            style={{
              backgroundColor: i % 2 === 0 ? "#46a896" : "#068b7d",
              left: `${(i + 1) * 12}%`,
            }}
            initial={{ y: -200, rotate: -5 }}
            animate={{
              y: dimensions.height + 200,
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12">
        {/* Gift Box or Image */}
        <div className="mb-8 relative min-h-[400px] flex items-center justify-center" style={{ zIndex: 50 }}>
          <AnimatePresence mode="wait">
            {!isOpened ? (
              // Gift Box
              <motion.div
                key="gift-box"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0, rotate: 180 }}
                transition={{ duration: 0.5 }}
                className="cursor-pointer"
                onClick={handleGiftClick}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                style={{ zIndex: 50 }}
              >
              <motion.div
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative"
                style={{ zIndex: 50 }}
              >
                {/* Gift Box - Flaticon Image */}
                <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center" style={{ zIndex: 50 }}>
                  <motion.div
                    animate={isOpened ? {
                      scale: 0,
                      rotate: 180,
                      opacity: 0,
                    } : {
                      scale: 1,
                      rotate: 0,
                      opacity: 1,
                    }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="relative"
                    style={{ zIndex: 50 }}
                  >
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/8924/8924636.png"
                      alt="Gift Box"
                      className="w-48 h-48 md:w-64 md:h-64 object-contain drop-shadow-lg"
                      style={{ filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))", zIndex: 50, position: "relative" }}
                    />
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
            ) : (
              // Revealed Image with smooth transition
              <motion.div
                key="revealed-image"
                initial={{ opacity: 0, scale: 0.3, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ 
                  duration: 1.2, 
                  ease: [0.34, 1.56, 0.64, 1],
                  delay: 0.2
                }}
                className="relative"
              >
              <motion.div
                initial={{ rotateY: -90 }}
                animate={{ rotateY: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="relative"
              >
                <motion.div
                  animate={{
                    y: [0, -15, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative"
                >
                  <Image
                    src="/WhatsApp Image 2025-11-12 at 12.08.19.jpeg"
                    alt="Amigo X CEDOES"
                    width={800}
                    height={600}
                    className="rounded-2xl shadow-2xl max-w-full h-auto"
                    priority
                  />
                  {/* Glow effect */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-[#46a896]/20 via-[#068b7d]/20 to-[#46a896]/20 rounded-2xl blur-xl -z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                  />
                  
                  {/* Confetti burst on reveal */}
                  {[...Array(40)].map((_, i) => {
                    const angle = (i / 40) * Math.PI * 2;
                    const distance = 200 + Math.random() * 200;
                    return (
                      <motion.div
                        key={i}
                        className="absolute w-3 h-3 rounded-sm"
                        style={{
                          backgroundColor: [
                            "#FFD700",
                            "#FF6B6B",
                            "#4ECDC4",
                            "#FFE66D",
                            "#FF8B94",
                          ][Math.floor(Math.random() * 5)],
                          left: "50%",
                          top: "50%",
                        }}
                        initial={{
                          x: 0,
                          y: 0,
                          rotate: 0,
                          scale: 1,
                          opacity: 1,
                        }}
                        animate={{
                          x: Math.cos(angle) * distance,
                          y: Math.sin(angle) * distance - 50,
                          rotate: 360 + Math.random() * 360,
                          scale: 0,
                          opacity: 0,
                        }}
                        transition={{
                          duration: 2,
                          delay: 0.5 + i * 0.03,
                          ease: "easeOut",
                        }}
                      />
                    );
                  })}
                </motion.div>
              </motion.div>
            </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Title - Only shows after opening */}
        {isOpened && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mb-6"
          >
            <motion.h2
              className="text-5xl md:text-7xl font-bold text-white mb-4"
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              AMIGO X
            </motion.h2>
            <motion.p
              className="text-xl md:text-2xl text-white/90"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              Uma celebração especial de fim de ano
            </motion.p>
          </motion.div>
        )}

        {/* Decorative Elements */}
        <motion.div
          className="flex gap-4 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-4 h-4 rounded-full"
              style={{
                backgroundColor: ["#46a896", "#068b7d", "#003e7e"][i],
              }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}
        </motion.div>

        {/* Floating Gift Boxes */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${15 + i * 15}%`,
                top: `${20 + (i % 2) * 60}%`,
              }}
              animate={{
                y: [0, -30, 0],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.4,
              }}
            >
              <div
                className="w-12 h-12 md:w-16 md:h-16"
                style={{
                  backgroundColor:
                    i % 2 === 0 ? "#46a896" : "#068b7d",
                  clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}

