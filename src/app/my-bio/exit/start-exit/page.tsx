"use client";
import {
  BackHeader,
  Button,
  DatePicker,
  PageContainer,
  SCREEN_WIDTH,
  SectionHeader,
  TEXT_INPUT_SIZE,
  TextArea,
  TextInput,
} from "@/components";
import { ExitManagementLeadCTA } from "@/modules/MyBio";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FileUploadField } from "@/components/TextInput/FileUploadField";

export default function Page() {
  const [openControl, setOpenControl] = useState(false);
  const [letter, setLetter] = useState<Blob>();

  const ref = useRef<Element | null>(null);
  useEffect(() => {
    ref.current = document.getElementById("modal");
  }, []);

  const router = useRouter();

  return (
    <PageContainer
      documentTitle="Profile - Resignation"
      fullWidth={SCREEN_WIDTH.ultra}
      isLoading={false}
      hasPadding={true}
    >
      <div>
        <BackHeader previousPathName="" />
      </div>
      <form className=" py-4 space-y-4 max-w-lg">
        <p className="text-sm p-4 bg-primary-50 tracking-tight text-gray-900 rounded-md">
          In order to make this process seamless, we advice you have a prior
          discussions with your manager before submitting your resignation on
          the system.
        </p>
        {/* <TextArea
          label="Reason for Exit"
          id="exit-reason"
          span={TEXT_INPUT_SIZE.span1}
        />
        <DatePicker
          label="Effective Date"
          id="effective-date"
          selectedDate={new Date()}
        /> */}
        <FileUploadField
          id=""
          name=""
          handleChange={setLetter}
          label="Resignation Letter"
          placeHolder=""
          type="file"
          required={true}
        />

        <Button label="Submit Resignation" />
      </form>
    </PageContainer>
  );
}
