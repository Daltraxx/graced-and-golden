"use client";

import { FC, useRef } from "react";
import { Content } from "@prismicio/client";
import {
  JSXMapSerializer,
  PrismicRichText,
  SliceComponentProps,
} from "@prismicio/react";
import Heading from "@/components/Heading";
import Bounded from "@/components/Bounded";
import moduleStyles from "@/slices/MainServices/styles.module.css";
import addOnsStyles from "@/slices/MainServices/addOnsStyles.module.css";
import Button from "@/components/Button/Button";
import useAddAnimation from "@/utilities/addAnimation";
import clsx from "clsx";
import dynamic from "next/dynamic";

const AppointmentRequestForm = dynamic(
  () => import("@/components/AppointmentRequestForm/AppointmentRequestForm"),
  { ssr: false }
);

const components: JSXMapSerializer = {
  heading2: ({ children }) => (
    <Heading as="h2" size="md">
      {children}
    </Heading>
  ),
  heading3: ({ children }) => (
    <Heading as="h3" size="sm">
      {children}
    </Heading>
  ),
  heading4: ({ children }) => (
    <Heading as="h4" size="md">
      {children}
    </Heading>
  ),
};

const addOnsComponents: JSXMapSerializer = {
  heading2: ({ children }) => (
    <Heading as="h2" size="md">
      {children}
    </Heading>
  ),
  heading3: ({ children }) => (
    <Heading as="h3" size="sm">
      {children}
    </Heading>
  ),
  heading4: ({ children }) => (
    <Heading as="h4" size="manual">
      {children}
    </Heading>
  ),
};

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
  if (slice.variation === "default") {
    return (
      <Bounded
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className={moduleStyles.boundedContainer}
        ref={containerRef}
      >
        {/* MAIN HEADER */}
        <div className={moduleStyles.contentContainer}>
          {slice.primary.main_header?.length > 0 && (
            <div className="animated-element">
              <PrismicRichText
                field={slice.primary.main_header}
                components={components}
              />
            </div>
          )}
          {/* SERVICES */}
          <section className={moduleStyles.servicesContainer}>
            {(slice.primary.service ?? []).map((item, i) => (
              <section
                key={`service-section-${i}`}
                className="animated-element"
              >
                <div
                  className={clsx(moduleStyles.serviceBody, moduleStyles.box)}
                >
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
          {/* APPOINTMENT REQUEST FORM */}
          <section
            id="appointment-request"
            aria-label="Appointment request"
            className="animated-element"
          >
            <AppointmentRequestForm
              heading={
                String(slice.primary.appointment_request_form_heading) ??
                undefined
              }
              placeholderText={
                String(slice.primary.form_placeholder_text) ?? undefined
              }
              className={clsx(moduleStyles.appointmentRequestForm)}
            />
          </section>
          {/* CANCELLATION POLICY */}
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
        </div>
      </Bounded>
    );
  } else {
    return (
      <Bounded
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className={moduleStyles.boundedContainer}
        ref={containerRef}
      >
        <div className={moduleStyles.contentContainer}>
          <section className={addOnsStyles.servicesAndAddOns}>

            {/* SERVICES SECTION */}
            <section className={addOnsStyles.servicesContainer}>
              {(slice.primary.service ?? []).map((item, i) => (
                <section
                  key={`service-section-${i}`}
                  className="animated-element"
                >
                  <div
                    className={clsx(addOnsStyles.serviceBody, moduleStyles.box)}
                  >
                    <PrismicRichText
                      field={item.service_name}
                      components={addOnsComponents}
                    />
                    <PrismicRichText
                      field={item.service_body_text}
                      components={addOnsComponents}
                    />
                    <div className={addOnsStyles.serviceDetails}>
                      <PrismicRichText
                        field={item.price_and_duration}
                        components={addOnsComponents}
                      />
                      <PrismicRichText
                        field={item.addendum}
                        components={addOnsComponents}
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
  
            {/* ADD-ONS SECTION */}
            <section
              className={clsx(
                addOnsStyles.addOnsContainer,
                moduleStyles.box,
                "animated-element"
              )}
            >
              <PrismicRichText
                field={slice.primary.add_ons_section_heading}
                components={components}
              />
              {(slice.primary.add_on ?? []).map((item, i) => (
                <section
                  key={`add-on-section-${i}`}
                  className={clsx(addOnsStyles.addOnSection, "animated-element")}
                >
                  <PrismicRichText
                    field={item.name}
                    components={addOnsComponents}
                  />
                  <PrismicRichText
                    field={item.description}
                    components={addOnsComponents}
                  />
                </section>
              ))}
            </section>
          </section>

          {/* APPOINTMENT REQUEST FORM */}
          <section
            id="appointment-request"
            aria-label="Appointment request"
            className="animated-element"
          >
            <AppointmentRequestForm
              heading={
                String(slice.primary.appointment_request_form_heading) ??
                undefined
              }
              placeholderText={
                String(slice.primary.form_placeholder_text) ?? undefined
              }
              className={clsx(moduleStyles.appointmentRequestForm)}
            />
          </section>

          {/* CANCELLATION POLICY */}
          <section
            className={clsx(
              moduleStyles.cancellationPolicyContainer,
              "animated-element"
            )}
          >
            <PrismicRichText
              field={slice.primary.cancellation_policy_header}
              components={addOnsComponents}
            />
            <PrismicRichText
              field={slice.primary.cancellation_policy_body}
              components={addOnsComponents}
            />
          </section>
        </div>
      </Bounded>
    );
  }
};

export default MainServices;
