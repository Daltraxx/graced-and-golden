import { FC } from "react";
import { Content, isFilled } from "@prismicio/client";
import { JSXMapSerializer, PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { createClient } from "@/prismicio";
import { PrismicNextImage } from "@prismicio/next";
import Heading from "@/components/Heading";
import Bounded from "@/components/Bounded";
import Button from "@/components/Button";
import styles from '@/styles/styles.module.css';

const components: JSXMapSerializer = {
  heading2: ({children}) => (
    <Heading as="h2" size="md" className="text-center mb-8">
      {children}
    </Heading>
  ),
  heading3: ({children}) => (
    <Heading as="h3" size="sm" className="text-center mt-2">
      {children}
    </Heading>
  ),
  paragraph: ({ children }) => (
    <p className="max-w-4/5 my-2 mx-auto">
      {children}
    </p>
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

  return (
    <Bounded data-slice-type={slice.slice_type} data-slice-variation={slice.variation} className={`${styles.backgroundCream300}`}>
      <PrismicRichText field={slice.primary.heading} components={components}/>
      <div className={`${styles.grid2Col}`}>
        {services.map((item, index) => item && (
          <div key={`service-${index}`} className="bg-white rounded-2xl">
            <PrismicNextImage field={item.data.image} className={`${styles.serviceImage} mx-auto mt-4`}/>
            <PrismicRichText field={item.data.service_name} components={components}/>
            <Button field={item.data.book_button} className={`${styles.buttonBrown300} w-fit mx-auto my-2.5`}/>
            <PrismicRichText field={item.data.details} components={components} />
            <p className="mx-auto max-w-4/5">{item.data.disclaimer}</p>
            <p className="mx-auto max-w-4/5 mb-4">{`${item.data.price} | ${item.data.duration}`}</p>
          </div>
        ))}
      </div>
    </Bounded>
  );
};

export default Services;
