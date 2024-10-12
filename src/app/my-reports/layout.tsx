"use client";
import { InnerSideNavigation, PrimaryNavigation } from "@/components";
import { usePathname } from "next/navigation";
import { MyReportContext } from "./models/MyReportContext";
import { useEffect, useState } from "react";
import { ReportViewCardModel } from "./models/ReportModels";
import sampleFirstLoad from "./models/sampleFirstLoadReport.json";

export default function MyBioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const path = usePathname();
  const [myReports, setMyReports] = useState<ReportViewCardModel[]>([]);

  // useEffect(() => {}, []);

  const navigation = PrimaryNavigation.find((nav) => path.includes(nav.link));
  return (
    <MyReportContext.Provider
      value={{
        reports: myReports,
        updateReports: setMyReports,
      }}
    >
      <InnerSideNavigation
        moduleName="My Reports"
        top={true}
        items={navigation?.children ?? []}
      >
        <>{children}</>
      </InnerSideNavigation>
    </MyReportContext.Provider>
  );
}
