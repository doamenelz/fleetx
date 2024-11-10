"use client";

import {
  Button,
  GRID_TYPE,
  GridLayout,
  Lbl,
  PageContainer,
  SCREEN_WIDTH,
  SearchField,
  DocCard,
  Spinner,
  BUTTON_SKIN,
} from "@/components";
import { userPageBreadcrumbs } from "../layout";
import { usePathname } from "next/navigation";
import { FC, useContext, useEffect } from "react";
import { UserContext } from "../userContext";
import { EmptyState } from "@/app/home/components";

export default function Page() {
  const loc = usePathname();
  const userContext = useContext(UserContext);

  useEffect(() => {}, []);
  return (
    <PageContainer
      documentTitle={`Users - ${loc.split("/")[2]}`}
      fullWidth={SCREEN_WIDTH.full}
      isLoading={false}
      hasPadding={false}
      showHeader={false}
      breadCrumbs={userPageBreadcrumbs(loc, "2")}
      bgColor=""
    >
      {userContext.details == undefined ? (
        <div className="mx-auto fixed inset-0 overscroll-y-none flex items-center justify-center 100vh ">
          <Spinner props={{ label: "Getting User Information.." }} />
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex pt-2 justify-between items-center">
            <SearchField
              placeholder="Search"
              setQuery={() => {}}
            />

            <div className="flex gap-2">
              <div className="items-center flex gap-2">
                <Button
                  label="Upload Document"
                  // skin={BUTTON_SKIN.secondaryColor}
                />
              </div>
            </div>
          </div>

          {userContext.details.files == undefined ? (
            <></>
          ) : userContext.details.files.length >= 1 ? (
            <GridLayout type={GRID_TYPE.fourCol}>
              {userContext?.details.files?.map((doc) => (
                <DocCard
                  doc={doc}
                  key={doc.id}
                />
              ))}
            </GridLayout>
          ) : (
            <EmptyState
              icon={<></>}
              copy="No Documents Uploaded"
            />
          )}
        </div>
      )}
    </PageContainer>
  );
}
