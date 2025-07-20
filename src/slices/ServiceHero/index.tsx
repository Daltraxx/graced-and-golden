import { FC } from "react";
import { Content } from "@prismicio/client";
import { JSXMapSerializer, PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Heading from "@/components/Heading";
import Bounded from "@/components/Bounded";
import moduleStyles from '@/slices/ServiceHero/styles.module.css';
import clsx from "clsx";

const components: JSXMapSerializer = {
  heading1: ({ children }) => (
    <Heading as="h1" size="lg" className='' >
      {children}
    </Heading>
  ),
  heading2: ({ children }) => (
    <Heading as="h2" size="sm" className='' fontDisplay={false} >
      {children}
    </Heading>
  )
}

/**
 * Props for `ServiceHero`.
 */
export type ServiceHeroProps = SliceComponentProps<Content.ServiceHeroSlice>;

/**
 * Component for "ServiceHero" Slices.
 */
const ServiceHero: FC<ServiceHeroProps> = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={moduleStyles.boundedContainer}
    >
      <div className={moduleStyles.heroContainer} >
        <div className={moduleStyles.headingsContainer} >
          <section
            style={{
              backgroundImage: `url(${slice.primary.background_image.url})`,
            }}
            className={clsx(moduleStyles.headingSection, moduleStyles.mainheadingSection)}
          >
            <PrismicRichText field={slice.primary.main_heading} components={components} />
          </section>
          <section className={clsx(moduleStyles.headingSection, moduleStyles.subHeadingSection)} >
            <PrismicRichText field={slice.primary.sub_heading} components={components} />
          </section>
        </div>
      </div>
    </Bounded>
  );
};

export default ServiceHero;
