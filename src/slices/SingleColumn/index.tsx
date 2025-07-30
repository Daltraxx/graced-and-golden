import { FC } from "react";
import { Content } from "@prismicio/client";
import { JSXMapSerializer, PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Bounded from "@/components/Bounded";
import moduleStyles from '@/slices/SingleColumn/styles.module.css';
import Heading from "@/components/Heading";
import Button from "@/components/Button/Button";
import clsx from "clsx";

const components : JSXMapSerializer = {
  heading2: ({children}) => (
    <Heading as="h2" size="sm" className="my-4">{children}</Heading>
  ),
  heading3: ({children}) => (
    <Heading as="h3" size="sm" className="my-4" >{children}</Heading>
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
    <Bounded data-slice-type={slice.slice_type} data-slice-variation={slice.variation} className={moduleStyles.boundedContainer} horizontalSpacing={false} verticalPadding={false}>
      <div style={{ backgroundImage: `url(${slice.primary.background_image.url})`}} className={clsx(moduleStyles.contentContainer, !slice.primary.heading.length && moduleStyles.noHeading)}>
        <PrismicRichText field={slice.primary.heading} components={components}/>
        <PrismicRichText field={slice.primary.body} components={components}/>
        <ul className={`${moduleStyles.buttonContainer}`}>
          <li>
            <Button field={slice.primary.link_left} className={`${moduleStyles.button}`} color="brown-200" />
          </li>
          <li>
            <Button field={slice.primary.link_right} className={`${moduleStyles.button}`} color="brown-500" />
          </li>
        </ul>
      </div>
      
    </Bounded>
  );
};

export default SingleColumn;
