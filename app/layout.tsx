import type { Metadata } from "next";
import "@/styles/globals.css";

import Header from "@/components/Header";
import SignInFooter from "@/components/SignInFooter";

export const metadata: Metadata = {
  title: "Mentore",
  description: "Unlock potential together",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Header />
      <body>{children}</body>
      <SignInFooter />
    </html>
  );
}
