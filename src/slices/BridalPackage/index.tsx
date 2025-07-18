import { FC } from "react";
import { Content } from "@prismicio/client";
import { JSXMapSerializer, PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Heading from "@/components/Heading";
import moduleStyles from '@/slices/BridalPackage/styles.module.css';
import Bounded from "@/components/Bounded";
import { PrismicNextImage } from "@prismicio/next";
import HeartIcon from "@/components/HeartIcon";

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
      className={moduleStyles.boundedContainer}
    >
      <div className={moduleStyles.contentContainer}>
        <section className={`${moduleStyles.cardContainer} ${moduleStyles.explainerContainer}`}>
          <PrismicRichText field={slice.primary.package_name} components={components} />
          <div className={moduleStyles.explainerTextContainer} >
            <PrismicRichText field={slice.primary.package_body_text} components={components} />
          </div>
        </section>
        <section className={`${moduleStyles.cardContainer}`}>
          <div className={`${moduleStyles.dealBorder} ${moduleStyles.dealBorderTop}`}>
            <PrismicNextImage field={slice.primary.deal_logo} />
            <PrismicRichText field={slice.primary.deal_heading} components={components} />
          </div>
          <div className={moduleStyles.dealBodyContainer}>
            <div className={moduleStyles.dealTextContainer}>
              <ul>
                {slice.primary.bullet_points.map((item, i) => (
                  <li key={`bridal-bullet-${i}`}><HeartIcon className={moduleStyles.listIcon} /><PrismicRichText field={item.bullet_point} /></li>
                ))}
              </ul>
              <PrismicRichText field={slice.primary.sub_text} components={components} />
              <PrismicRichText field={slice.primary.asterisk_text} components={components} />
            </div>
            <div className={moduleStyles.dealImageContainer} >
              <PrismicNextImage field={slice.primary.deal_image} />
            </div>
          </div>
          <div className={`${moduleStyles.dealBorder} ${moduleStyles.dealBorderBottom}`}>
            <PrismicRichText field={slice.primary.deal_bottom_tagline} components={components} />
          </div>
        </section>
      </div>
    </Bounded>
  );
};

export default BridalPackage;
