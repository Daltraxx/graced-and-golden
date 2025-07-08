'use client';

import clsx from "clsx";
import { useState } from "react";
import moduleStyles from '@/components/Header/Nav/styles.module.css'
import { PrismicNextLink } from "@prismicio/next";
import { LinkField } from "@prismicio/client";

export default function Nav({ navLinks }: { navLinks: LinkField[] }) {
   const [navOpen, setNavOpen] = useState(false);

   const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setNavOpen(prev => !prev);
   }

   const navListItems = navLinks.map((link, i) => {
      // consider changing comparison to be based on something else such as slug or uid
      if (link.text && link.text.toLowerCase() === 'services') {
         return (
            <li key={`nav-link-${i}`}>
                  <PrismicNextLink field={link} />
            </li>
         );
      } else {
         return (
            <li key={`nav-link-${i}`}>
                  <PrismicNextLink field={link} />
            </li>
         );
      }
   })

   return (
      <nav className={moduleStyles.navContainer}>
         <button onClick={handleClick} className={moduleStyles.navToggle}>
            Navigation Menu&nbsp;
            <span
               className={clsx(
               moduleStyles.arrow,
               navOpen && moduleStyles.arrowDown,
               !navOpen && moduleStyles.arrowUp
               )}
            >
               &#11205;
            </span>
         </button>
         <ul className={clsx(moduleStyles.linksContainer, navOpen && moduleStyles.linksDisplayed, !navOpen && moduleStyles.linksHidden)}>
            {navListItems}
         </ul>
      </nav>
   )
}