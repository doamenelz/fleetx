"use client";
import { InnerSideNavigation, PrimaryNavigation } from "@/components";
import { usePathname } from "next/navigation";

export default function VehiclesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const path = usePathname();

  const navigation = PrimaryNavigation.find((nav) => path.includes(nav.link));
  return (
    <InnerSideNavigation
      top={true}
      items={navigation?.children ?? []}
    >
      <>{children}</>
    </InnerSideNavigation>
  );
}
