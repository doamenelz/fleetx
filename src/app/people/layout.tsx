"use client";
import { InnerSideNavigation, PrimaryNavigation } from "@/components";
import { usePathname } from "next/navigation";

export default function MyBioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const path = usePathname();

  const navigation = PrimaryNavigation.find((nav) => path.includes(nav.link));
  return (
    <InnerSideNavigation
      moduleName=""
      top={true}
      items={navigation?.children ?? []}
    >
      <>{children}</>
    </InnerSideNavigation>
  );
}
