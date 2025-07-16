import { createClient } from "@/prismicio";
import { PrismicNextLink } from "@prismicio/next";
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
      <Bounded as='footer' className={moduleStyles.container}>
         <div className={moduleStyles.rowContainer}>
            <small>Graced and Golden © {new Date().getFullYear()}</small>
            <Link href='/' >
               <Image src='/logo-full-header.png' width={100} height={54} alt='Graced and Golden logo' />
            </Link>
            <ul className={moduleStyles.linksContainer}>
               {footer.data.nav_link.map((link) => (
                  <li key={link.key}>
                     <PrismicNextLink key={link.key} field={link} />
                  </li>
               ))}
               <li>
                  <a href="https://www.instagram.com/gracedandgolden/" target="_blank">
                     <FontAwesomeIcon icon={faInstagram} className={moduleStyles.instagramIcon}/>
                  </a>
               </li>
            </ul>
         </div>
      </Bounded>
   );
}