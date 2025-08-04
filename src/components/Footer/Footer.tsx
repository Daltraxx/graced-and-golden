import { createClient } from "@/prismicio";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from "next/image";
import Link from "next/link";
import Bounded from "../Bounded";
import moduleStyles from '@/components/Footer/styles.module.css';
import { faInstagram } from "@fortawesome/free-brands-svg-icons";

export default async function Footer() {
   const client = createClient();
   const footer = await client.getSingle('footer');

   return (
      <Bounded
         as="footer"
         className={moduleStyles.container}
      >
          <div className={moduleStyles.rowContainer}>
            <small>Graced and Golden © {new Date().getFullYear()}</small>
            <Link
               href="/"
               className={moduleStyles.logoContainer}
               aria-label="Go to homepage"
            >
               <Image
                 src="/logo-full-header.webp"
                 width={100}
                 height={54}
                 alt="Graced and Golden logo"
                 className={moduleStyles.logo}
               />
            </Link>
            <ul className={moduleStyles.linksContainer}>
               <li key="award_image">
                 <a
                   href={footer.data.award_link || 'https://2024.sandiegobestof.com/health-and-body/best-spray-tan'}
                   target="_blank"
                   rel="noopener"
                   aria-label="View award details"
                 >
                   <PrismicNextImage
                     field={footer.data.award_image}
                     className={moduleStyles.awardImage}
                   />
                 </a>
               </li>
               {footer.data.nav_link.map((link) => (
                 <li key={link.key}>
                   <PrismicNextLink
                     key={link.key}
                     field={link}
                     aria-label={"Footer navigation link"}
                   />
                 </li>
               ))}
               <li key="footer-ig-link">
                 <a
                   href="https://www.instagram.com/gracedandgolden/"
                   target="_blank"
                   rel="noopener noreferrer"
                   aria-label="Visit Graced and Golden Instagram"
                 >
                   <FontAwesomeIcon
                     icon={faInstagram}
                     className={moduleStyles.instagramIcon}
                     title="Instagram"
                     aria-hidden="true"
                   />
                 </a>
               </li>
            </ul>
         </div>
     </Bounded>
   );
}