import { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import { JSXMapSerializer, PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { createClient } from "@/prismicio";
import Heading from "@/components/Heading";
import Bounded from "@/components/Bounded";
import styles from '@/styles/styles.module.css';
import Service from "@/components/Service";

const components: JSXMapSerializer = {
  heading2: ({children}) => (
    <Heading as="h2" size="md" className="text-center mb-8">
      {children}
    </Heading>
  )
}

/**
 * Props for `Services`.
 */
export type ServicesProps = SliceComponentProps<Content.ServicesSlice>;

/**
 * Component for "Services" Slices.
 */
const Services: FC<ServicesProps> = async({ slice }) => {
  // console.log(slice.primary.service);
  const client = createClient();
  const serviceQueries = slice.primary.service.map((item) => {
    if (isFilled.contentRelationship(item.service) && item.service.uid) {
      return client.getByUID('service', item.service.uid);
    }
  });

  const services = await Promise.all(serviceQueries);
  // console.log(services);
  // FIX BORDER RADIUS ON IMAGES
  return (
    <Bounded data-slice-type={slice.slice_type} data-slice-variation={slice.variation} className={`${styles.backgroundCream300}`}>
      <PrismicRichText field={slice.primary.heading} components={components}/>
      <div className={`${styles.grid2Col}`}>
        {services.map((item, index) => item && (
          <Service item={item} key={`service-${index}`} />
        ))}
      </div>
    </Bounded>
  );
};

export default Services;
