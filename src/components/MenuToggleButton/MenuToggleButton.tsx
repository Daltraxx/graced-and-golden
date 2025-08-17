import { Ref } from "react";
import clsx from "clsx";
import moduleStyles from '@/components/MenuToggleButton/styles.module.css';

type MenuToggleButtonProps = {
   displayText: string;
   menuOpen: boolean;
   onToggle: (index?: number) => void;
   buttonToggleRef: Ref<HTMLButtonElement>;
   ariaControlsId: string;
   arrowSize?: 'large' | 'small';
   arrowColor?: 'brown-500' | 'brown-750' | 'gold-700';
   menuOnlyMobile?: boolean;
   arrowOnlyMobile?: boolean;
   /** When true, disables built-in auto-positioning classes for the arrow and caller is responsible for manual positioning. When false or omitted, component applies automatic positioning. */
   manualArrowPositioning?: boolean;
   className?: string;
};

export const colorHexByToken = {
  "brown-500": "#7B5C4B",
  "brown-750": "#572c15",
  "gold-700": "#a67c00",
} as const;

export default function MenuToggleButton({
   displayText,
   menuOpen,
   onToggle,
   buttonToggleRef,
   ariaControlsId,
   arrowSize = 'large',
   arrowColor = "brown-500",
   menuOnlyMobile = false,
   arrowOnlyMobile = false,
   manualArrowPositioning = false,
   className,
}: MenuToggleButtonProps) {
   const handleMenuToggleClick = () => {
      onToggle();
   };

   const isArrowLarge = arrowSize === 'large';
   const autoPositioning = !manualArrowPositioning;
   const arrowBorderCSS = arrowSize === 'large'
      ? { borderBottom: `0.6rem solid ${colorHexByToken[arrowColor]}` }
      : { borderLeft: '0.3rem solid transparent', borderRight: '0.3rem solid transparent', borderBottom: `0.45rem solid ${colorHexByToken[arrowColor]}` };

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
         aria-haspopup="menu"
         aria-controls={ariaControlsId}
         aria-expanded={menuOpen}
      >
         {displayText}
         <span
            aria-hidden="true"
            style={arrowBorderCSS}
            className={clsx(
               moduleStyles.menuArrow,
               autoPositioning &&
                  (isArrowLarge
                     ? moduleStyles.menuArrowLargePositioning
                     : moduleStyles.menuArrowSmallPositioning),
               arrowOnlyMobile && moduleStyles.hideOnBiggerScreens,
               menuOpen && moduleStyles.menuArrowDown,
               !menuOpen && moduleStyles.menuArrowUp
            )}
         ></span>
      </button>
   );
}