import { FC } from "react";
import { Content } from "@prismicio/client";
import { JSXMapSerializer, PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Bounded from "@/components/Bounded";
import { PrismicNextLink } from "@prismicio/next";
import Heading from "@/components/Heading";

const components: JSXMapSerializer = {
  heading1: ({children}) => (
    <Heading as="h1" size="lg" className="text-center pt-2">
      {children}
    </Heading>
  ),
  paragraph: ({ children }) => (
    <p className="">
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
  return (
    <Bounded data-slice-type={slice.slice_type} data-slice-variation={slice.variation} >
      <PrismicRichText field={slice.primary.main_heading} components={components}/>
      <PrismicRichText field={slice.primary.short_text} components={components}/>
      {slice.primary.link.map((link) => (
        <PrismicNextLink
          key={link.key}
          field={link}
        />
      ))}
    </Bounded>
  );
};

export default HomepageHero;
