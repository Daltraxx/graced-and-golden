import { RefObject, useEffect } from "react";

const useAddAnimation = (containerRef: RefObject<HTMLElement | null>, observerThreshold: number = .25) => {
   useEffect(() => {
      if (!containerRef.current) return;
   
      const animatedElements = Array.from(
         containerRef.current.querySelectorAll('.animated-element')
      );
   
      const observerCallback = (entries: IntersectionObserverEntry[]) => {
         entries.forEach((entry) => {
            if (entry.isIntersecting) {
               entry.target.classList.add('fade-in');
            }
         });
      }

      const observer = new IntersectionObserver(observerCallback, { threshold: observerThreshold });
   
      animatedElements.forEach((element) => observer.observe(element));
   
      return () => {
         animatedElements.forEach((element) => observer.unobserve(element));
         observer.disconnect();
      };
   }, [containerRef, observerThreshold]);
}

export default useAddAnimation;