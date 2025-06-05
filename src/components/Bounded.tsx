import clsx from "clsx";

type BoundedProps = {
   as?: React.ElementType;
   className?: string;
   children: React.ReactNode;
   verticalMargin?: boolean
}

export default function Bounded({
   as: Comp = 'section',
   className,
   children,
   verticalMargin: verticalMargin = true,
   ...restProps
}: BoundedProps) {
   
   return (
      <Comp className={clsx("px-4", verticalMargin && 'py-8 md:py-8', className)} {...restProps}>
         <div className="mx-auto w-full max-w-7xl">
            {children}
         </div>
      </Comp>
   );
}