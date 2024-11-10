"use client";

import { PageContainer, SCREEN_WIDTH, Spinner } from "@/components";
import { useContext, useEffect, useState } from "react";
import { simulateLoader } from "@/lib/utilities/helperFunctions";
import { usePathname } from "next/navigation";
import { userPageBreadcrumbs } from "./layout";
import { sampleUsers } from "../page";
import { Person } from "@/models/Person";
import { UserSummaryCard } from "../components/UserCardSummary";
import { UserContext } from "./userContext";

export default function Page({ params }: { params: { id: string } }) {
  const loc = usePathname();
  const userContext = useContext(UserContext);

  useEffect(() => {
    setSelectedUser(userContext.details);
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
      {selectedUser == undefined ? (
        <div className="mx-auto fixed inset-0 overscroll-y-none flex items-center justify-center 100vh ">
          <Spinner props={{ label: "Getting User Information.." }} />
        </div>
      ) : (
        <div className="py-4">
          <UserSummaryCard person={selectedUser} />
        </div>
      )}
    </PageContainer>
  );
}

//max-h-[calc(100vh_-_260px)]
