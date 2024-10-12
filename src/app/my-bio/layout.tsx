"use client";
import { InnerSideNavigation, PrimaryNavigation } from "@/components";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export default function MyBioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const path = usePathname();
  const ref = useRef<Element | null>(null);
  const navigation = PrimaryNavigation.find((nav) => path.includes(nav.link));

  const getNavigation = () => {
    const _items = PrimaryNavigation.find((nav) => path.includes(nav.link));
    /*

    Look for Requests
    - Update object to include notification count
    */
  };

  useEffect(() => {
    ref.current = document.getElementById("modal");
  }, []);
  return (
    <InnerSideNavigation
      moduleName={"My Profile"}
      top={true}
      items={navigation?.children ?? []}
    >
      <>{children}</>
    </InnerSideNavigation>
  );
}
