"use client";

import { useState, useEffect } from "react";
import CTAModal from "../Modal/CTAModal";

export default function CTAModalProvider({
  children,
}: {
  children: React.ReactNode;
  }) {
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => {
    setIsOpen(false);
    // TODO: Consider setting a cookie or localStorage item here 
    // to prevent showing the modal again for a certain period of time
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 5000); // Open after 5 seconds

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);
  
  return (
    <>
      {children}
      <CTAModal isOpen={isOpen} onClose={handleClose} />
    </>
  );
}
