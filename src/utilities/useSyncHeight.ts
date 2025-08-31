// Custom hook to sync booking details height to contact container on resize
  function useSyncBookingDetailsHeight(
    bookingDetailsContainerRef: React.RefObject<HTMLDivElement>,
    contactContainerRef: React.RefObject<HTMLElement>
  ) {
    useLayoutEffect(() => {
      function updateHeight() {
        if (
          window.innerWidth >= 768 &&
          bookingDetailsContainerRef.current &&
          contactContainerRef.current
        ) {
          const bookingDetailsContainer = bookingDetailsContainerRef.current;
          const bookingDetailsContainerHeight =
            bookingDetailsContainer.offsetHeight;
          const contactContainer = contactContainerRef.current;
          contactContainer.style.setProperty(
            "--booking-details-height",
            `${bookingDetailsContainerHeight}px`
          );
        }
      }

      updateHeight();
      window.addEventListener("resize", updateHeight);
      return () => {
        window.removeEventListener("resize", updateHeight);
      };
    }, [bookingDetailsContainerRef, contactContainerRef]);
  }

  const bookingDetailsContainerRef = useRef<HTMLDivElement>(null);
  const contactContainerRef = useRef<HTMLElement>(null);
  useSyncBookingDetailsHeight(bookingDetailsContainerRef, contactContainerRef);