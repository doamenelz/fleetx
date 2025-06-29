// "use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "fleetX",
  description: "Fleet Management System",
};

import { Providers } from "./providers";
import clsx from "clsx";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className="bg-pageBg"
    >
      <body className={clsx(inter.className, "bg-white")}>
        <div
          className=""
          id="modal"
        ></div>

        <div
          className=""
          id="modal2"
        ></div>

        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
