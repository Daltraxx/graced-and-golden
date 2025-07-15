'use client';

import { useEffect, useState } from "react";



export default function TestimonialCycler({ testimonials }) {
   const [testimonial, setTestimonial] = useState({
       text: testimonials[0],
       index: 0
   });

   const setNextTestimonial = () => {
      const nextIndex = (testimonial.index + 1) % testimonials.length;
      setTestimonial({
         text: testimonials[nextIndex],
         index: nextIndex
      });
  }

  useEffect(() => {
    setTimeout(setNextTestimonial, 3500);
  }, [testimonial])

  return (
   <>
      {testimonial.text}
   </>
  );
}