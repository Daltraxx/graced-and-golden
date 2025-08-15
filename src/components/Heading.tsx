import clsx from "clsx";

type HeadingProps = {
   as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
   size?: 'xl' | 'lg' | 'md' | 'sm' | 'xs' | 'manual';
   font?: 'body' | 'display' | 'cursive';
   children: React.ReactNode;
   className?: string;
}

export default function Heading({
   as: Comp = 'h2',
   size = 'lg',
   font = 'display',
   children,
   className
}: HeadingProps) {

   return (
      <Comp className={clsx(
         "leading-tight tracking-tight",
         font === 'display' && 'font-display',
         font === 'body' && 'font-body',
         font === 'cursive' && 'font-cursive',
         size === 'xl' && 'text-5xl',
         size === 'lg' && 'text-4xl',
         size === 'md' && 'text-3xl',
         size === 'sm' && 'text-2xl',
         size === 'xs' && 'text-base',
         className
      )}>
         {children}
      </Comp>
   );
}