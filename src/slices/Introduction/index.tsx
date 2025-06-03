import { FC } from "react";
import { Content } from "@prismicio/client";
import { JSXMapSerializer, PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import styles from '@/styles/styles.module.css';

const components : JSXMapSerializer = {
  heading2: ({ children }) => (
    <Heading as="h2" size="md" className={`text-center`}>
      {children}
    </Heading>
  ),
  paragraph: ({children}) => (
    <p className="text-base font-body">{children}</p>
  )
}
/**
 * Props for `Introduction`.
 */
export type IntroductionProps = SliceComponentProps<Content.IntroductionSlice>;

/**
 * Component for "Introduction" Slices.
 */
const Introduction: FC<IntroductionProps> = ({ slice }) => {
  return (
    <Bounded data-slice-type={slice.slice_type} data-slice-variation={slice.variation} className={`${styles.backgroundCream200}`}>
      <PrismicRichText field={slice.primary.heading} components={components} />
      <div className="flex flex-col sm:flex-row justify-between place-items-center">
        <div className="w-2/5 my-4">
          {slice.primary.paragraphs_column_1.map((item, index) => (
            <div key={`paragraph-col-1-${index}`}>
              <PrismicRichText field={item.paragraph} components={components}/>
              <br />
            </div>
          ))}
        </div>
        <div className="w-2/5">
          {slice.primary.paragraphs_column_2.map((item, index) => (
            <div key={`paragraph-col-2-${index}`}>
              <PrismicRichText field={item.paragraph} components={components}/>
              <br />
            </div>
          ))}
        </div>
      </div>
    </Bounded>
  );
};

export default Introduction;
