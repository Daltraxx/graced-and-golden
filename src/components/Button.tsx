import { PrismicNextLink, PrismicNextLinkProps } from "@prismicio/next";
import clsx from "clsx";
import styles from '@/styles/styles.module.css'

type ButtonProps = PrismicNextLinkProps & {
   color?: 'cream-200' | 'brown-200' | 'brown-300' | 'brown-500' | 'brown-700' | 'brown-800' | 'beige-300';
}


export default function Button({
   className,
   color = 'brown-200',
   ...restProps
}: ButtonProps) {

   return (
      <PrismicNextLink 
         className={clsx(styles.button,
            color === 'cream-200' && styles.buttonCream200,
            color === 'brown-200' && styles.buttonBrown200,
            color === 'brown-300' && styles.buttonBrown300,
            color === 'brown-500' && styles.buttonBrown500,
            color === 'brown-700' && styles.buttonBrown700,
            color === 'brown-800' && styles.buttonBrown800,
            color === 'beige-300' && styles.buttonBeige300,
            className)}
         {...restProps}
      />
   );
}