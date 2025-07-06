import { PrismicNextLink, PrismicNextLinkProps } from "@prismicio/next";
import clsx from "clsx";
import styles from '@/styles/styles.module.css'

type ButtonProps = PrismicNextLinkProps & {
   color?: 'brown-200' | 'brown-300' | 'brown-500';
}


export default function Button({
   className,
   color = 'brown-200',
   ...restProps
}: ButtonProps) {

   return (
      <PrismicNextLink 
         className={clsx(styles.button,
            color === 'brown-200' && styles.buttonBrown200,
            color === 'brown-300' && styles.buttonBrown300,
            color === 'brown-500' && styles.buttonBrown500,
            className)}
         {...restProps}
      />
   );
}