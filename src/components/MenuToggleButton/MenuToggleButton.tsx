import { Dispatch, RefObject, SetStateAction } from "react";
import clsx from "clsx";
import moduleStyles from '@/components/MenuToggleButton/styles.module.css';

type MenuToggleButtonProps =  {
   displayText: string;
   menuOpen: boolean;
   setMenuOpen: Dispatch<SetStateAction<boolean>>;
   buttonToggleRef: RefObject<HTMLButtonElement | null>;
   ariaControlsId: string;
}



export default function MenuToggleButton({
   displayText,
   menuOpen,
   setMenuOpen,
   buttonToggleRef,
   ariaControlsId
}: MenuToggleButtonProps
) {
   const handleNavToggleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      const target = event.currentTarget;
      target.ariaExpanded === "true"
         ? (target.ariaExpanded = "false")
         : (target.ariaExpanded = "true");
      setMenuOpen((prev) => !prev);
   };

   return (
      <button
         onClick={handleNavToggleClick}
         type="button"
         className={moduleStyles.navToggle}
         ref={buttonToggleRef}
         aria-label="toggle navigation menu"
         aria-controls={ariaControlsId}
         aria-expanded="false"
      >
         {displayText}
         <span
            className={clsx(
               moduleStyles.menuArrow,
               moduleStyles.navMenuArrow,
               menuOpen && moduleStyles.menuArrowDown,
               !menuOpen && moduleStyles.menuArrowUp
            )}
         ></span>
      </button>
   );
}