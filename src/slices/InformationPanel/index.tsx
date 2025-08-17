'use client';

import { FC, useCallback, useRef, useState } from "react";
import { Content } from "@prismicio/client";
import { JSXMapSerializer, PrismicRichText, SliceComponentProps } from "@prismicio/react";
import Heading from "@/components/Heading";
import moduleStyles from '@/slices/InformationPanel/styles.module.css';
import Bounded from "@/components/Bounded";
import useAddAnimation from "@/utilities/addAnimation";
import clsx from "clsx";
import MenuToggleButton from "@/components/MenuToggleButton/MenuToggleButton";
const components: JSXMapSerializer = {
  heading3: ({ children }) => (
    <Heading as="h3" size="lg" className={moduleStyles.mainHeading} >
      {children}
    </Heading>
  ),
  heading4: ({ children }) => (
    <Heading as="h4" size="xs" className={moduleStyles.sectionHeading} >
      {children}
    </Heading>
  ),
  paragraph: ({children}) => (
    <p>{children}</p>
  )
}

/**
 * Props for `InformationPanel`.
 */
export type InformationPanelProps =
  SliceComponentProps<Content.InformationPanelSlice>;

/**
 * Component for "InformationPanel" Slices.
 */
const InformationPanel: FC<InformationPanelProps> = ({ slice }) => {
  const containerRef = useRef<HTMLElement>(null);
  useAddAnimation(containerRef, 0.1);

  const [infoOpen, setInfoOpen] = useState<Map<number, boolean>>(
    () => new Map(Array.from({ length: slice.primary.info_block.length }, (_, i) => [i, false]))
  );

  const toggleInfoOpen = useCallback((index: number) => {
    setInfoOpen(prev => {
      const newStateMap = new Map(prev);
      newStateMap.set(index, !prev.get(index));
      return newStateMap;
    });
  }, []);
  
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>(
    Array(slice.primary.info_block.length).fill(null)
  );
  
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={moduleStyles.boundedContainer}
      ref={containerRef}
    >
      <div className="animated-element">
        <PrismicRichText
          field={slice.primary.main_heading}
          components={components}
        />
      </div>
      <section className={moduleStyles.contentContainer}>
        {slice.primary.info_block.map((item, i) => (
          <section
            key={`info-section-${i}`}
            className={clsx(moduleStyles.sectionContainer, "animated-element")}
          >
            <Heading as="h4" size="xs" className={moduleStyles.sectionHeading}>
              <MenuToggleButton
                displayText={`${item.info_heading}`}
                menuOpen={infoOpen.get(i)!}
                onToggle={() => toggleInfoOpen(i)}
                buttonToggleRef={(el: HTMLButtonElement) => {
                  buttonRefs.current[i] = el;
                }}
                ariaControlsId={`Info Details ${i}`}
                precedence="primary"
                menuOnlyMobile={false}
                arrowOnlyMobile={false}
                manualArrowPositioning
                className={moduleStyles.menuToggleButton}
              />
            </Heading>
            <div
              id={`Info Details ${i}`}
              aria-expanded={infoOpen.get(i)}
              className={clsx(
                moduleStyles.infoContent,
                infoOpen.get(i) && moduleStyles.infoContentOpen
              )}
            >
              <PrismicRichText field={item.info_body} components={components} />
            </div>
          </section>
        ))}
      </section>
    </Bounded>
  );
};

export default InformationPanel;
