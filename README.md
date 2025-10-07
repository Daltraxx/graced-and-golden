# Graced and Golden
This is a site built for a spray tanning business which wanted to replace their old website with one that could better stand out among its more stylish competitors. It offers:
- A plethora of information presented in complex but still sensibly designed layouts.
- Fully responsive pages built with mobile-first design approach
- Forms for users to easily contact the business via intuitive UI (field values remain saved for the session if the user leaves and comes back).
- An automatically rotating carousel of testimonials that my client can easily add to and remove from via the CMS. Auto-rotation stops if user manually toggles the next/previous testimonial.
- Animations that fade in elements as they come into view as requested by the client.

**Link to project:** https://www.gracedandgolden.com/

![Homepage screenshot, see above link for view of full site and its features](/public/homepage-preview.jpg)

## How It's Made:

**Tech used:** Next.js, React, Typescript, Prismic (CMS), CSS, Tailwind (minor, modules preferred), MailGun

This project was built with the Next.js framework (bootstrapped with ```create-next-app```) using the App Router. In using [Prismic](https://prismic.io/) as its headless CMS, components are at minimum broken up into slices which fetch the text and image content for display. Slices can then be rearranged via the Prismic dashboard, so that while the structure and logic of pages is coded as it normally would be, control over when and where these building blocks are displayed is granted to the content manager.

Contact forms are equipped with both client-side and server-side validation. The form data is then used to create a user-friendly email which is sent via MailGun API. Validation is accomplished via Zod and some custom logic. Front end form state is managed via React hooks, which also stores field values in session storage in case the user leaves and comes back. Value changes are debounced using use-debounce. 

The fade-in animations requested by the client which accompany many elements as they come into view is accomplished via a custom useAnimation hook which uses the intersection observer API to attach a class to specified elements as they pass a certain threshold of appearing in the viewport.

## Optimizations

This project achieves a highly optimized result (despite its many images) by taking advantage of Next.js's strengths and other features such as strategic lazy loading, etc. It achieves perfect or near perfect Lighthouse Report scores.

## Lessons Learned:

- Intersection Observer for detecting elements entering the viewport and applying animations
- Established greater comfort with animations and transitions
- Wider use of custom hooks for things like animations and syncing the heights of elements at certain breakpoints
- Combined two useLayoutEffects for responding to screen resizing and setting a css variable height to synchronize with a reference element into custom hook module
- requestAnimationFrame to throttle window resize updates in useLayoutEffect and optimize performance
- Server actions and validation
- More creative and effective ways of managing state (like with map in informationPanel)
- First use of prismic