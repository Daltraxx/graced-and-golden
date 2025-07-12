import { FC } from "react";
import { Content } from "@prismicio/client";
import { JSXMapSerializer, PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Heading from "@/components/Heading";
import Bounded from "@/components/Bounded";
import { PrismicNextLink } from "@prismicio/next";

const components: JSXMapSerializer = {
  heading2: ({ children }) => (
    <Heading as="h2" size="md" className="">
      {children}
    </Heading>
  ),
  paragraph: ({ children }) => {
    const textWithSurroundingQuotes = [...children];
    textWithSurroundingQuotes.push('"');
    textWithSurroundingQuotes.unshift('"');
    return <p className="">{textWithSurroundingQuotes}</p>
  }
}

/**
 * Props for `Testimonials`.
 */
export type TestimonialsProps = SliceComponentProps<Content.TestimonialsSlice>;

/**
 * Component for "Testimonials" Slices.
 */
const Testimonials: FC<TestimonialsProps> = ({ slice }) => {

  const testimonials = slice.primary.testimonial.map((item) => (
    <PrismicRichText field={item.testimonial} components={components}/>
  ));
  

  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <section>
        <section>
          <PrismicRichText field={slice.primary.text_1} components={components} />
          <ul>
            {slice.primary.links_1.map((link) => (
              <li key={link.key}>
                <PrismicNextLink field={link} />
              </li>
            ))}
          </ul>
        </section>
        <section>
          <PrismicRichText field={slice.primary.text_2} components={components} />
          <PrismicNextLink field={slice.primary.links_2} />
        </section>
      </section>
      <div style={{ backgroundImage: `url(${slice.primary.center_image})` }}></div>
      <section>
        {testimonials[0]}
      </section>
    </Bounded>
  );
};

export default Testimonials;
