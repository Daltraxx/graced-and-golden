import { FC } from "react";
import { Content } from "@prismicio/client";
import { JSXMapSerializer, PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Heading from "@/components/Heading";
import Bounded from '../../components/Bounded';

const components: JSXMapSerializer = {
  heading2: ({ children }) => (
    <Heading as="h2" size="lg" className='' >
      {children}
    </Heading>
  ),
  heading3: ({ children }) => (
    <Heading as="h3" size="md" className='' fontDisplay={false} >
      {children}
    </Heading>
  ),
  list: ({ children }) => (
    <ul className="list-disc">
      {children}
    </ul>
  )
}

/**
 * Props for `TimelineLarge`.
 */
export type TimelineLargeProps =
  SliceComponentProps<Content.TimelineLargeSlice>;

/**
 * Component for "TimelineLarge" Slices.
 */
const TimelineLarge: FC<TimelineLargeProps> = ({ slice }) => {

  const firstTimelineSection = slice.primary.timeline_section[0] && (
    <section>
      <PrismicRichText field={slice.primary.timeline_section[0].heading} components={components} />
      <div>
        <PrismicRichText field={slice.primary.timeline_section[0].care_list} components={components} />
      </div>
    </section>
  );

  const remainingTimelineSections = slice.primary.timeline_section.map((item, i) => (
    i !== 0 && (
      <section key={`timeline-section-${i}`} >
        <PrismicRichText field={item.heading} components={components} />
        <div>
          <PrismicRichText field={item.care_list} components={components} />
        </div>
      </section>
    )
  ))
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <PrismicRichText field={slice.primary.main_heading} components={components} />
      
      <div>
        {firstTimelineSection}
        <div>
          <div style={{backgroundImage: `url(${slice.primary.image_1.url})`}} ></div>
          <div style={{backgroundImage: `url(${slice.primary.image_2.url})`}} ></div>
        </div>
        {remainingTimelineSections}
      </div>
      
    </Bounded>
  );
};

export default TimelineLarge;
