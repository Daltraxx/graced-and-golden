import { RefObject, useEffect } from "react";

const addAnimation = (containerRef: RefObject<HTMLElement | null>) => {
   useEffect(() => {
       if (!containerRef.current) return;
   
       const animatedElements = Array.from(
         containerRef.current.querySelectorAll('.animated-element')
       );
   
       const observer = new IntersectionObserver(
         (entries) => {
           entries.forEach((entry) => {
             if (entry.isIntersecting) {
               entry.target.classList.add('fade-in');
             }
           });
         },
         { threshold: 0.5 }
       );
   
       animatedElements.forEach((element) => observer.observe(element));
   
       return () => {
         animatedElements.forEach((element) => observer.unobserve(element));
         observer.disconnect();
       };
     }, []);
}

export default addAnimation;