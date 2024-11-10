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
import { sampleUsers } from "../page";
import { Person } from "@/models/Person";
import { UserSummaryCard } from "../components/UserCardSummary";
import { EditUserFormView } from "../components/EditUserFormView";

export default function Page() {
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
      documentTitle={`Users - Add User`}
      fullWidth={SCREEN_WIDTH.full}
      isLoading={false}
      hasPadding={true}
      showHeader={false}
      breadCrumbs={[{ id: "001", name: "Create User", href: "" }]}
    >
      <div className="py-2">
        <SectionHeader
          title="Create a New User"
          copy=""
        />
        <EditUserFormView />
      </div>
    </PageContainer>
  );
}

//max-h-[calc(100vh_-_260px)]
