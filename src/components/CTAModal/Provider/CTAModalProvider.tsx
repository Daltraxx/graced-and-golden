"use client";

import { useState, useEffect } from "react";
import CTAModal from "../Modal/CTAModal";

export default function CTAModalProvider({
  children,
}: {
  children: React.ReactNode;
  }) {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 5000); // Open after 5 seconds

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);
  return (
    <>
      {children}
      <CTAModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
