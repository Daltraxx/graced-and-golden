import { PrismicNextLink, PrismicNextLinkProps } from "@prismicio/next";
import clsx from "clsx";
import styles from '@/styles/styles.module.css'


export default function Button({
   className,
   ...restProps
}: PrismicNextLinkProps) {

   return (
      <PrismicNextLink 
         className={clsx(className, styles.button)}
         {...restProps}
      />
   );
}