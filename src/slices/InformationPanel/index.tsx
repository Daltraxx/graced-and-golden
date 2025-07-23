import { FC } from "react";
import { Content } from "@prismicio/client";
import { JSXMapSerializer, PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Heading from "@/components/Heading";
import moduleStyles from '@/slices/InformationPanel/styles.module.css';
import Bounded from "@/components/Bounded";

const components: JSXMapSerializer = {
  heading3: ({ children }) => (
    <Heading as="h3" size="lg" className={moduleStyles.mainHeading} >
      {children}
    </Heading>
  ),
  heading4: ({ children }) => (
    <Heading as="h4" size="xs" fontDisplay={false} className={moduleStyles.sectionHeading} >
      {children}
    </Heading>
  ),
  paragraph: ({children}) => (
    <p>{children}</p>
  )
}

/**
 * Props for `InformationPanel`.
 */
export type InformationPanelProps =
  SliceComponentProps<Content.InformationPanelSlice>;

/**
 * Component for "InformationPanel" Slices.
 */
const InformationPanel: FC<InformationPanelProps> = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={moduleStyles.boundedContainer}
    >
      <PrismicRichText field={slice.primary.main_heading} components={components} />
      <section className={moduleStyles.contentContainer} >
        {slice.primary.info_block.map((item, i) => (
          <section key={`info-section-${i}`}>
            <PrismicRichText field={item.info_heading} components={components} />
            <PrismicRichText field={item.info_body} components={components} />
          </section>
        ))}
      </section>
    </Bounded>
  );
};

export default InformationPanel;
