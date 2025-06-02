import { createClient } from "@/prismicio";
import { PrismicNextLink } from "@prismicio/next";
import Link from "next/link";

export default async function Header() {
   const client = createClient();
   const header = await client.getSingle('header');

   return (
      <header>
         <div>
            <Link href='/'>
               {/* <Logo /> */}
            </Link>
            <ul>
               {header.data.nav_link.map((link) => (
                  <li>
                     <PrismicNextLink key={link.key} field={link} />
                  </li>
               ))}
            </ul>
         </div>
      </header>
   );
}