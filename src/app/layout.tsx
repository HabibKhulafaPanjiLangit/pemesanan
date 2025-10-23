import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

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
    icon: '/logo.png',
  },
  openGraph: {
    title: "Meowlabs.id - Professional Web Development",
    description: "Transformasi digital untuk bisnis Anda dengan website modern, cepat, dan profesional",
    url: "https://meowlabs.id",
    siteName: "Meowlabs.id",
    type: "website",
    images: [
      {
        url: '/logo.png',
        width: 800,
        height: 600,
        alt: 'Meowlabs.id Logo',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Meowlabs.id - Professional Web Development",
    description: "Transformasi digital untuk bisnis Anda dengan website modern, cepat, dan profesional",
    images: ['/logo.png'],
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
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
