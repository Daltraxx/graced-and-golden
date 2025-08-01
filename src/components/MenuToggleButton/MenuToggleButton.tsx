import { Dispatch, RefObject, SetStateAction } from "react";
import clsx from "clsx";
import moduleStyles from '@/components/MenuToggleButton/styles.module.css';

type MenuToggleButtonProps =  {
   displayText: string;
   menuOpen: boolean;
   setMenuOpen: Dispatch<SetStateAction<boolean>>;
   buttonToggleRef: RefObject<HTMLButtonElement | null>;
   ariaControlsId: string;
   precedence: 'primary' | 'secondary';
   onlyMobile?: boolean;
   className?: string;
}



export default function MenuToggleButton({
   displayText,
   menuOpen,
   setMenuOpen,
   buttonToggleRef,
   ariaControlsId,
   precedence,
   onlyMobile = true,
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
      
      setMenuOpen((prev) => !prev);
   };

   return (
      <button
         onClick={handleMenuToggleClick}
         type="button"
         className={clsx(
            precedence === 'primary' && moduleStyles.menuTogglePrimary,
            precedence === 'secondary' && moduleStyles.menuToggleSecondary,
            onlyMobile && moduleStyles.hideOnBiggerScreens,
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
               precedence === 'primary' && moduleStyles.menuArrowPrimary,
               precedence === 'secondary' && moduleStyles.menuArrowSecondary,
               menuOpen && moduleStyles.menuArrowDown,
               !menuOpen && moduleStyles.menuArrowUp
            )}
         ></span>
      </button>
   );
}