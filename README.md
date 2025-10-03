# Graced and Golden
This is a site built for a spray tanning business which wanted to replace their old website with one that could better stand out among its more stylish competitors. It offers:
- A plethora of information presented in complex but still sensibly designed layouts.
- Fully responsive pages built with mobile-first design approach
- Forms for users to easily contact the business via intuitive UI (field values remain saved for the session if the user leaves and comes back).
- A automatically rotating carousel of testimonials that my client can easily add to and remove from via the CMS. Auto-rotation stop if user manually toggles the next/previous testimonial.
- Animations that fade in elements as they come into view as requested by the client.

**Link to project:** https://www.gracedandgolden.com/

![Homepage screenshot, see above link for view of full site and its features](/public/homepage-preview.jpg)

## How It's Made:

**Tech used:** Next.js, React, Typescript, Prismic (CMS), CSS, Tailwind (minor, modules preferred), MailGun

This project was built with the Next.js framework (bootstrapped with ```create-next-app```) using the App Router. In using ![Prismic](https://prismic.io/) as its headless CMS, components are at minimum broken up into slices which fetch the text and image content for display. Slices can then be rearranged via the Prismic dashboard, so that while the structure and logic of pages is coded as it normally would be, control over when and where these building blocks are displayed is granted to the content manager.

Contact forms are equipped with both client-side and server-side validation. The form data is then used to create a user-friendly email which is sent via MailGun API. Validation is accomplished via Zod and some custom logic. Front end form state is managed via React hooks, which also stores field values in session storage in case the user leaves and comes back. Value changes are debounced using use-debounce. 

The fade-in animations requested by the client which accompany many elements as they come into view is accomplished via a custom useAnimation hook which uses the intersection observer API to attach a class to specified elements as they pass a certain threshold of appearing in the viewport.

## Optimizations
*(optional)*

You don't have to include this section but interviewers *love* that you can not only deliver a final product that looks great but also functions efficiently. Did you write something then refactor it later and the result was 5x faster than the original implementation? Did you cache your assets? Things that you write in this section are **GREAT** to bring up in interviews and you can use this section as reference when studying for technical interviews!

## Lessons Learned:

No matter what your experience level, being an engineer means continuously learning. Every time you build something you always have those *whoa this is awesome* or *wow I actually did it!* moments. This is where you should share those moments! Recruiters and interviewers love to see that you're self-aware and passionate about growing.

## Examples:
Take a look at these couple examples that I have in my own portfolio:

**Palettable:** https://github.com/alecortega/palettable

**Twitter Battle:** https://github.com/alecortega/twitter-battle

**Patch Panel:** https://github.com/alecortega/patch-panel