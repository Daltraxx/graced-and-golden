import clsx from "clsx";
import type { ReactNode } from "react";

type HeadingProps = {
   as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
   size?: 'xl' | 'lg' | 'md' | 'sm' | 'xs' | 'manual';
   font?: 'body' | 'display' | 'cursive';
   id?: string;
   applyFontSpacing?: boolean;
   children: ReactNode;
   className?: string;
}

export default function Heading({
   as: Comp = 'h2',
   size = 'lg',
   font = 'display',
   applyFontSpacing = true,
   children,
   className,
   ...restprops
}: HeadingProps) {

   const FONT_TO_CLASS = {
      body: 'font-body',
      display: 'font-display',
      cursive: 'font-cursive',
   } as const;

   return (
      <Comp className={clsx(
         applyFontSpacing && "leading-tight tracking-tight",
         FONT_TO_CLASS[font],
         size === 'xl' && 'text-5xl',
         size === 'lg' && 'text-4xl',
         size === 'md' && 'text-3xl',
         size === 'sm' && 'text-2xl',
         size === 'xs' && 'text-base',
         className
      )} {...restprops}>
         {children}
      </Comp>
   );
}