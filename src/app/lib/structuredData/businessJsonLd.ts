import type { LocalBusiness, WithContext } from "schema-dts";
import { createClient } from "@/prismicio";

async function getData() {
   const client = createClient();
   const contactInformation = await client.getSingle("contact_information")
      .catch((error) => {
         console.error('Error fetching contact information:\n', error);
         return { data: { email: 'inquiries@gracedandgolden.com' } };
      });
   
   return contactInformation.data;
}

const { email } = await getData();

const businessJsonLd : WithContext<LocalBusiness> = {
   "@context": "https://schema.org",
   "@type": "LocalBusiness",
   "name": "Graced and Golden",
   "address": {
      "@type": "PostalAddress",
      "addressLocality": "Santee",
      "addressRegion": "CA",
      "postalCode": "92071",
      "addressCountry": "US"
   },
   "geo": {
      "@type": "GeoCoordinates",
      "latitude": 32.8702,
      "longitude": -116.9711
   },
   "areaServed": {
      "@type": "Place",
      "name": "San Diego, CA"
   },
   "description": "Get a flawless, sun-kissed glow without the harmful UV rays. Located in San Diego, our custom spray tans provide a natural-looking, long-lasting tan.",
   "email": `${email}`,
   "url": "https://gracedandgolden.com",
   "logo": "https://gracedandgolden.com/logo.png",
   "openingHours": [
      "Mo-Fr 16:30-20:00"
   ],
};

export default businessJsonLd;