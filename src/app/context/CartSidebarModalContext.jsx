"use client";
import React, { createContext, useContext, useState } from "react";

// Create context without types
const CartModalContext = createContext(undefined);

// Custom hook to use context
export const useCartModalContext = () => {
  const context = useContext(CartModalContext);
  if (!context) {
    throw new Error(
      "useCartModalContext must be used within a CartModalProvider"
    );
  }
  return context;
};

// Provider component
export const CartModalProvider = ({ children }) => {
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);

  const openCartModal = () => {
    setIsCartModalOpen(true);
  };

  const closeCartModal = () => {
    setIsCartModalOpen(false);
  };

  return (
    <CartModalContext.Provider
      value={{ isCartModalOpen, openCartModal, closeCartModal }}
    >
      {children}
    </CartModalContext.Provider>
  );
};
