'use client';

import { FC, useRef } from "react";
import { Content } from "@prismicio/client";
import { JSXMapSerializer, PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import Button from "@/components/Button/Button";
import defaultStyles from '@/slices/HeroLargeImageWithLinks/defaultStyles.module.css';
import altStyles from '@/slices/HeroLargeImageWithLinks/altStyles.module.css';
import useAddAnimation from "@/utilities/addAnimation";

const components: JSXMapSerializer = {
  heading1: ({children}) => (
    <Heading as="h1" size="lg" className="text-center animated-element">
      {children}
    </Heading>
  ),
  paragraph: ({ children }) => (
    <p className={`text-center animated-element`}>
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

  if (slice.variation === 'default') {
    return (
      <Bounded data-slice-type={slice.slice_type} data-slice-variation={slice.variation} verticalPadding={false} className={`${defaultStyles.heroContainer}`}>
        <div ref={containerRef}>
          <div className={`${defaultStyles.row} ${defaultStyles.empty}`}></div>
          <div className={`${defaultStyles.row} ${defaultStyles.headingRow}`}>
            <PrismicRichText field={slice.primary.main_heading} components={components}/>
          </div>
          <section className={`${defaultStyles.row} ${defaultStyles.linksRow}`}>
            <PrismicRichText field={slice.primary.short_text} components={components}/>
            <ul className={`${defaultStyles.links} animated-element`}>
              {slice.primary.link.map((link, i) => (
                <li key={link.key}><Button field={link} color={getButtonColor(i)} className={`${defaultStyles.button}`} /></li>
              ))}
            </ul>
          </section>
        </div>
      </Bounded>
    );
  } else {
    return (
      <Bounded data-slice-type={slice.slice_type} data-slice-variation={slice.variation} verticalPadding={false} className={`${altStyles.boundedContainer}`}>
        <div ref={containerRef} className={altStyles.heroContainer}>
          <div className={`${altStyles.textRow} animated-elemen`}>
            <PrismicRichText field={slice.primary.main_heading} components={components}/>
          </div>
          <div className={`${altStyles.textRow} animated-elemen`}>
            <PrismicRichText field={slice.primary.body_text} components={components}/>
          </div>
          <ul className={`${altStyles.links} animated-elemen`}>
            {slice.primary.link.map((link, i) => (
              <li key={link.key}><Button field={link} color={getButtonColor(i)} className={`${altStyles.button}`} /></li>
            ))}
          </ul>
        </div>
      </Bounded>
    )
  }
  
};

export default HomepageHero;
