"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export const ScrollToTop = () => {
  const pathname = usePathname();

  useEffect(() => {
    // "document.documentElement.scrollTo" is the magic for React Router Dom v6
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth", //auto for instant
      //   behavior: "instant", // Optional if you want to skip the scrolling animation
    });
  }, [pathname]);

  return null;
};
