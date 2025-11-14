"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 });
  const [isOpened, setIsOpened] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(true);
  const [isScrolling, setIsScrolling] = useState(false);
  const [currentRule, setCurrentRule] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

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


  // Verificar se chegou ao final da página
  useEffect(() => {
    if (!isOpened) return;

    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Esconde o botão quando está próximo do final (últimos 100px)
      if (scrollTop + windowHeight >= documentHeight - 100) {
        setShowScrollButton(false);
      } else {
        setShowScrollButton(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isOpened]);

  // Array de regras
  const rules = [
    {
      id: 1,
      image: "/Traga um presente divertido (valor  R$ 50.00).png",
      legend: "Traga um presente divertido (valor R$ 50.00)"
    },
    {
      id: 2,
      image: "/Todos os presentes vão para uma pilha.png",
      legend: "Todos os presentes vão para uma pilha"
    },
    {
      id: 3,
      image: "/Cada participante sorteia um.png",
      legend: "Cada participante sorteia um"
    },
    {
      id: 4,
      image: "/Mas cuidado, o presente pode ser substituído, trocado ou virar piada!.png",
      legend: "Mas cuidado, o presente pode ser substituído, trocado ou virar piada!"
    }
  ];

  const nextRule = () => {
    setCurrentRule((prev) => (prev + 1) % rules.length);
  };

  const prevRule = () => {
    setCurrentRule((prev) => (prev - 1 + rules.length) % rules.length);
  };

  // Funções para swipe em mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      // Swipe para a esquerda - próxima regra
      nextRule();
    }
    if (distance < -minSwipeDistance) {
      // Swipe para a direita - regra anterior
      prevRule();
    }
  };

  // Função para descer lentamente
  const handleScrollDown = () => {
    if (isScrolling) return;
    
    setIsScrolling(true);
    const scrollAmount = window.innerHeight * 0.7;
    const startPosition = window.pageYOffset;
    const targetPosition = startPosition + scrollAmount;
    const distance = targetPosition - startPosition;
    const duration = 1000; // 1 segundo
    let start: number | null = null;

    const animation = (currentTime: number) => {
      if (start === null) start = currentTime;
      const timeElapsed = currentTime - start;
      const progress = Math.min(timeElapsed / duration, 1);
      
      // Easing function para movimento suave
      const ease = progress < 0.5 
        ? 2 * progress * progress 
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;

      window.scrollTo(0, startPosition + distance * ease);

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      } else {
        setIsScrolling(false);
      }
    };

    requestAnimationFrame(animation);
  };

  if (!mounted) {
    return null;
  }

  const handleGiftClick = () => {
    setIsOpened(true);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#003e7e] via-[#068b7d] to-[#46a896] relative overflow-hidden">
      {/* Confetti Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
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
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
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

      <div className="relative flex flex-col items-center justify-center min-h-screen px-4 py-12" style={{ zIndex: 20 }}>
        {/* Gift Box or Image */}
        <div className="mb-8 relative min-h-[400px] flex flex-col items-center justify-center" style={{ zIndex: 50 }}>
          <AnimatePresence mode="wait">
            {!isOpened ? (
              // Gift Box
              <motion.div
                key="gift-box"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0, rotate: 180 }}
                transition={{ duration: 0.5 }}
                className="cursor-pointer flex flex-col items-center"
                onClick={handleGiftClick}
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
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
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
              {/* Texto "Abra" */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  scale: [1, 1.05, 1],
                }}
                transition={{ 
                  delay: 0.5,
                  opacity: { duration: 0.5 },
                  y: { duration: 0.5 },
                  scale: {
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }
                }}
                className="text-white text-2xl md:text-3xl font-bold mt-6 cursor-pointer relative"
                style={{ zIndex: 50 }}
              >
                Abra
              </motion.p>
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
                style={{ zIndex: 50 }}
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
                    alt="Inimigo X CEDOES"
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
            className="text-center mb-6 relative"
            style={{ zIndex: 30 }}
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
              INIMIGO X
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
          className="flex gap-4 mt-8 relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          style={{ zIndex: 30 }}
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
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
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

      {/* Seção de Regras - Carrossel - Só aparece depois de abrir o presente */}
      {isOpened && (
        <div className="relative pt-4 pb-8 px-4" style={{ zIndex: 20 }}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="max-w-4xl mx-auto"
          >
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-white text-center mb-3"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.5 }}
            >
              Como Funciona
            </motion.h2>

            {/* Carrossel com estilo 3D */}
            <div 
              className="relative pt-2 pb-8" 
              style={{ perspective: '1000px' }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div className="relative h-[500px] md:h-[600px] flex items-center justify-center overflow-visible">
                {/* Container dos slides */}
                <div className="relative w-full max-w-5xl mx-auto h-full flex items-center" style={{ transformStyle: 'preserve-3d', isolation: 'isolate' }}>
                  {rules.map((rule, index) => {
                    const isActive = index === currentRule;
                    const isPrev = index === currentRule - 1 || (currentRule === 0 && index === rules.length - 1);
                    const isNext = index === currentRule + 1 || (currentRule === rules.length - 1 && index === 0);
                    const offset = index - currentRule;
                    
                    // Calcular valores de animação
                    let xOffset = 0;
                    let scale = 1;
                    let opacity = 1;
                    let rotateY = 0;
                    
                    if (isActive) {
                      xOffset = 0;
                      scale = 1;
                      opacity = 1;
                      rotateY = 0;
                    } else if (isPrev) {
                      xOffset = -35;
                      scale = 0.75;
                      opacity = 0.6;
                      rotateY = 25;
                    } else if (isNext) {
                      xOffset = 35;
                      scale = 0.75;
                      opacity = 0.6;
                      rotateY = -25;
                    } else {
                      xOffset = offset * 35;
                      scale = 0.5;
                      opacity = 0;
                      rotateY = 0;
                    }

                    const zIndexValue = isActive ? 100 : (isPrev ? 10 : isNext ? 10 : 5);

                    return (
                      <motion.div
                        key={rule.id}
                        className="absolute left-1/2 w-[85%] md:w-[70%]"
                        style={{
                          transformStyle: 'preserve-3d',
                          zIndex: zIndexValue,
                          pointerEvents: isActive ? 'auto' : 'none'
                        }}
                        initial={false}
                        animate={{
                          x: `calc(-50% + ${xOffset}%)`,
                          scale: scale,
                          opacity: opacity,
                          rotateY: rotateY,
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30
                        }}
                      >
                        <div className="flex flex-col items-center">
                          <div className="mb-4">
                            <img
                              src={rule.image}
                              alt={rule.legend}
                              className="rounded-xl w-full h-auto object-contain max-h-[350px] md:max-h-[450px] mx-auto"
                            />
                          </div>
                          <p className="text-white text-base md:text-lg text-center font-medium px-4">
                            {rule.legend}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Botões de Navegação nas laterais dos slides - Ocultos em mobile */}
                <button
                  onClick={prevRule}
                  className="hidden md:block absolute left-[-60px] top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 font-bold px-4 py-2 rounded-lg shadow-lg transition-all duration-300 z-50"
                  style={{ zIndex: 50 }}
                >
                  ANTERIOR
                </button>

                <button
                  onClick={nextRule}
                  className="hidden md:block absolute right-[-60px] top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 font-bold px-4 py-2 rounded-lg shadow-lg transition-all duration-300 z-50"
                  style={{ zIndex: 50 }}
                >
                  PRÓXIMO
                </button>
              </div>

              {/* Indicadores (Dots) */}
              <div className="flex justify-center gap-2 mt-8">
                {rules.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentRule(index)}
                    className={`transition-all duration-300 rounded-full ${
                      index === currentRule
                        ? "bg-white w-8 h-3"
                        : "bg-white/40 w-3 h-3 hover:bg-white/60"
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Botão Fixo de Scroll - Só aparece depois de abrir o presente */}
      {isOpened && showScrollButton && (
        <motion.button
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          onClick={handleScrollDown}
          disabled={isScrolling}
          className="fixed right-6 bottom-6 md:right-8 md:bottom-8 z-50 bg-white/20 backdrop-blur-md hover:bg-white/30 border border-white/30 rounded-full p-4 shadow-2xl transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ zIndex: 50 }}
          whileHover={{ scale: isScrolling ? 1 : 1.1 }}
          whileTap={{ scale: isScrolling ? 1 : 0.95 }}
        >
          <motion.div
            animate={isScrolling ? {
              y: [0, 8, 0],
            } : {
              y: [0, 5, 0],
            }}
            transition={{
              duration: isScrolling ? 0.8 : 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-white"
            >
              <path
                d="M7 13L12 18L17 13M7 6L12 11L17 6"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </motion.button>
      )}
    </main>
  );
}

