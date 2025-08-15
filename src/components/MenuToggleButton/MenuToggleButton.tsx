import { Dispatch, RefObject, SetStateAction } from "react";
import clsx from "clsx";
import moduleStyles from '@/components/MenuToggleButton/styles.module.css';

type MenuToggleButtonProps = {
   displayText: string;
   menuOpen: boolean;
   setMenuOpen: (index?: number) => void;
   buttonToggleRef: Ref<HTMLButtonElement>;
   ariaControlsId: string;
   precedence: "primary" | "secondary";
   menuOnlyMobile?: boolean;
   arrowOnlyMobile?: boolean;
   /** When true, disables built-in auto-positioning classes for the arrow and caller is responsible for manual positioning. When false or omitted, component applies automatic positioning. */
   manualArrowPositioning?: boolean;
   className?: string;
};



export default function MenuToggleButton({
   displayText,
   menuOpen,
   setMenuOpen,
   buttonToggleRef,
   ariaControlsId,
   precedence,
   menuOnlyMobile = false,
   arrowOnlyMobile = false,
   manualArrowPositioning = false,
   className
}: MenuToggleButtonProps
) {
   const handleMenuToggleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      const target = event.currentTarget;
      if (target.ariaExpanded === "true"){
         target.ariaExpanded = "false"
      } else {
         target.ariaExpanded = "true"
      }
      
      setMenuOpen();
   };

   const isPrimary = precedence === "primary";
   const autoPositioning = !manualArrowPositioning;

   return (
     <button
       onClick={handleMenuToggleClick}
       type="button"
       className={clsx(
         moduleStyles.menuToggle,
         menuOnlyMobile && moduleStyles.hideOnBiggerScreens,
         className
       )}
       ref={buttonToggleRef}
       aria-label="toggle navigation menu"
       aria-controls={ariaControlsId}
       aria-expanded="false"
     >
       {displayText}
       <span
         className={clsx(
            moduleStyles.menuArrow,
            isPrimary
               ? moduleStyles.menuArrowPrimary
               : moduleStyles.menuArrowSecondary,
            autoPositioning && (isPrimary
               ? moduleStyles.menuArrowPrimaryPositioning
               : moduleStyles.menuArrowSecondaryPositioning),
            arrowOnlyMobile && moduleStyles.hideOnBiggerScreens,
            menuOpen && moduleStyles.menuArrowDown,
            !menuOpen && moduleStyles.menuArrowUp
         )}
       ></span>
     </button>
   );
}