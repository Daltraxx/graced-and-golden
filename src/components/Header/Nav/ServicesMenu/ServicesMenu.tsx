"use client";

import { PrismicNextLink } from "@prismicio/next";
import { RefObject, useCallback, useEffect, useRef, useState } from "react";
import moduleStyles from "@/components/Header/Nav/ServicesMenu/styles.module.css";
import clsx from "clsx";
import { LinkField } from "@prismicio/client";
import MenuToggleButton from "@/components/MenuToggleButton/MenuToggleButton";

export default function ServicesMenu({
  linkDisplayText,
  servicePageLinks,
  setNavClosedAction,
  navButtonRef,
}: {
  linkDisplayText: string;
  servicePageLinks: LinkField[];
  setNavClosedAction: () => void;
  navButtonRef: RefObject<HTMLButtonElement | null>;
}) {
  const [servicesOpen, setServicesOpen] = useState(false);

  const toggleServicesOpenState = useCallback(() => {
    setServicesOpen((prev) => !prev);
  }, []);

  const servicesMenuToggleRef = useRef<HTMLButtonElement>(null);
  const servicesMenuRef = useRef<HTMLUListElement>(null);

  // Have services menu close if it is open and user clicks away from it
  useEffect(() => {
    const handleClickOutsideServicesMenu = ({ target }: MouseEvent) => {
      const nodeTarget = target as Node;

      if (
        servicesMenuToggleRef.current &&
        !servicesMenuToggleRef.current.contains(nodeTarget) &&
        servicesMenuRef.current &&
        !servicesMenuRef.current.contains(nodeTarget) &&
        navButtonRef.current &&
        !navButtonRef.current.contains(nodeTarget)
      ) {
        setServicesOpen(false);
      }
    };

    window.addEventListener("mousedown", handleClickOutsideServicesMenu);

    return () => {
      window.removeEventListener("mousedown", handleClickOutsideServicesMenu);
    };
  }, [servicesOpen, navButtonRef]);

  const handleServiceLinkClick = () => {
    setServicesOpen(false);
    setNavClosedAction();
  };
  const servicesDropdownListItems = servicePageLinks.map((link, i) => (
    <li key={`service-dropdown-link-${i}`} onClick={handleServiceLinkClick}>
      <PrismicNextLink
        field={link}
        className={moduleStyles.serviceLink}
        role="navigation"
        aria-label={`Navigation link to ${link.text}`}
        scroll={false}
      />
    </li>
  ));

  return (
    <>
      {/* Dropdown Menu Toggle */}
      <MenuToggleButton
        displayText={linkDisplayText}
        menuOpen={servicesOpen}
        onToggle={toggleServicesOpenState}
        buttonToggleRef={servicesMenuToggleRef}
        ariaControlsId="services-menu"
        arrowSize="small"
        arrowColor="brown-750"
        menuOnlyMobile={false}
        arrowOnlyMobile={true}
        className={clsx(moduleStyles.menuToggleButton)}
      />

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
