import type { Metadata } from "next";
import "./globals.scss";
import Navbar from "./components/_navbar";
import Footer from "./components/_footer";
import {getServerSession} from "next-auth";
import SessionProviderWrapper from "@/app/components/auth/SessionProvider";
import {authOptions} from "@/app/api/auth/config";

export const metadata: Metadata = {
  title: "Plafonds Premium - Blog & Expertise",
  description: "Spécialiste des plafonds tendus",
};

export default async function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {

    //recupere la session coté serveur
    const session= await getServerSession(authOptions)
  return (
      <html lang="fr">
      <body>
     <SessionProviderWrapper session={session}>
      <Navbar />
      <main>{children}</main>
      <Footer />
     </SessionProviderWrapper>
      </body>
      </html>
  );
}

