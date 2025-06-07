import React, { useState, useContext } from 'react';
import {
  Monitor,
  WifiIcon,
  Keyboard,
  Mouse,
  Fan,
  Lightbulb,
  AirVent,
} from 'lucide-react';
import { motion } from 'framer-motion';
import BarcodeSearch from './BarcodeSearch';
import ComplaintModal from './ComplaintModal';
import LoginModal from './LoginModal';
import AuthContext from './context/AuthContext';

const Hero = () => {
  const [showComplaintModal, setShowComplaintModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isLoggedIn } = useContext(AuthContext);
   const [selectedProduct, setSelectedProduct] = useState(null);


  const handleComplaintClick = () => {
    if (isLoggedIn) {
      setShowComplaintModal(true);
    } else {
      setShowLoginModal(true);
    }
  };

  const closeComplaintModal = () => {
    setShowComplaintModal(false);
  };

  const closeLoginModal = () => {
    setShowLoginModal(false);
  };

  const electronicItems = {
    MONITOR: { icon: Monitor, name: 'Monitor' },
    KEYBOARD: { icon: Keyboard, name: 'Keyboard' },
    MOUSE: { icon: Mouse, name: 'Mouse' },
    FAN: { icon: Fan, name: 'Fan' },
    LIGHT: { icon: Lightbulb, name: 'Light' },
    WIFI_ROUTER: { icon: WifiIcon, name: 'Wi-Fi Router' },
    AC: { icon: AirVent, name: 'Air Conditioner' },
  };

  // Animation variants for icons
  const iconVariants = {
    initial: { scale: 1, rotate: 0, opacity: 0.8 },
    hover: {
      scale: 1.2,
      rotate: 10,
      opacity: 1,
      transition: { duration: 0.3, ease: 'easeInOut' },
    },
  };

  return (
    <main className="flex-grow overflow-x-hidden relative mt-4">
      <section className="min-h-[80vh] w-full relative">
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/40 to-charcoal z-0"></div>

        <div className="container mx-auto px-4 sm:px-6 py-24 relative z-10">
          <div className="flex flex-col items-center justify-center min-h-0 flex-1 text-center">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-orbitron font-bold mb-6 glow-text"
            >
              ETRACK <span className="text-neon-green">SYSTEM</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-lg sm:text-xl md:text-2xl font-exo mb-2 sm:mb-4 max-w-3xl text-white"
            >
              Advanced IoT monitoring system for electronic devices across campus
            </motion.p>

            {/* Icons Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-2 sm:mb-4"
            >
              {Object.entries(electronicItems).map(([key, { icon: Icon, name }]) => (
                <motion.div
                  key={key}
                  variants={iconVariants}
                  initial="initial"
                  whileHover="hover"
                  className="flex flex-col items-center p-2 sm:p-4 rounded-lg bg-charcoal/50 hover:bg-charcoal/80 transition-colors shadow-neon-green/50"
                >
                  <Icon className="w-10 h-10 text-neon-green" />
                  <span className="text-xs sm:text-sm font-exo text-white mt-2">{name}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
                <BarcodeSearch setSelectedProduct={setSelectedProduct} />
      {selectedProduct && <ProductCard product={selectedProduct} />}
            </motion.div>
          </div>
        </div>
        {showComplaintModal && <ComplaintModal onClose={closeComplaintModal} />}
        {showLoginModal && <LoginModal onClose={closeLoginModal} />}
      </section>
    </main>
  );
};

export default Hero;