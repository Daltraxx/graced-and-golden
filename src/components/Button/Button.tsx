import { PrismicNextLink, PrismicNextLinkProps } from "@prismicio/next";
import clsx from "clsx";
import buttonStyles from '@/components/Button/styles.module.css'

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
         className={clsx(buttonStyles.button,
            color === 'cream-200' && buttonStyles.buttonCream200,
            color === 'brown-200' && buttonStyles.buttonBrown200,
            color === 'brown-300' && buttonStyles.buttonBrown300,
            color === 'brown-500' && buttonStyles.buttonBrown500,
            color === 'brown-700' && buttonStyles.buttonBrown700,
            color === 'brown-800' && buttonStyles.buttonBrown800,
            color === 'beige-300' && buttonStyles.buttonBeige300,
            className)}
         {...restProps}
      />
   );
}