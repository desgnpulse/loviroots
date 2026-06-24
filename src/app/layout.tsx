import type { Metadata } from "next";
import { playfair, inter } from "@/lib/fonts";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Loviroots — Nature's Touch, Lovingly Yours",
    template: "%s | Loviroots",
  },
  description:
    "100% natural shea butter skincare rooted in African heritage. Shop Lovi Shea Butter at loviroots.com.",
  metadataBase: new URL("https://loviroots.com"),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-ivory text-earth antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
