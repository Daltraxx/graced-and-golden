'use client';

import clsx from "clsx";
import { useState } from "react";
import moduleStyles from '@/components/Header/Nav/styles.module.css'
import { PrismicNextLink } from "@prismicio/next";
import { LinkField } from "@prismicio/client";

export default function Nav({ navLinks, servicePageLinks }: { navLinks: LinkField[], servicePageLinks: LinkField[] }) {
   const [navOpen, setNavOpen] = useState(false);
   const [servicesOpen, setServicesOpen] = useState(false);

   const handleNavToggleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setNavOpen(prev => !prev);
   }

   const handleServicesToggle = (e: React.MouseEvent<HTMLAnchorElement>) => {
      setServicesOpen(prev => !prev);
   }

   const servicesDropdownListItems = servicePageLinks.map((link, i) => (
      <li key={`service-dropdown-link-${i}`} className={moduleStyles.servicePageLink} >
         <PrismicNextLink field={link} />
      </li>
   ))

   const navListItems = navLinks.map((link, i) => {
      // consider changing comparison to be based on something else such as slug or uid
      if (link.text && link.text.toLowerCase() === 'services') {
         return (
            <li key={`nav-link-${i}`}>
               <PrismicNextLink field={link} onClick={handleServicesToggle}/>
               <span
               className={clsx(
               moduleStyles.serviceMenuArrow,
               servicesOpen && moduleStyles.serviceMenuArrowDown,
               !servicesOpen && moduleStyles.serviceMenuArrowUp
               )}
            >
               &#11205;
            </span>
                  <ul
                    className={clsx(
                      moduleStyles.servicesContainer,
                      servicesOpen && moduleStyles.servicesDisplayed,
                      !servicesOpen && moduleStyles.servicesHidden
                      
                    )}
                  >
                  {servicesDropdownListItems}
               </ul>
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
         <button onClick={handleNavToggleClick} className={moduleStyles.navToggle}>
            Navigation Menu&nbsp;
            <span
               className={clsx(
               moduleStyles.navMenuArrow,
               navOpen && moduleStyles.navMenuArrowDown,
               !navOpen && moduleStyles.navMenuArrowUp
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