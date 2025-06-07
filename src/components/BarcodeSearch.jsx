

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { productData } from '../data/sampledata';

const ProductCard = ({ product, onClose }) => {
  const [isReporting, setIsReporting] = useState(false);
  const [reportText, setReportText] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [status, setStatus] = useState('');

  const handleReportSubmit = () => {
    if (reportText.trim() && status) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsReporting(false);
        setIsSubmitted(false);
        setReportText('');
        setStatus('');
      }, 2000);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 backdrop-blur-sm px-2 sm:px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="relative w-full max-w-[20rem] sm:max-w-md p-4 sm:p-6 rounded-2xl bg-white/10 dark:bg-white/10 backdrop-blur-md border border-white/20 ring-1 ring-white/20 text-white transition-colors duration-300 font-titillium"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 sm:top-3 sm:right-3 text-white hover:text-red-600 hover:bg-white/10 dark:hover:bg-white/10 rounded-md p-2 sm:p-3"
          aria-label="Close product card"
        >
          ✕
        </button>
        <div className="flex flex-col items-center space-y-3 mb-4 sm:mb-5">
          <div className="h-16 w-16 sm:h-24 sm:w-24 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl sm:text-4xl shadow-xl ring-4 ring-white/40">
            {product.property.brand ? product.property.brand.charAt(0) : 'P'}
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-white text-center">
            {product.property.brand} {product.property.model}
          </h2>
        </div>
        <div className="w-full flex flex-col items-center space-y-2 text-xs sm:text-sm">
          <div className="grid grid-cols-[1rem_5rem_0.5rem_1fr] sm:grid-cols-[1.5rem_6rem_0.75rem_1fr] items-center w-full max-w-[16rem] sm:max-w-[20rem] gap-x-2 sm:gap-x-3 gap-y-2 py-1">
            <span className="text-white">📦</span>
            <span className="font-semibold text-left">Type</span>
            <strong className="text-center">:</strong>
            <span className="text-left truncate">{product.property.type}</span>
          </div>
          <div className="grid grid-cols-[1rem_5rem_0.5rem_1fr] sm:grid-cols-[1.5rem_6rem_0.75rem_1fr] items-center w-full max-w-[16rem] sm:max-w-[20rem] gap-x-2 sm:gap-x-3 gap-y-2 py-1">
            <span className="text-white">🔢</span>
            <span className="font-semibold text-left">Barcode</span>
            <strong className="text-center">:</strong>
            <span className="text-left truncate">{product.barcode}</span>
          </div>
          {!isReporting && (
            <div className="grid grid-cols-[1rem_5rem_0.5rem_1fr] sm:grid-cols-[1.5rem_6rem_0.75rem_1fr] items-center w-full max-w-[16rem] sm:max-w-[20rem] gap-x-2 sm:gap-x-3 gap-y-2 py-1">
              <span className="text-white">⚠️</span>
              <span className="font-semibold text-left">Status</span>
              <strong className="text-center">:</strong>
              <span className="text-left truncate">{product.property.status}</span>
            </div>
          )}
          <div className="grid grid-cols-[1rem_5rem_0.5rem_1fr] sm:grid-cols-[1.5rem_6rem_0.75rem_1fr] items-center w-full max-w-[16rem] sm:max-w-[20rem] gap-x-2 sm:gap-x-3 gap-y-2 py-1">
            <span className="text-white">📍</span>
            <span className="font-semibold text-left">Location</span>
            <strong className="text-center">:</strong>
            <span className="text-left truncate">
              {product.location.floor.name}, {product.location.hall.name}, {product.location.room.name}
            </span>
          </div>
        </div>
        {!isReporting && !isSubmitted && (
          <div className="mt-4 sm:mt-6 flex justify-center">
            <button
              onClick={() => setIsReporting(true)}
              className="px-3 py-1 sm:px-5 sm:py-2 rounded-md bg-blue-500 hover:bg-white/30 text-white font-medium backdrop-blur-sm transition text-xs sm:text-sm"
              aria-label="Report product issue"
            >
              Report Issue
            </button>
          </div>
        )}
        {isReporting && !isSubmitted && (
          <div className="w-full max-w-full mt-3 sm:mt-4 flex flex-col items-center justify-center space-y-2 text-xs sm:text-sm">
            <select
              className="w-full max-w-[16rem] sm:max-w-[20rem] p-2 rounded-lg bg-white/100 dark:bg-white/100 border border-white/20 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 backdrop-blur-md text-xs sm:text-sm"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              aria-label="Select product status"
            >
              <option value="Working">Working</option>
              <option value="Not Working">Not Working</option>
            </select>
            <textarea
              className="w-full max-w-[16rem] sm:max-w-[20rem] p-1 rounded-lg bg-white/10 dark:bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 backdrop-blur-md resize-none text-xs sm:text-sm"
              rows="2"
              placeholder="Describe the issue..."
              value={reportText}
              onChange={(e) => setReportText(e.target.value)}
              aria-label="Report issue description"
            />
            <div className="flex space-x-2 sm:space-x-3">
              <button
                onClick={handleReportSubmit}
                disabled={!status || !reportText.trim()}
                className={`px-3 py-1 sm:px-5 sm:py-2 rounded-md bg-blue-500 text-white font-medium backdrop-blur-sm transition text-xs sm:text-sm ${
                  !status || !reportText.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/30'
                }`}
                aria-label="Submit report"
              >
                Submit
              </button>
              <button
                onClick={() => setIsReporting(false)}
                className="px-3 py-1 sm:px-5 sm:py-2 rounded-md bg-gray-500 text-white font-medium hover:bg-gray-600 backdrop-blur-sm transition text-xs sm:text-sm"
                aria-label="Cancel report"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
        {isSubmitted && (
          <div className="mt-3 sm:mt-4 text-center text-blue-400 text-xs sm:text-sm">
            Report submitted successfully!
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

const BarcodeSearch = () => {
  const [barcode, setBarcode] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const inputRef = useRef(null);

  // Handle input change and filter suggestions
  const handleInputChange = (e) => {
    const value = e.target.value;
    setBarcode(value);

    if (value.trim()) {
      const filteredSuggestions = productData
        .filter(p => p.barcode.toLowerCase().includes(value.toLowerCase().trim()))
        .map(p => p.barcode)
        .slice(0, 5); // Limit to 5 suggestions
      setSuggestions(filteredSuggestions);
      setIsDropdownOpen(true);
    } else {
      setSuggestions([]);
      setIsDropdownOpen(false);
    }
  };

  // Handle suggestion selection
  const handleSuggestionClick = (suggestion) => {
    setBarcode(suggestion);
    setSuggestions([]);
    setIsDropdownOpen(false);
  };

  // Handle search (for button click)
  const handleSearch = () => {
    const found = productData.find(p => p.barcode === barcode.trim());
    if (found) {
      setSelectedProduct(found);
      setNotFound(false);
    } else {
      setSelectedProduct(null);
      setNotFound(true);
    }
    setIsDropdownOpen(false);
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle close
  const handleClose = () => {
    setSelectedProduct(null);
    setBarcode('');
    setSuggestions([]);
    setIsDropdownOpen(false);
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 relative z-10">
      <motion.div className="relative w-full max-w-[90vw] sm:max-w-[80vw] md:max-w-[60vw] lg:max-w-[50vw] xl:max-w-[40vw] mx-auto" ref={inputRef}>
        <div className="relative">
          <input
            type="text"
            placeholder="Enter barcode number..."
            value={barcode}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            className="w-full px-4 py-3 pr-12 rounded-full border-2 border-gradient-to-r from-green-400 to-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white bg-black/80 backdrop-blur-md text-sm sm:text-base font-orbitron font-semibold shadow-lg shadow-neon-green/50 glow-text"
          />
          <motion.button
            onClick={handleSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-500"
            aria-label="Search product"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 sm:h-6 sm:w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </motion.button>
        </div>

        {/* Suggestions Dropdown */}
        {isDropdownOpen && suggestions.length > 0 && (
          <motion.ul
            className="absolute top-full left-0  border bg-white w-full  border-gray-200 rounded-lg shadow-xl mt-2 z-20 max-h-60 overflow-y-auto"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-4 py-3 text-sm sm:text-base text-gray-800 hover:bg-white/10 backdrop-blur-sm hover:text-blue-600 cursor-pointer transition-colors duration-200 border-b border-gray-100 last:border-b-0"
              >
                {suggestion}
              </li>
            ))}
          </motion.ul>
        )}
      </motion.div>

      {notFound && (
        <motion.p
          className="mt-4 text-red-500 font-medium text-center text-sm sm:text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Product not found.
        </motion.p>
      )}

      {/* Fullscreen ProductCard Modal */}
      {selectedProduct && <ProductCard product={selectedProduct} onClose={handleClose} />}
    </div>
  );
};

export default BarcodeSearch;