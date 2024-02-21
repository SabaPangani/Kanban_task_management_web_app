import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Theme from "@/components/theme-provider";
import Sidebar from "./sidebar";
import Navbar from "./navbar";
import "./globals.css";
import { BoardProvider } from "@/store/boardContext";
import AuthProvider from "./AuthProvider";

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
      <AuthProvider>
        <BoardProvider>
          <Theme>
            <body className={plusJakartaSans.className}>
              <Navbar />
              <Sidebar />
              {children}
            </body>
          </Theme>
        </BoardProvider>
      </AuthProvider>
    </html>
  );
}
