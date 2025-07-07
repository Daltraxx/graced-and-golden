import { createClient } from "@/prismicio";
import { PrismicNextLink } from "@prismicio/next";
import Image from "next/image";
import Link from "next/link";
import Bounded from "../Bounded";
import Button from "../Button";
import styles from '@/styles/styles.module.css';
import moduleStyles from '@/components/Header/styles.module.css';

export default async function Header() {
   const client = createClient();
   const header = await client.getSingle('header');

   return (
      <Bounded as='header' className={`${styles.backgroundBrown200} ${moduleStyles.headerBounded}`}>
         <div className={`${moduleStyles.headerContainer}`}>
            <Link href='/'>
               <Image src='/logo-full-header.png' width={100} height={54} alt='Graced and Golden logo'/>
            </Link>
            {/* &#9776; hamburger menu icon */}
            <label htmlFor="hamburger-toggle">Navigation Menu</label>
            <input type="checkbox" id="hamburger-toggle" className={moduleStyles.navToggle} />
            <nav className={moduleStyles.nav}>
               <ul className={`${moduleStyles.linksContainer}`}>
                  {header.data.nav_link.map((link) => (
                     <li key={link.key}>
                        <PrismicNextLink key={link.key} field={link} />
                     </li>
                  ))}
               </ul>
            </nav>
            <Button field={header.data.booking_link} className={`${styles.buttonCream200}`} color="cream-200"/>
         </div>
      </Bounded>
   );
}