import { FC } from "react";
import { Content } from "@prismicio/client";
import { JSXMapSerializer, PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Heading from "@/components/Heading";
import moduleStyles from '@/slices/BridalPackage/styles.module.css';
import Bounded from "@/components/Bounded";
import { PrismicNextImage } from "@prismicio/next";

const components: JSXMapSerializer = {
  heading2: ({children}) => (
    <Heading as="h2" size="lg" className={``} >
        {children}
    </Heading>
  ),
  heading3: ({children}) => (
    <Heading as="h3" size="sm" className="">
        {children}
    </Heading>
  ),
  paragraph: ({children}) => (
    <p className="">{children}</p>
  ),
}

/**
 * Props for `BridalPackage`.
 */
export type BridalPackageProps =
  SliceComponentProps<Content.BridalPackageSlice>;

/**
 * Component for "BridalPackage" Slices.
 */
const BridalPackage: FC<BridalPackageProps> = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <section>
        <PrismicRichText field={slice.primary.package_name} />
        <PrismicRichText field={slice.primary.package_body_text} />
      </section>
      <section>
        <div>
          <PrismicNextImage field={slice.primary.deal_logo} />
          <PrismicRichText field={slice.primary.deal_heading} />
        </div>
        <div>
          <ul>
            {slice.primary.bullet_points.map((item, i) => (
              <li key={`bridal-bullet-${i}`}><PrismicRichText field={item.bullet_point} /></li>
            ))}
          </ul>
          <PrismicRichText field={slice.primary.sub_text} />
          <PrismicRichText field={slice.primary.asterisk_text} />
          <PrismicNextImage field={slice.primary.deal_image} />
        </div>
        <div>
          <PrismicRichText field={slice.primary.deal_bottom_tagline} />
        </div>
      </section>
    </Bounded>
  );
};

export default BridalPackage;
