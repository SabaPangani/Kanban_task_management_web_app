import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Theme from "@/components/theme-provider";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kanban task management",
  description: "Manage your task in an improved manner",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={plusJakartaSans.className}>
        <Theme>{children}</Theme>
      </body>
    </html>
  );
}
