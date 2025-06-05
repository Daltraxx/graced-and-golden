import { FC } from "react";
import { Content } from "@prismicio/client";
import { JSXMapSerializer, PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Bounded from "@/components/Bounded";
import styles from '@/styles/styles.module.css';
import moduleStyles from '@/slices/SingleColumn/styles.module.css';
import Heading from "@/components/Heading";
import Button from "@/components/Button";

const components : JSXMapSerializer = {
  heading2: ({children}) => (
    <Heading as="h2" size="md" className="my-4">{children}</Heading>
  ),
  paragraph: ({children}) => (
    <p className="">{children}</p>
  )
}

/**
 * Props for `SingleColumn`.
 */
export type SingleColumnProps = SliceComponentProps<Content.SingleColumnSlice>;

/**
 * Component for "SingleColumn" Slices.
 */
const SingleColumn: FC<SingleColumnProps> = ({ slice }) => {
  return (
    <Bounded data-slice-type={slice.slice_type} data-slice-variation={slice.variation} className={`${styles.backgroundCream200}`}>
      <div style={{ backgroundImage: `url(${slice.primary.background_image.url})`}} className={`${moduleStyles.container}`}>
        <PrismicRichText field={slice.primary.heading} components={components}/>
        <PrismicRichText field={slice.primary.body} components={components}/>
        <ul className={`${moduleStyles.buttonContainer}`}>
          <li>
            <Button field={slice.primary.link_left} className={`${styles.buttonCream200} ${moduleStyles.button}`} />
          </li>
          <li>
            <Button field={slice.primary.link_right} className={`${styles.buttonCream200} ${moduleStyles.button}`} />
          </li>
        </ul>
      </div>
    </Bounded>
  );
};

export default SingleColumn;
