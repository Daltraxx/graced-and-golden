import { Dispatch, RefObject, SetStateAction } from "react";
import clsx from "clsx";
import moduleStyles from '@/components/MenuToggleButton/styles.module.css';

type MenuToggleButtonProps =  {
   displayText: string;
   menuOpen: boolean;
   setNavOpen: Dispatch<SetStateAction<boolean>>;
   buttonToggleRef: RefObject<HTMLButtonElement | null>;
   ariaControlsId: string;
}



export default function MenuToggleButton({
   displayText,
   menuOpen,
   setNavOpen,
   buttonToggleRef,
   ariaControlsId
}: MenuToggleButtonProps
) {
   const handleNavToggleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      const target = event.currentTarget;
      target.ariaExpanded === "true"
         ? (target.ariaExpanded = "false")
         : (target.ariaExpanded = "true");
      setNavOpen((prev) => !prev);
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