import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Providers } from "./Providers";
import { getAllBoard } from "@/lib/db";
import { BoardProvider } from "@/lib/BoardContext";

const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = await getAllBoard();
  console.log(data)
  return (
    <html lang="en">
      <body
        className={`${plusJakartaSans.className} antialiased bg-background-light`}
        suppressHydrationWarning={true}
      >
        <Providers>
          <BoardProvider>
            <main className="grid grid-cols-[300px_1fr] h-screen">
              <Sidebar data={data!} />
              <Header />
              {children}
            </main>
            <div id="modal-root" />
          </BoardProvider>
        </Providers>
      </body>
    </html>
  );
}
