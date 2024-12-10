import type { Metadata } from "next";
import "./globals.css";
import { Pathway_Extreme } from "next/font/google";
import ReduxProvider from "@/providers/ReduxProvider";

export const metadata: Metadata = {
  title: "Lamp Driving School",
  description: "Lamp Driving School is an driving school ",

};

const pathway = Pathway_Extreme({ subsets: ["latin"] });

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${pathway.className} antialiased`}
      >
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
