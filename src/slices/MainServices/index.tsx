import { FC } from "react";
import { Content } from "@prismicio/client";
import { JSXMapSerializer, PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Heading from "@/components/Heading";
import Bounded from "@/components/Bounded";
import { PrismicNextLink } from "@prismicio/next";
import moduleStyles from '@/slices/MainServices/styles.module.css';
import Button from "@/components/Button";

const components: JSXMapSerializer = {
  heading2: ({children}) => (
    <Heading as="h2" size="md" className="">
      {children}
    </Heading>
  ),
  heading3: ({ children }) => (
    <Heading as="h3" size="sm" className="">
      {children}
    </Heading>
  ),
  heading4: ({ children }) => (
    <Heading as="h4" size="md" fontDisplay={false} className="">
      {children}
    </Heading>
  )
}

/**
 * Props for `MainServices`.
 */
export type MainServicesProps = SliceComponentProps<Content.MainServicesSlice>;

/**
 * Component for "MainServices" Slices.
 */
const MainServices: FC<MainServicesProps> = ({ slice }) => {

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={moduleStyles.boundedContainer}
    >
      <PrismicRichText field={slice.primary.main_header} components={components} />
      <section className={moduleStyles.servicesContainer} >
        {slice.primary.service.map((item, i) => (
          <section key={`service-section-${i}`} >
            <div className={moduleStyles.serviceBody} >
              <PrismicRichText field={item.service_name} components={components} />
              <PrismicRichText field={item.service_body_text} components={components} />
              <div className={moduleStyles.serviceDetails} >
                <PrismicRichText field={item.price_and_duration} components={components} />
                <PrismicRichText field={item.addendum} components={components} />
              </div>
            </div>
            <div className={moduleStyles.linkContainer} >
              {item.link.length > 1 && (
                <ul className={moduleStyles.linkList} >
                  {item.link.map((link, i) => (
                    <li key={link.key}>
                      {i % 2 === 0 && <Button field={link} color="brown-300" />}
                      {i % 2 !== 0 && <Button field={link} color="brown-200" />}
                    </li>
                  ))}
                </ul>
              )}
              {item.link.length === 1 && (
                <Button field={item.link[0]} color="brown-200" />
              )}
            </div>
          </section>
        ))}
      </section>
      <section>
        <PrismicRichText field={slice.primary.cancellation_policy_header} components={components} />
        <PrismicRichText field={slice.primary.cancellation_policy_body} components={components} />
      </section>
    </Bounded>
  );
};

export default MainServices;
