"use client";

import { JSX, useEffect, useMemo, useRef, useState } from "react";
import moduleStyles from "@/components/TestimonialCycler/styles.module.css";
import clsx from "clsx";
import ArrowIcon from "../ArrowIcon";
import fallbackTestimonials from "./fallbackTestimonials";

type TestimonialCyclerProps = {
  testimonials: JSX.Element[];
  className?: string;
};

export default function TestimonialCycler({
  testimonials,
  className,
}: TestimonialCyclerProps) {
  const testimonialPs = useMemo(
    () => (testimonials.length > 0 ? testimonials : fallbackTestimonials),
    [testimonials]
  );

  const [testimonial, setTestimonial] = useState({
    text: testimonialPs[0],
    index: 0,
  });

  const [cyclerActive, setCyclerActive] = useState(true);

  type TestimonialState = {
    text: JSX.Element;
    index: number;
  };

  const getNextTestimonialState = (prevTestimonialState: TestimonialState) => {
    const nextIndex = (prevTestimonialState.index + 1) % testimonialPs.length;
    return {
      text: testimonialPs[nextIndex],
      index: nextIndex,
    };
  };

  const getPrevTestimonialState = (prevTestimonialState: TestimonialState) => {
    const n = testimonialPs.length;
    const nextIndex = (prevTestimonialState.index - 1 + n) % n;
    return {
      text: testimonialPs[nextIndex],
      index: nextIndex,
    };
  };

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (cyclerActive) {
      intervalRef.current = setInterval(() => {
        setTestimonial((prev) => {
          return getNextTestimonialState(prev);
        });
      }, 10000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [testimonialPs, cyclerActive]);

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
  }, [testimonial, cyclerActive]);

  const handleArrowClick = (direction: "left" | "right") => {
    if (cyclerActive) {
      setCyclerActive(false);
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (testimonialRef.current) {
        testimonialRef.current.classList.remove(moduleStyles.animation1);
        testimonialRef.current.classList.remove(moduleStyles.animation2);
      }
    }

    setTestimonial((prev) =>
      direction === "left"
        ? getPrevTestimonialState(prev)
        : getNextTestimonialState(prev)
    );
  };

  const arrowIconFill = "#7B5C4B";

  return (
    <div className={className}>
      <blockquote
        ref={testimonialRef}
        className={moduleStyles.quoteContainer}
        aria-live="polite"
        aria-atomic="true"
      >
        {testimonial.text}
      </blockquote>
      <div className={moduleStyles.buttonsContainer}>
        <button
          onClick={() => handleArrowClick("left")}
          className={moduleStyles.arrowButton}
          aria-label="Previous Testimonial"
        >
          <ArrowIcon
            className={clsx(moduleStyles.arrowIcon, moduleStyles.arrowIconLeft)}
            fill={arrowIconFill}
          />
        </button>
        <button
          onClick={() => handleArrowClick("right")}
          className={moduleStyles.arrowButton}
          aria-label="Next Testimonial"
        >
          <ArrowIcon
            className={clsx(
              moduleStyles.arrowIcon,
              moduleStyles.arrowIconRight
            )}
            fill={arrowIconFill}
          />
        </button>
      </div>
    </div>
  );
}
