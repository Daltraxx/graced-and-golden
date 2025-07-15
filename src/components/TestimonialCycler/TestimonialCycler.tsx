'use client';

import { JSX, useEffect, useState } from "react";

export default function TestimonialCycler({ testimonials }: { testimonials: JSX.Element[] }) {
   const [testimonial, setTestimonial] = useState({
       text: testimonials[0],
       index: 0
   });

  useEffect(() => {

   const setNextTestimonial = () => {
      const nextIndex = (testimonial.index + 1) % testimonials.length;
      setTestimonial({
         text: testimonials[nextIndex],
         index: nextIndex
      });
   }

   setTimeout(setNextTestimonial, 3500);

  }, [testimonial, testimonials])

  return (
   <>
      {testimonial.text}
   </>
  );
}