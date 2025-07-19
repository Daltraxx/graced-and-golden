import clsx from "clsx";

type BoundedProps = {
   as?: React.ElementType;
   className?: string;
   children: React.ReactNode;
   verticalPadding?: boolean;
   horizontalSpacing?: boolean;
   style?: { backgroundImage: string };
}

export default function Bounded({
   as: Comp = 'section',
   className,
   children,
   verticalPadding: verticalPadding = true,
   horizontalSpacing: horizontalSpacing = true,
   ...restProps
}: BoundedProps) {
   
   return (
      <Comp className={clsx(horizontalSpacing && "px-4", verticalPadding && 'py-8', className)} {...restProps}>
         <div className={clsx(horizontalSpacing && "mx-auto w-full max-w-7xl")}>
            {children}
         </div>
      </Comp>
   );
}