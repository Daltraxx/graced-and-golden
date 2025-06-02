import { createClient } from "@/prismicio";
import { PrismicNextLink } from "@prismicio/next";
import Image from "next/image";
import Link from "next/link";
import Bounded from "./Bounded";
import Button from "./Button";
import styles from '@/styles/styles.module.css';

export default async function Header() {
   const client = createClient();
   const header = await client.getSingle('header');

   return (
      <Bounded as='header' className="bg-[var(--site-primary-color)] font-display">
         <div className="flex gap-4 items-center justify-between flex-col md:flex-row">
            <Link href='/'>
               <Image src='/logo-full-header.png' width={100} height={54} alt='Graced and Golden logo'/>
            </Link>
            <ul className="flex flex-col sm:flex-row gap-4 place-items-center">
               {header.data.nav_link.map((link) => (
                  <li key={link.key}>
                     <PrismicNextLink key={link.key} field={link} />
                  </li>
               ))}
               <li>
                  <Button field={header.data.booking_link} className={styles.buttonLight}/>
               </li>
            </ul>
         </div>
      </Bounded>
   );
}