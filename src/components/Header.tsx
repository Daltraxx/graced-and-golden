import { createClient } from "@/prismicio";
import { PrismicNextLink } from "@prismicio/next";
import Image from "next/image";
import Link from "next/link";

export default async function Header() {
   const client = createClient();
   const header = await client.getSingle('header');

   return (
      <header>
         <div className="flex items-center justify-between">
            <Link href='/'>
               <Image src='/logo-full-header.png' width={100} height={54} alt='Graced and Golden logo'/>
            </Link>
            <ul>
               {header.data.nav_link.map((link) => (
                  <li key={link.key}>
                     <PrismicNextLink key={link.key} field={link} />
                  </li>
               ))}
            </ul>
         </div>
      </header>
   );
}