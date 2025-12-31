import type { Metadata } from "next";
import "./globals.scss";
import Navbar from "./components/_navbar";
import Footer from "./components/_footer";

export const metadata: Metadata = {
  title: "Plafonds Premium - Blog & Expertise",
  description: "Spécialiste des plafonds tendus",
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="fr">
      <body>
      <Navbar />
      <main>{children}</main>
      <Footer />
      </body>
      </html>
  );
}

