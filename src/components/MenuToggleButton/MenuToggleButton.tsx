import { Dispatch, RefObject, SetStateAction } from "react";
import clsx from "clsx";
import moduleStyles from '@/components/MenuToggleButton/styles.module.css';



export default function MenuToggleButton({
   displayText,
   navOpen,
   setNavOpen,
   buttonToggleRef,
   ariaControlsId
}: {
   displayText: string;
   navOpen: boolean;
   setNavOpen: Dispatch<SetStateAction<boolean>>;
   buttonToggleRef: RefObject<HTMLButtonElement | null>;
   ariaControlsId: string;
}) {
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
               navOpen && moduleStyles.menuArrowDown,
               !navOpen && moduleStyles.menuArrowUp
            )}
         ></span>
      </button>
   );
}