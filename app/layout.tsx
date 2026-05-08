import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";

const IBMPlex = IBM_Plex_Sans({subsets:['latin'],weight: ["400", "500", "600", "700"], variable: "--font-ibm-plex"});


export const metadata: Metadata = {
  title: "Imaginify",
  description: "Imaginify is an AI-powered image generation tool that allows users to create stunning visuals from text prompts. With a user-friendly interface and advanced algorithms, Imaginify transforms your ideas into captivating images in seconds.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("font-IBMPlex antialiased", IBMPlex.variable)}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
