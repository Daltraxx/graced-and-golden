import clsx from "clsx";

type BoundedProps = {
   as?: React.ElementType;
   xPaddingSize?: 'sm' | 'lg';
   className?: string;
   children: React.ReactNode;

}

export default function Bounded({ 
   as: Comp = 'section',
   xPaddingSize = 'sm',
   className,
   children,
   ...restProps
}: BoundedProps) {

   return (
      <Comp className={clsx(
            'py-10 md:py-14 lg:py-16',
            xPaddingSize === 'sm' && 'px-4 md:px-6',
            xPaddingSize === 'lg' && 'px-10 md-px-96',
            className
         )}
      >
         {children}
      </Comp>
   );

}