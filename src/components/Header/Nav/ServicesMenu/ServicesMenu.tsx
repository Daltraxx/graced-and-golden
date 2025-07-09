'use client';

import { PrismicNextLink } from "@prismicio/next";
import { useState } from "react";
import moduleStyles from '@/components/Header/Nav/ServicesMenu/styles.module.css'
import clsx from "clsx";
import { LinkField } from "@prismicio/client";

export default function ServicesMenu({ text, servicePageLinks }: { text: string, servicePageLinks: LinkField[] }) {
   const [servicesOpen, setServicesOpen] = useState(false);

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
         <button
            type="button"
            onClick={handleServicesToggle}
            className={clsx(
               moduleStyles.mainServiceButton,
               servicesOpen && moduleStyles.mainServiceButtonOpenState,
               !servicesOpen && moduleStyles.mainServiceButtonClosedState
            )}
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
         <div
            className={clsx(
               moduleStyles.servicesContainer,
               servicesOpen && moduleStyles.servicesDisplayed,
               !servicesOpen && moduleStyles.servicesHidden
            )}
         >
            <ul className={moduleStyles.servicesList}>
               {servicesDropdownListItems}
            </ul>
         </div>
      </>
   );
}