'use client';

import { JSX, useEffect, useRef, useState } from "react";
import moduleStyles from '@/components/TestimonialCycler/styles.module.css';

export default function TestimonialCycler({ testimonials }: { testimonials: JSX.Element[] }) {
   const [testimonial, setTestimonial] = useState({
       text: testimonials[0],
       index: 0
   });

  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonial(prev => {
        const nextIndex = (prev.index + 1) % testimonials.length;
        return {
          text: testimonials[nextIndex],
          index: nextIndex
        };
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [testimonials]);

  const testimonialRef = useRef<HTMLQuoteElement>(null);

  useEffect(() => {
   const testimonialElement = testimonialRef.current;
   if (testimonialElement) {
      if (testimonialElement.classList.contains(moduleStyles.animation1)) {
         testimonialElement.classList.remove(moduleStyles.animation1);
         testimonialElement.classList.add(moduleStyles.animation2);
      } else {
         testimonialElement.classList.remove(moduleStyles.animation2);
         testimonialElement.classList.add(moduleStyles.animation1);
      }
   }
  }, [testimonial])

  return (
   <blockquote ref={testimonialRef}>
      {testimonial.text}
   </blockquote>
  );
}