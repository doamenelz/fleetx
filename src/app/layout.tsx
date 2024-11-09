// "use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "fleetX",
  description: "Fleet Management System",
};

import { classNames } from "@/lib/utilities/helperFunctions";
import { Providers } from "./providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-pageBg">
      <body className={classNames(inter.className, "bg-white")}>
        <div className="" id="modal"></div>

        <div className="" id="modal2"></div>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
