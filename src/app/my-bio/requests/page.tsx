"use client";
import {
  PageContainer,
  SCREEN_WIDTH,
  Button,
  ICON_POSITION,
  SectionHeader,
  SlideOutWrapper,
  ModalBackdrop,
  Timeline,
} from "@/components";
import {
  JobHistoryTable,
  KinAndBeneficiariesTable,
  MyDocumentsTable,
} from "@/modules/MyBio";
import data from "../../../modules/MyBio/models/jobHistoryData.json";
import { AtSymbolIcon, PlusIcon } from "@heroicons/react/20/solid";
import { JobSummaryCard } from "@/app/my-bio/components/JobSummaryCard";
import {
  sampleDocumentList,
  sampleUpdateRequest,
} from "@/modules/MyBio/models/EmployeeDocument";
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { RequestsTable } from "./Requests";
export default function Page() {
  const [openControl, setOpenControl] = useState(false);

  const ref = useRef<Element | null>(null);
  useEffect(() => {
    ref.current = document.getElementById("modal");
  }, []);

  return (
    <PageContainer
      documentTitle="Profile - Requests"
      fullWidth={SCREEN_WIDTH.ultra}
      isLoading={false}
      hasPadding={true}
    >
      <div className=" py-4 space-y-2">
        <SectionHeader
          title="Requests"
          copy="Your submitted profile updates and change(s) requests"
          // button={
          //   <Button
          //     label="Upload Document"
          //     onClick={() => {
          //       setOpenControl(true);
          //     }}
          //     icon={{
          //       position: ICON_POSITION.trailing,
          //       asset: <PlusIcon className="text-gray-100 w-4 h-4" />,
          //     }}
          //   />
          // }
        />
        <RequestsTable data={sampleUpdateRequest} />
      </div>
    </PageContainer>
  );
}
type ModalP = {
  children: React.ReactNode;
  show?: boolean;
  selector: string;
};
const Modal = ({ children, selector, show }: ModalP) => {
  const ref = useRef<Element | null>(null);
  useEffect(() => {
    ref.current = document.getElementById(selector);
  }, [selector]);
  return show && ref.current ? createPortal(children, ref.current) : null;
};
