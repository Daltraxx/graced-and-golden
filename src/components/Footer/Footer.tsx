import { createClient } from "@/prismicio";
import { PrismicNextLink } from "@prismicio/next";
import Image from "next/image";
import Link from "next/link";
import Bounded from "../Bounded";
import moduleStyles from '@/components/Footer/styles.module.css';

export default async function Footer() {
   const client = createClient();
   const footer = await client.getSingle('footer');

   return (
      <Bounded as='footer' className={moduleStyles.container}>
         <div className="flex gap-4 items-center justify-between flex-col md:flex-row">
            <small className="basis-1/3">Graced and Golden © {new Date().getFullYear()}</small>
            <Link href='/' className="basis-1/3 flex justify-center">
               <Image src='/logo-full-header.png' width={100} height={54} alt='Graced and Golden logo'className=""/>
            </Link>
            <ul className="basis-1/3 flex flex-col sm:flex-row gap-4 place-items-center justify-end">
               {footer.data.nav_link.map((link) => (
                  <li key={link.key}>
                     <PrismicNextLink key={link.key} field={link} />
                  </li>
               ))}
            </ul>
         </div>
      </Bounded>
   );
}