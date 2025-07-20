import { FC } from "react";
import { Content } from "@prismicio/client";
import { JSXMapSerializer, PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Heading from "@/components/Heading";
import Bounded from "@/components/Bounded";

const components: JSXMapSerializer = {
  heading1: ({ children }) => (
    <Heading as="h1" size="lg" className='' >
      {children}
    </Heading>
  ),
  heading2: ({ children }) => (
    <Heading as="h2" size="md" className='' >
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
    >
      <div>
        <section style={{ backgroundImage: `url(${slice.primary.background_image.url})`}}>
          <PrismicRichText field={slice.primary.main_heading} components={components} />
        </section>
        <section>
          <PrismicRichText field={slice.primary.sub_heading} components={components} />
        </section>
      </div>
    </Bounded>
  );
};

export default ServiceHero;
