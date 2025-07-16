import { createClient } from "@/prismicio";
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
   const servicePageLinks = header.data.separate_service_page;

   return (
      <Bounded as='header' className={`${styles.backgroundBrown200} ${moduleStyles.headerBounded}`}>
         <div className={`${moduleStyles.headerContainer}`}>
            <div className={moduleStyles.headerSideCol} >
               <Link href='/'>
                  <Image src='/logo-full-header.png' width={188} height={100} alt='Graced and Golden logo'/>
               </Link>
            </div>
            {/* &#9776; hamburger menu icon */}
            <div>
               <Nav navLinks={navLinks} servicePageLinks={servicePageLinks} />
            </div>
            <div className={moduleStyles.headerSideCol} >
               <Button field={header.data.booking_link} className={moduleStyles.bookingButton} color="beige-300"/>
            </div>
         </div>
      </Bounded>
   );
}