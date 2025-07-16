'use client';

import { FC, useRef } from "react";
import { Content } from "@prismicio/client";
import { JSXMapSerializer, PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import Button from "@/components/Button";
import moduleStyles from '@/slices/HeroLargeImageWithLinks/styles.module.css';
import useAddAnimation from "@/utilities/addAnimation";

const components: JSXMapSerializer = {
  heading1: ({children}) => (
    <Heading as="h1" size="lg" className="text-center animated-element">
      {children}
    </Heading>
  ),
  paragraph: ({ children }) => (
    <p className={`${moduleStyles.text} text-center text-3xl mr-4 mb-4 animated-element`}>
      {children}
    </p>
  )
}

/**
 * Props for `HomepageHero`.
 */
export type HomepageHeroProps = SliceComponentProps<Content.HomepageHeroSlice>;

/**
 * Component for "HomepageHero" Slices.
 */
const HomepageHero: FC<HomepageHeroProps> = ({ slice }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  useAddAnimation(containerRef, .5);
  
  const getButtonColor = (index: number) => {
    switch (index) {
      case 0:
        return 'brown-200';
      case 1:
        return 'brown-500';
      case 2:
        return 'brown-300';
      default:
        return 'brown-200';
    }
  }

  return (
    <Bounded data-slice-type={slice.slice_type} data-slice-variation={slice.variation} verticalPadding={false} className={`${moduleStyles.heroContainer}`}>
      <div ref={containerRef}>
        <div className={`${moduleStyles.row} ${moduleStyles.empty}`}></div>
        <div className={`${moduleStyles.row} ${moduleStyles.headingRow} animated-element`}>
          <PrismicRichText field={slice.primary.main_heading} components={components}/>
        </div>
        <section className={`${moduleStyles.row} ${moduleStyles.linksRow} mt-4`}>
          <PrismicRichText field={slice.primary.short_text} components={components}/>
          <ul className={`${moduleStyles.links} animated-element`}>
            {slice.primary.link.map((link, i) => (
              <li key={link.key}><Button field={link} color={getButtonColor(i)} className={`${moduleStyles.button}`} /></li>
            ))}
          </ul>
        </section>
      </div>
    </Bounded>
  );
};

export default HomepageHero;
