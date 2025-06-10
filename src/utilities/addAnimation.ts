import { RefObject, useEffect } from "react";

const addAnimation = (containerRef: RefObject<HTMLElement | null>, options: { threshold: number }) => {
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

      const observer = new IntersectionObserver(observerCallback, options);
   
       animatedElements.forEach((element) => observer.observe(element));
   
       return () => {
         animatedElements.forEach((element) => observer.unobserve(element));
         observer.disconnect();
       };
     }, []);
}

export default addAnimation;