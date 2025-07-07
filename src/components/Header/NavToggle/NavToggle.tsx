'use client';

import clsx from "clsx";
import { useState } from "react";
import moduleStyles from '@/components/Header/NavToggle/styles.module.css'

export default function NavToggle() {
   const [navOpen, setNavOpen] = useState(false);

   const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setNavOpen(prev => !prev);
   }

   return (
      <>
         <button onClick={handleClick}>
         Navigation Menu&nbsp;
         <span
            className={clsx(
            moduleStyles.arrow,
            navOpen && moduleStyles.navOpen,
            !navOpen && moduleStyles.navClosed
            )}
         >
            &#11205;
         </span>
         </button>
      </>
   )
}