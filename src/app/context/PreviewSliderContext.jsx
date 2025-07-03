"use client";
import React, { createContext, useContext, useState } from "react";

// Create context
const PreviewSlider = createContext(undefined);

// Custom hook
export const usePreviewSlider = () => {
  const context = useContext(PreviewSlider);
  if (!context) {
    throw new Error(
      "usePreviewSlider must be used within a PreviewSliderProvider"
    );
  }
  return context;
};

// Provider component
export const PreviewSliderProvider = ({ children }) => {
  const [isModalPreviewOpen, setIsModalOpen] = useState(false);

  const openPreviewModal = () => {
    setIsModalOpen(true);
  };

  const closePreviewModal = () => {
    setIsModalOpen(false);
  };

  return (
    <PreviewSlider.Provider
      value={{ isModalPreviewOpen, openPreviewModal, closePreviewModal }}
    >
      {children}
    </PreviewSlider.Provider>
  );
};
