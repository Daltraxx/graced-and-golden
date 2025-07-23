import { FC } from "react";
import { Content } from "@prismicio/client";
import { JSXMapSerializer, PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Heading from "@/components/Heading";
import moduleStyles from '@/slices/InformationPanel/styles.module.css';
import Bounded from "@/components/Bounded";

const components: JSXMapSerializer = {
  heading3: ({ children }) => (
    <Heading as="h3" size="sm" className="">
      {children}
    </Heading>
  ),
  heading4: ({ children }) => (
    <Heading as="h4" size="md" fontDisplay={false} className="">
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
    >
      <PrismicRichText field={slice.primary.main_heading} />
      <section>
        {slice.primary.info_block.map((item, i) => (
          <section key={`info-section-${i}`}>
            <PrismicRichText field={item.info_heading} />
            <PrismicRichText field={item.info_body} />
          </section>
        ))}
      </section>
    </Bounded>
  );
};

export default InformationPanel;
