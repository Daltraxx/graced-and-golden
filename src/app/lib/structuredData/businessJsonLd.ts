import { createClient } from "@/prismicio";

async function getData() {
   const client = createClient();
   const contactInformation = await client.getSingle("contact_information")
      .catch(() => {
         throw new Error("Error fetching contact information");
      });
   
   return contactInformation.data;
}

const { email } = await getData();

const businessJsonLd = {
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
      "description": "Graced and Golden is a local business offering a range of services in Santee, CA.",
      "email": `${email}`,
      "url": "https://gracedandgolden.com",
      "logo": "https://gracedandgolden.com/logo.png",
      "openingHours": [
        "Mo-Fr 16:30-20:00"
      ],
      // Add more relevant properties as needed
    };

export default businessJsonLd;