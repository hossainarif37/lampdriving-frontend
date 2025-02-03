import type { Metadata } from "next";
import "./globals.css";
import { Pathway_Extreme } from "next/font/google";
import ReduxProvider from "@/providers/ReduxProvider";
import AuthProvider from "@/providers/AuthProvider";
import { Toaster } from "@/components/ui/toaster";
import WarningBar from "@/components/shared/WarningBar";

export const metadata: Metadata = {
  title: "Lamp Driving School",
  description: "Lamp Driving School is a driving school",
  keywords: ["Lamp Driving School", "Lamp", "Driving", "Lamp Driving", "Driving School", "Lamp Driving School", "Driving School Australia", "Lamp Driving School Australia", "Driving School in Australia"]
};

const pathway = Pathway_Extreme({ subsets: ["latin"] });

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${pathway.className}`}
      >
        <ReduxProvider>
          <AuthProvider>
            <Toaster />
            <WarningBar />
            {children}
          </AuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
