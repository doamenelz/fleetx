"use client";
import {
  PageContainer,
  SCREEN_WIDTH,
  SectionHeader,
  Button,
  ICON_POSITION,
} from "@/components";
import { ConfirmationGuarantorsTable } from "./ConfirmationGuarantors";
import { CreateEditGuarantor } from "./CreateEditGuarantor";
import { useState, useRef, useEffect } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
export default function Page() {
  const ref = useRef<Element | null>(null);
  useEffect(() => {
    ref.current = document.getElementById("modal");
  }, []);

  return (
    <PageContainer
      documentTitle="Profile - Guarantors & References"
      fullWidth={SCREEN_WIDTH.ultra}
      isLoading={false}
      hasPadding={true}
    >
      <div className=" py-4 space-y-2">
        <SectionHeader
          title="Guarantors and References"
          copy="Your personal references and guarantors"
          button={
            <Button
              label="Add a new contact"
              icon={{
                position: ICON_POSITION.trailing,
                asset: <PlusIcon className="text-gray-100 w-4 h-4" />,
              }}
            />
          }
        />
        <ConfirmationGuarantorsTable data={[]} />
      </div>
    </PageContainer>
  );
}

/*

Title	Name	Address	State	Country	Employer	Job-Position	Relationship	Rel. Duration	Mobile	Email Address
Title	Name	Address	State	Country	Mobile	Email Address
*/
