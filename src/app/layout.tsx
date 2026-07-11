import type { Metadata } from "next";
import { cormorant, inter, fraunces, spaceMono } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Loviroots - Nature's Touch, Lovingly Yours",
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
      className={`${cormorant.variable} ${inter.variable} ${fraunces.variable} ${spaceMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-ivory text-ink antialiased">
        {children}
      </body>
    </html>
  );
}
