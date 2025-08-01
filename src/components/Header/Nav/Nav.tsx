'use client';

import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import moduleStyles from '@/components/Header/Nav/styles.module.css'
import { PrismicNextLink } from "@prismicio/next";
import { LinkField } from "@prismicio/client";
import ServicesMenu from "./ServicesMenu/ServicesMenu";
import MenuToggle from "@/components/MenuToggle/MenuToggle";

export default function Nav({ navLinks, servicePageLinks }: { navLinks: LinkField[], servicePageLinks: LinkField[] }) {
   const [navOpen, setNavOpen] = useState(false);
   const navButtonRef = useRef<HTMLButtonElement>(null);
   const serviceMenuRef = useRef<HTMLLIElement>(null);

   const setNavClosed = () => setNavOpen(false);

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
   }, [navOpen])

   const handleNavToggleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      const target = event.currentTarget;
      target.ariaPressed === 'true' ? target.ariaPressed = 'false' : target.ariaPressed = 'true';
      setNavOpen(prev => !prev);
   }

   const navListItems = navLinks.map((link, i) => {
      // consider changing comparison to be based on something else such as slug or uid
      if (link.text && link.text.toLowerCase() === 'services') {
         return (
            <li key={`nav-link-${i}`} ref={serviceMenuRef}>
               <ServicesMenu text={link.text} servicePageLinks={servicePageLinks} setNavClosedAction={setNavClosed} navButtonRef={navButtonRef}/>
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
          <MenuToggle displayText='MENU' navOpen={navOpen} setNavOpen={setNavOpen} navButtonRef={navButtonRef} />
         <ul className={clsx(moduleStyles.linksContainer, navOpen && moduleStyles.linksDisplayed, !navOpen && moduleStyles.linksHidden)}>
            {navListItems}
         </ul>
      </nav>
   )
}