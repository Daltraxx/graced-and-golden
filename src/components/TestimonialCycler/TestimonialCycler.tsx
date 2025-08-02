"use client";

import { JSX, useEffect, useRef, useState } from "react";
import moduleStyles from "@/components/TestimonialCycler/styles.module.css";
import clsx from "clsx";
import ArrowIcon from "../ArrowIcon";

export default function TestimonialCycler({
  testimonials,
}: {
  testimonials: JSX.Element[];
}) {
  const [testimonial, setTestimonial] = useState({
    text: testimonials[0],
    index: 0,
  });

  const [cyclerActive, setCyclerActive] = useState(true);

  type TestimonialState = {
    text: JSX.Element;
    index: number;
  };

  const getNextTestimonialState = (prevTestimonialState: TestimonialState) => {
    const nextIndex = (prevTestimonialState.index + 1) % testimonials.length;
    return {
      text: testimonials[nextIndex],
      index: nextIndex,
    };
  };

  const getPrevTestimonialState = (prevTestimonialState: TestimonialState) => {
    const n = testimonials.length;
    const nextIndex = (prevTestimonialState.index - 1 + n) % n;
    return {
      text: testimonials[nextIndex],
      index: nextIndex,
    };
  };

  let interval: NodeJS.Timeout;
  useEffect(() => {
    if (cyclerActive) {
      interval = setInterval(() => {
        setTestimonial((prev) => {
          return getNextTestimonialState(prev);
        });
      }, 10000);
    }

    return () => clearInterval(interval);
  }, [testimonials]);

  const testimonialRef = useRef<HTMLQuoteElement>(null);

  useEffect(() => {
    const testimonialContainer = testimonialRef.current;

    if (cyclerActive) {
      if (testimonialContainer) {
        if (testimonialContainer.classList.contains(moduleStyles.animation1)) {
          testimonialContainer.classList.remove(moduleStyles.animation1);
          testimonialContainer.classList.add(moduleStyles.animation2);
        } else {
          testimonialContainer.classList.remove(moduleStyles.animation2);
          testimonialContainer.classList.add(moduleStyles.animation1);
        }
      }
    } else {
      if (testimonialContainer) {
        if (
          testimonialContainer.classList.contains(
            moduleStyles.animationPermanent1
          )
        ) {
          testimonialContainer.classList.remove(
            moduleStyles.animationPermanent1
          );
          testimonialContainer.classList.add(moduleStyles.animationPermanent2);
        } else {
          testimonialContainer.classList.remove(
            moduleStyles.animationPermanent2
          );
          testimonialContainer.classList.add(moduleStyles.animationPermanent1);
        }
      }
    }
  }, [testimonial]);

  const handleArrowClick = (direction: "left" | "right") => {
    if (cyclerActive) {
      setCyclerActive(false);
      clearInterval(interval);
      if (testimonialRef.current) {
        testimonialRef.current.classList.remove(moduleStyles.animation1);
        testimonialRef.current.classList.remove(moduleStyles.animation2);
      }
    }

    direction === "left"
      ? setTestimonial((prev) => getPrevTestimonialState(prev))
      : setTestimonial((prev) => getNextTestimonialState(prev));
  };

  return (
    <div className={moduleStyles.sectionContainer}>
      <blockquote ref={testimonialRef} className={moduleStyles.quoteContainer}>
        {testimonial.text}
      </blockquote>
      <div className={moduleStyles.buttonsContainer}>
        <button onClick={() => handleArrowClick("left")}>
          <ArrowIcon
            className={clsx(moduleStyles.arrowIcon, moduleStyles.arrowIconLeft)}
          />
        </button>
        <button onClick={() => handleArrowClick("right")}>
          <ArrowIcon
            className={clsx(
              moduleStyles.arrowIcon,
              moduleStyles.arrowIconRight
            )}
          />
        </button>
      </div>
    </div>
  );
}
