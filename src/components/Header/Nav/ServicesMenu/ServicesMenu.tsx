'use client';

import { PrismicNextLink } from "@prismicio/next";
import { useEffect, useRef, useState } from "react";
import moduleStyles from '@/components/Header/Nav/ServicesMenu/styles.module.css'
import clsx from "clsx";
import { LinkField } from "@prismicio/client";

export default function ServicesMenu({ text, servicePageLinks }: { text: string, servicePageLinks: LinkField[] }) {
   const [servicesOpen, setServicesOpen] = useState(false);

   const servicesMenuToggleRef = useRef<HTMLButtonElement>(null);
   const servicesMenuRef = useRef<HTMLUListElement>(null);

   const handleClickOutsideServicesMenu = ({ target }: MouseEvent) => {
      const nodeTarget = target as Node;
      if (
         servicesMenuToggleRef.current &&
         !servicesMenuToggleRef.current.contains(nodeTarget) &&
         servicesMenuRef.current &&
         !servicesMenuRef.current.contains(nodeTarget)
      ) {
         setServicesOpen(false);
      }
   }

   // Have services menu close if it is open and user clicks away from it
   useEffect(() => {

      window.addEventListener('mousedown', handleClickOutsideServicesMenu);

      return () => {
         window.removeEventListener('mousedown', handleClickOutsideServicesMenu);
      };
      
   }, [servicesOpen])

   const handleServicesToggle = () => {
      setServicesOpen(prev => !prev);
   }

   const servicesDropdownListItems = servicePageLinks.map((link, i) => (
      <li key={`service-dropdown-link-${i}`} >
         <PrismicNextLink field={link} className={moduleStyles.serviceLink} />
      </li>
   ))

   return (
      <>
         {/* Dropdown Menu Toggle */}
         <button
            type="button"
            onClick={handleServicesToggle}
            ref={servicesMenuToggleRef}
            className={clsx(
               moduleStyles.mainServiceButton,
               servicesOpen && moduleStyles.mainServiceButtonOpenState,
               !servicesOpen && moduleStyles.mainServiceButtonClosedState
            )}
            aria-haspopup='menu'
            aria-expanded={servicesOpen}
            aria-controls='services-menu'
         >
            {text}
            <span
               className={clsx(
                  moduleStyles.menuArrow,
                  moduleStyles.serviceMenuArrow,
                  servicesOpen && moduleStyles.menuArrowDown,
                  !servicesOpen && moduleStyles.menuArrowUp
               )}
            />
         </button>
         {/* Dropdown Menu */}
         <div
            className={clsx(
               moduleStyles.servicesContainer,
               servicesOpen && moduleStyles.servicesDisplayed,
               !servicesOpen && moduleStyles.servicesHidden
            )}
         >
            <ul 
               id="services-menu"
               ref={servicesMenuRef}
               className={clsx(
                  moduleStyles.servicesList,
                  servicesOpen && moduleStyles.servicesDisplayedBiggerScreen,
                  !servicesOpen && moduleStyles.servicesHiddenBiggerScreen
               )}
            >
               {servicesDropdownListItems}
            </ul>
         </div>
      </>
   );
}