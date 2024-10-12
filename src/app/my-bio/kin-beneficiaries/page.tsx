"use client";
import {
  PageContainer,
  SCREEN_WIDTH,
  Button,
  ICON_POSITION,
  SectionHeader,
  ModalBackdrop,
  SlideOutWrapper,
} from "@/components";
import { KinAndBeneficiariesTable } from "@/modules/MyBio";
import kinData from "../../../modules/MyBio/models/kinData.json";
import { AtSymbolIcon, PlusIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { KinAndBeneficiariesForm } from "../components/KinAndBeneficiariesForm";

export default function Page() {
  const [showModal, setShowModal] = useState(false);
  const showModalHandler = () => {
    setShowModal(false);
  };
  return (
    <PageContainer
      documentTitle="Profile - Kin & Beneficiaries"
      fullWidth={SCREEN_WIDTH.ultra}
      isLoading={false}
      hasPadding={true}
    >
      <div className="space-y-4 py-4">
        <SectionHeader
          title="Kin & Beneficiaries"
          copy="Manage your Next of Kin, Beneficiaries and Dependents"
          button={
            <Button
              label="Add a new contact"
              onClick={() => setShowModal(true)}
              icon={{
                position: ICON_POSITION.trailing,
                asset: <PlusIcon className="text-gray-100 w-4 h-4" />,
              }}
            />
          }
        />
        <KinAndBeneficiariesTable data={kinData} />
      </div>
      <ModalBackdrop selector="modal">
        <SlideOutWrapper
          closeControl={showModalHandler}
          openControl={showModal}
          size="3xl"
          showDismissButton
        >
          <>
            <KinAndBeneficiariesForm />
          </>
        </SlideOutWrapper>
      </ModalBackdrop>
    </PageContainer>
  );
}
