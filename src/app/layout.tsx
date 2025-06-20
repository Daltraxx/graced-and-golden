import type { Metadata } from "next";
import { nunito, nunitoSans } from "@/app/fonts";
import clsx from "clsx";
import "./globals.css";
import { createClient, repositoryName } from "@/prismicio";
import { asImageSrc } from "@prismicio/client";
import { PrismicPreview } from "@prismicio/next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();

  const settings = await client.getSingle('settings');

  return {
    title: settings.data.site_title || 'Graced and Golden',
    description: settings.data.meta_description || 'Get a flawless, sun-kissed glow without the harmful UV rays. Located in San Diego, our custom spray tans provide a natural-looking, long-lasting tan. Book your appointment today!',
    openGraph: {
      images: [{ url: asImageSrc(settings.data.og_image) ?? ''}]
    }
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${clsx(nunito.variable, nunitoSans.variable)} antialiased`}>
      <body>
        <Header />
        {children}
        <Footer />
        <PrismicPreview repositoryName={repositoryName} />
      </body>
    </html>
  );
}
