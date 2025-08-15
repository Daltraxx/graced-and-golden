'use client';

import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import moduleStyles from '@/components/Header/Nav/styles.module.css'
import { PrismicNextLink } from "@prismicio/next";
import { LinkField } from "@prismicio/client";
import ServicesMenu from "./ServicesMenu/ServicesMenu";
import MenuToggleButton from "@/components/MenuToggleButton/MenuToggleButton";

export default function Nav({ navLinks, servicePageLinks }: { navLinks: LinkField[], servicePageLinks: LinkField[] }) {
   const [navMenuOpen, setNavMenuOpen] = useState(false);
   const navButtonRef = useRef<HTMLButtonElement>(null);
   const serviceMenuRef = useRef<HTMLLIElement>(null);

   const setNavClosed = () => setNavMenuOpen(false);
   
   const toggleNavMenuOpenState = () => {
      setNavMenuOpen(prev => !prev);
   }

   // Have Nav Menu close (mobile) if link is clicked
   useEffect(() => {
      const handleLinkClick = ({ target } : MouseEvent) => {
         const nodeTarget = target as Node;

         if (
            navButtonRef.current && !navButtonRef.current.contains(nodeTarget) &&
            serviceMenuRef.current && !serviceMenuRef.current.contains(nodeTarget)
         ) {
            setNavClosed();
         }
      }

      window.addEventListener('mousedown', handleLinkClick);

      return () => {
         window.removeEventListener('mousedown', handleLinkClick);
      };
   }, [navMenuOpen])

   const navListItems = navLinks.map((link, i) => {
      // consider changing comparison to be based on something else such as slug or uid
      if (link.text && link.text.toLowerCase() === 'services') {
         return (
           <li key={`nav-link-${i}`} ref={serviceMenuRef}>
             <ServicesMenu
               linkDisplayText={link.text}
               servicePageLinks={servicePageLinks}
               setNavClosedAction={setNavClosed}
               navButtonRef={navButtonRef}
             />
           </li>
         );
      } else {
         return (
            <li key={`nav-link-${i}`}>
               <PrismicNextLink field={link} className={moduleStyles.navLink}/>
            </li>
         );
      }
   })

   return (
      <nav className={moduleStyles.navContainer}>
         <MenuToggleButton
            displayText="MENU"
            menuOpen={navMenuOpen}
            setMenuOpen={toggleNavMenuOpenState}
            buttonToggleRef={navButtonRef}
            menuOnlyMobile={true}
            arrowOnlyMobile={true}
            ariaControlsId="nav-menu"
            precedence="primary"
            className={moduleStyles.menuToggleButton}
         />
         <ul
            id="nav-menu"
            className={clsx(
            moduleStyles.linksContainer,
            navMenuOpen && moduleStyles.linksDisplayed,
            !navMenuOpen && moduleStyles.linksHidden
            )}
         >
            {navListItems}
         </ul>
      </nav>
   );
}