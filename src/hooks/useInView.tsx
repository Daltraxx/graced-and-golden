import { useState, useEffect, useRef } from 'react';

const useInView = (options: { threshold: number }) => {
   const [isInView, setIsInView] = useState(false);
   const elementRef = useRef(null);

   useEffect(() => {
      const intersectionCallback = (entries: IntersectionObserverEntry[]) => {
         entries.forEach((entry) => {
            setIsInView(entry.isIntersecting);
         })
      }

      const observer = new IntersectionObserver(intersectionCallback, options);

      if (elementRef.current) {
         observer.observe(elementRef.current);
      }

      const cleanup = () => {
         if (elementRef.current) observer.unobserve(elementRef.current);
      }

      return cleanup;
   }, [options]);

   return [elementRef, isInView];
}

export default useInView;