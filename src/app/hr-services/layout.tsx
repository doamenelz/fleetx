"use client";
import {
  InnerSideNavigation,
  PrimaryNavigation,
  SecondaryNavigation,
} from "@/components";
import { usePathname } from "next/navigation";

export default function MyBioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const path = usePathname();

  const navigation = SecondaryNavigation.find((nav) => path.includes(nav.link));
  return (
    <InnerSideNavigation top={true} items={navigation?.children ?? []}>
      <>{children}</>
    </InnerSideNavigation>
  );
}
