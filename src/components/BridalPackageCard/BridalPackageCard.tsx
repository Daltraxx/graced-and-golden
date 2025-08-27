import { BridalPackageProps } from "@/slices/BridalPackage";
import { PrismicNextImage } from "@prismicio/next";
import { JSXMapSerializer, PrismicRichText } from "@prismicio/react";
import { FC } from "react";
import moduleStyles from '@/components/BridalPackageCard/styles.module.css';
import Heading from "../Heading";
import HeartIcon from "../HeartIcon";


const components: JSXMapSerializer = {
  heading3: ({children}) => (
    <Heading as="h3" size="sm" className="">
        {children}
    </Heading>
  ),
  paragraph: ({children}) => (
    <p className="">{children}</p>
  )
}

interface BridalPackageCardProps extends BridalPackageProps {
   className: string;
}


const BridalPackageCard: FC<BridalPackageCardProps> = ({ slice, className }) => {

   return slice.variation === 'default' && (
      <section className={className}>
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
   );
}

export default BridalPackageCard;