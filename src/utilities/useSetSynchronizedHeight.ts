import { useLayoutEffect } from "react";

export default function useSetSynchronizedHeight(
  referenceElementRef: React.RefObject<HTMLDivElement | HTMLElement | null>,
  affectedElementRef: React.RefObject<HTMLDivElement | HTMLElement | null>,
  windowWidthState: number,
  minWindowWidth: number = 0
) {
   useLayoutEffect(() => {
    if (
      windowWidthState >= minWindowWidth &&
      referenceElementRef.current &&
      affectedElementRef.current
    ) {
      const referenceElement = referenceElementRef.current;
       const affectedElement = affectedElementRef.current;
       console.log(referenceElement.offsetHeight);
      affectedElement.style.setProperty(
        "--reference-element-height",
        `${referenceElement.offsetHeight}px`
      );
    }
  }, [referenceElementRef, affectedElementRef, windowWidthState]);
}
