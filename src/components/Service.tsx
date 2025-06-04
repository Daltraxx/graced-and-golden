import { PrismicNextImage } from "@prismicio/next";
import { JSXMapSerializer, PrismicRichText } from "@prismicio/react";
import Button from "./Button";
import styles from '@/styles/styles.module.css';
import { Content } from "@prismicio/client";
import Heading from "./Heading";

const components: JSXMapSerializer = {
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


export default function Service({ item }: { item: Content.ServiceDocument<string>}) {
   return (
      <section className="bg-white rounded-2xl">
         <div className="mt-4">
            <PrismicNextImage field={item.data.image} className={`${styles.serviceImage} mx-auto`}/>
            <PrismicRichText field={item.data.service_name} components={components}/>
            <Button field={item.data.book_button} className={`${styles.buttonBrown300} w-fit mx-auto my-2.5`}/>
            <PrismicRichText field={item.data.details} components={components} />
            <p className="mx-auto max-w-4/5">{item.data.disclaimer}</p>
            <p className="mx-auto max-w-4/5 mb-4">{`${item.data.price} | ${item.data.duration}`}</p>
         </div>
      </section>
   );
}