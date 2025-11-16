import "./globals.css";
import type { Metadata } from "next";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

export const metadata: Metadata = {
  title: "LIGHT WAVE — Creative Agency",
  description: "Creative agency for real-world visuals.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Home smooth-scroll handler: only triggered on / (Header receives it)
  const onHomeScroll = undefined; // wired in app/page.tsx
  return (
    <html lang="en">
      {/* <Header onHomeScroll={onHomeScroll} /> */}
      <body>
        {/* Header without onHomeScroll here — Home will render its own header to enable smooth scroll */}
        {children}
        <Footer />
      </body>
    </html>
  );
}
