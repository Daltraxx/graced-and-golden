import { createClient } from "@/prismicio";
import { PrismicNextLink } from "@prismicio/next";
import Image from "next/image";
import Link from "next/link";
import Bounded from "../Bounded";
import Button from "../Button";
import styles from '@/styles/styles.module.css';
import moduleStyles from '@/components/Header/styles.module.css';
import Nav from './Nav/Nav';

export default async function Header() {
   const client = createClient();
   const header = await client.getSingle('header');
   const navLinks = header.data.nav_link;

   return (
      <Bounded as='header' className={`${styles.backgroundBrown200} ${moduleStyles.headerBounded}`}>
         <div className={`${moduleStyles.headerContainer}`}>
            <Link href='/'>
               <Image src='/logo-full-header.png' width={100} height={54} alt='Graced and Golden logo'/>
            </Link>
            {/* &#9776; hamburger menu icon */}
            <Nav navLinks={navLinks}/>
            <Button field={header.data.booking_link} className={`${styles.buttonCream200}`} color="cream-200"/>
         </div>
      </Bounded>
   );
}