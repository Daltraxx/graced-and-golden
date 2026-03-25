"use client";

import { useState, useEffect, useCallback } from "react";
import CTAModal from "../Modal/CTAModal";

export default function CTAModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const handleClose = useCallback(() => {
    setIsOpen(false);
    try {
      localStorage.setItem("ctaModalClosed", Date.now().toString());
    } catch {
      // localStorage unavailable - modal will reappear on next visit
    }
  }, []);

  // Check localStorage to determine if the modal should be shown
  useEffect(() => {
    let subscribed = null;
    let ctaModalClosed = null;
    try {
      subscribed = localStorage.getItem("newsletterSubscribed");
      ctaModalClosed = localStorage.getItem("ctaModalClosed");
    } catch {
      // localStorage unavailable (private browsing, sandboxed iframe, etc.)
      // Fall through to show modal after delay
    }
    if (subscribed) {
      return; // Don't show the modal if the user has already subscribed
    }

    if (ctaModalClosed) {
      const timeSinceClosed = Date.now() - parseInt(ctaModalClosed, 10);
      const twoWeeks = 24 * 60 * 60 * 14 * 1000; // 14 days in milliseconds
      if (timeSinceClosed < twoWeeks) {
        return; // Don't show the modal if it was closed within the last two weeks
      }
    }

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
