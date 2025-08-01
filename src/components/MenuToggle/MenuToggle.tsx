import { Dispatch, RefObject, SetStateAction } from "react";
import clsx from "clsx";
import moduleStyles from '@/components/MenuToggle/styles.module.css';



export default function MenuToggle({
   navOpen,
   setNavOpen,
   navButtonRef,
}: {
   navOpen: boolean;
   setNavOpen: Dispatch<SetStateAction<boolean>>;
   navButtonRef: RefObject<HTMLButtonElement | null>;
}) {
   const handleNavToggleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      const target = event.currentTarget;
      target.ariaPressed === "true"
         ? (target.ariaPressed = "false")
         : (target.ariaPressed = "true");
      setNavOpen((prev) => !prev);
   };

   return (
      <button
         onClick={handleNavToggleClick}
         type="button"
         className={moduleStyles.navToggle}
         ref={navButtonRef}
         aria-label="toggle navigation menu"
         aria-pressed="false"
      >
         MENU
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