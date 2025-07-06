import { FC } from "react";
import { Content } from "@prismicio/client";
import { JSXMapSerializer, PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import Button from "@/components/Button";
import moduleStyles from '@/slices/HomepageHero/styles.module.css';

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
    <Bounded data-slice-type={slice.slice_type} data-slice-variation={slice.variation} className={`${moduleStyles.heroContainer}`}>
      <section>
        <PrismicRichText field={slice.primary.main_heading} components={components}/>
      </section>
      <section>
        <PrismicRichText field={slice.primary.short_text} components={components}/>
        <div>
          {slice.primary.link.map((link, i) => (
            <Button key={link.key} field={link} color={getButtonColor(i)} className={`${moduleStyles.button}`} />
          ))}
        </div>
      </section>
    </Bounded>
  );
};

export default HomepageHero;
