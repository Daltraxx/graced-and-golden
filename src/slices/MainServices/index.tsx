'use client';

import { FC, useActionState, useRef } from "react";
import { Content } from "@prismicio/client";
import { JSXMapSerializer, PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Heading from "@/components/Heading";
import Bounded from "@/components/Bounded";
import moduleStyles from '@/slices/MainServices/styles.module.css';
import Button from "@/components/Button/Button";
import useAddAnimation from "@/utilities/addAnimation";
import clsx from "clsx";
import { AppointmentRequestState, sendAppointmentRequest } from "@/app/lib/actions";

const components: JSXMapSerializer = {
  heading2: ({children}) => (
    <Heading as="h2" size="md" >
      {children}
    </Heading>
  ),
  heading3: ({ children }) => (
    <Heading as="h3" size="sm" >
      {children}
    </Heading>
  ),
  heading4: ({ children }) => (
    <Heading as="h4" size="md" >
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
  const containerRef = useRef<HTMLDivElement>(null);
  useAddAnimation(containerRef);

  const initialState: AppointmentRequestState = {
    message: null,
    errors: {},
  };

  const [appointmentRequestState, formAction] = useActionState(
    sendAppointmentRequest,
    initialState
  );

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={moduleStyles.boundedContainer}
      ref={containerRef}
    >
      <div className="animated-element">
        <PrismicRichText
          field={slice.primary.main_header}
          components={components}
        />
      </div>
      <section className={moduleStyles.servicesContainer}>
        {slice.primary.service.map((item, i) => (
          <section key={`service-section-${i}`} className="animated-element">
            <div className={moduleStyles.serviceBody}>
              <PrismicRichText
                field={item.service_name}
                components={components}
              />
              <PrismicRichText
                field={item.service_body_text}
                components={components}
              />
              <div className={moduleStyles.serviceDetails}>
                <PrismicRichText
                  field={item.price_and_duration}
                  components={components}
                />
                <PrismicRichText
                  field={item.addendum}
                  components={components}
                />
              </div>
            </div>
            <div className={moduleStyles.linkContainer}>
              {item.link.length > 1 && (
                <ul className={moduleStyles.linkList}>
                  {item.link.map((link, i) => (
                    <li key={`main-service-link-${i}`}>
                      <Button
                        field={link}
                        color={i % 2 === 0 ? "brown-800" : "brown-300"}
                      />
                    </li>
                  ))}
                </ul>
              )}
              {item.link.length === 1 && (
                <Button field={item.link[0]} color="brown-300" />
              )}
            </div>
          </section>
        ))}
      </section>
      <section>
        <form action={formAction}>
          <textarea name="message" id="message" />
          <button type="submit">Send Request</button>
        </form>
      </section>
      <section
        className={clsx(
          moduleStyles.cancellationPolicyContainer,
          "animated-element"
        )}
      >
        <PrismicRichText
          field={slice.primary.cancellation_policy_header}
          components={components}
        />
        <PrismicRichText
          field={slice.primary.cancellation_policy_body}
          components={components}
        />
      </section>
    </Bounded>
  );
};

export default MainServices;
