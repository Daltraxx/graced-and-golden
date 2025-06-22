import clsx from "clsx";

type headingProps = {
   as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
   size?: 'xl' | 'lg' | 'md' | 'sm' | 'xs';
   children: React.ReactNode;
   className?: string;
}

export default function Heading({
   as: Comp = 'h2',
   size = 'lg',
   children,
   className
}: headingProps) {

   return (
      <Comp className={clsx(
         "font-bold leading-tight tracking-tight font-display",
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