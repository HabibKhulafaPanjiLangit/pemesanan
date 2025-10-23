import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Meowlabs.id - Professional Web Development",
  description: "Transformasi digital untuk bisnis Anda dengan website modern, cepat, dan profesional. Jasa pembuatan website terpercaya di Indonesia.",
  keywords: ["Meowlabs", "web development", "website", "Next.js", "TypeScript", "Indonesia", "jasa website", "company profile", "e-commerce"],
  authors: [{ name: "Meowlabs.id Team" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "Meowlabs.id - Professional Web Development",
    description: "Transformasi digital untuk bisnis Anda dengan website modern, cepat, dan profesional",
    url: "https://meowlabs.id",
    siteName: "Meowlabs.id",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Meowlabs.id - Professional Web Development",
    description: "Transformasi digital untuk bisnis Anda dengan website modern, cepat, dan profesional",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
