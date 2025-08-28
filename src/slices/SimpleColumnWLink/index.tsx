"use client";

import { FC, useRef } from "react";
import { Content } from "@prismicio/client";
import {
  JSXMapSerializer,
  PrismicRichText,
  SliceComponentProps,
} from "@prismicio/react";
import Heading from "@/components/Heading";
import Bounded from "@/components/Bounded";
import Button from "@/components/Button/Button";
import moduleStyles from "@/slices/SimpleColumnWLink/styles.module.css";
import useAddAnimation from "@/utilities/addAnimation";
import clsx from "clsx";

const defaultComponents: JSXMapSerializer = {
  heading2: ({ children }) => (
    <Heading as="h2" size="md" font="cursive">
      {children}
    </Heading>
  ),
  heading3: ({ children }) => (
    <Heading as="h3" size="md" font="cursive">
      {children}
    </Heading>
  ),
  paragraph: ({ children }) => <p>{children}</p>,
};

const altComponents: JSXMapSerializer = {
  heading2: ({ children }) => (
    <Heading as="h2" size="md">
      {children}
    </Heading>
  ),
  heading3: ({ children }) => (
    <Heading as="h3" size="md">
      {children}
    </Heading>
  ),
  paragraph: ({ children }) => <p>{children}</p>,
};

/**
 * Props for `SimpleColumnWLink`.
 */
export type SimpleColumnWLinkProps =
  SliceComponentProps<Content.SimpleColumnWLinkSlice>;

/**
 * Component for "SimpleColumnWLink" Slices.
 */
const SimpleColumnWLink: FC<SimpleColumnWLinkProps> = ({ slice }) => {
  const containerRef = useRef<HTMLElement>(null);
  useAddAnimation(containerRef);

  const getRichTextComponents = () => slice.variation === 'default' ? defaultComponents : altComponents;

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={moduleStyles.boundedContainer}
      ref={containerRef}
    >
      <div
        className={clsx(
          moduleStyles.contentContainer,
          slice.variation === "default"
            ? moduleStyles.defaultContainerStyles
            : moduleStyles.altContainerStyles,
          "animated-element"
        )}
      >
        <PrismicRichText
          field={slice.primary.heading}
          components={getRichTextComponents()}
        />
        <PrismicRichText
          field={slice.primary.body_text}
          components={getRichTextComponents()}
        />
        <Button field={slice.primary.link} color="cream-200" />
      </div>
    </Bounded>
  );
};

export default SimpleColumnWLink;
