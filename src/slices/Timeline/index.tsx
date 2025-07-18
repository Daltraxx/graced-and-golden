import { FC } from "react";
import { Content } from "@prismicio/client";
import { JSXMapSerializer, PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Heading from "@/components/Heading";
import Bounded from "@/components/Bounded";
import { PrismicNextImage } from "@prismicio/next";

const components: JSXMapSerializer = {
  heading2: ({children}) => (
    <Heading as="h2" size="md" className={``} >
        {children}
    </Heading>
  ),
  heading3: ({children}) => (
    <Heading as="h3" size="md" className={``} >
        {children}
    </Heading>
  ),
  heading4: ({children}) => (
    <Heading as="h4" size="xs" className={``} >
        {children}
    </Heading>
  ),
  paragraph: ({children}) => (
    <p className="">{children}</p>
  ),
}

/**
 * Props for `Timeline`.
 */
export type TimelineProps = SliceComponentProps<Content.TimelineSlice>;

/**
 * Component for "Timeline" Slices.
 */
const Timeline: FC<TimelineProps> = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <PrismicRichText field={slice.primary.heading} />
      <section>
        <ol>
          {slice.primary.timeline.map((item, i) => (
            <li key={`timeline-item-${i}`}>
              <section>
                <PrismicNextImage field={item.icon_image} />
                <span>{i + 1}.</span><PrismicRichText field={item.item_heading} />
                <PrismicRichText field={item.text_body} />
              </section>
            </li>
          ))}
        </ol>
      </section>
    </Bounded>
  );
};

export default Timeline;
