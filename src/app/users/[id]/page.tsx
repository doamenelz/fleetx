"use client";

import {
  BackHeader,
  GRID_TYPE,
  GridLayout,
  Lbl,
  PageContainer,
  PageLoader,
  SCREEN_WIDTH,
  SearchField,
  Spinner,
  STATUS_COLORS,
  StatusBadge,
  Tab,
  Tabs,
  Button,
  SectionHeader,
  BUTTON_SKIN,
} from "@/components";
import { sampleVehicles, Vehicle } from "@/models/Vehicle/Vehicle";
import { useEffect, useState } from "react";
import { simulateLoader } from "@/lib/utilities/helperFunctions";
import { usePathname } from "next/navigation";
import { sampleVendors, Vendor } from "@/models/Vendors";
import { sampleVehicleExpenses } from "@/models";
import { ChevronLast, ChevronLeft, ChevronRight } from "lucide-react";
import { userPageBreadcrumbs } from "./layout";
import { sampleUsers } from "../page";
import { Person } from "@/models/Person";
import { UserSummaryCard } from "../components/UserCardSummary";

export default function Page({ params }: { params: { id: string } }) {
  // const _leaveDetails = sampleBalances.find((p) => p.type === params.id);
  const loc = usePathname();
  useEffect(() => {
    const userDetails = sampleUsers[0];
    setSelectedUser(userDetails);
    simulateLoader(setIsLoading, 2000);
  }, []);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<Person>();

  return (
    <PageContainer
      documentTitle={`Users - ${params.id}`}
      fullWidth={SCREEN_WIDTH.full}
      isLoading={false}
      hasPadding={false}
      showHeader={false}
      breadCrumbs={userPageBreadcrumbs(loc, "1")}
    >
      {isLoading ? (
        <div className="mx-auto fixed inset-0 overscroll-y-none flex items-center justify-center 100vh ">
          <Spinner props={{ label: "Getting Vendor Information.." }} />
        </div>
      ) : (
        <div className="py-4">
          <UserSummaryCard person={selectedUser!} />
          {/* <GridLayout
            type={GRID_TYPE.twoOne}
            rhs={
              <>
                <SectionHeader title="Configurations" />

                <div>
                  <Button label="Manage Access" />
                  <Button label="Reset Password" />
                  <Button
                    label="Disable User"
                    skin={BUTTON_SKIN.secondaryColor}
                  />
                </div>
              </>
            }
            lhs={
              <>
                <UserSummaryCard person={selectedUser!} />
              </>
            }
          ></GridLayout> */}
        </div>
      )}
    </PageContainer>
  );
}

//max-h-[calc(100vh_-_260px)]
