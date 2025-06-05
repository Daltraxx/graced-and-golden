import clsx from "clsx";

type BoundedProps = {
   as?: React.ElementType;
   className?: string;
   children: React.ReactNode;
   verticalPadding?: boolean;
   horizontalMargin?: boolean;
}

export default function Bounded({
   as: Comp = 'section',
   className,
   children,
   verticalPadding: verticalPadding = true,
   horizontalMargin: horizontalMargin = true,
   ...restProps
}: BoundedProps) {
   
   return (
      <Comp className={clsx("px-4", verticalPadding && 'py-8 md:py-8', className)} {...restProps}>
         <div className={clsx(horizontalMargin && "mx-auto w-full max-w-7xl")}>
            {children}
         </div>
      </Comp>
   );
}