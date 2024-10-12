"use client";

import {
  Accordion,
  BUTTON_SKIN,
  Button,
  GRID_TYPE,
  GridLayout,
  PageContainer,
  SCREEN_WIDTH,
  SectionHeader,
  TextLabel,
} from "@/components";
import { useState } from "react";

enum SETTINGS_TYPE {
  salary,
  pensionFund,
  nhf,
}
export default function Page() {
  const [selectedEdit, setSelectedEdit] = useState<SETTINGS_TYPE>(
    SETTINGS_TYPE.salary
  );
  const [showModal, setShowModal] = useState(false);
  const toggleEditMode = (editType: SETTINGS_TYPE) => {
    setSelectedEdit(editType);
    setShowModal(true);
  };
  return (
    <PageContainer
      documentTitle="Compensation Settings"
      fullWidth={SCREEN_WIDTH.regular}
      isLoading={false}
      hasPadding={true}
    >
      <div className="py-2">
        <SectionHeader
          title="Settings"
          copy="Changes made to your Compensation Settings may be sent to your Admin for approval"
        />
        <>
          <Accordion
            id=""
            title="Salary Account Details"
            defaultOpen={true}
            style="section"
            body={
              <div className="space-y-4 p-4 rounded border-c-mid border m-2">
                <GridLayout type={GRID_TYPE.twoCol}>
                  <TextLabel label="Bank Name" copy="Heritage Bank Plc" />
                  <TextLabel label="Account Number" copy="5300000137" />
                  <TextLabel label="Account Name" copy="Steve Mayer Jobs" />
                  <TextLabel label="Bank Code" copy="030" />
                  <TextLabel
                    label="Bank Verification Number"
                    copy="8293822382938AL"
                  />
                </GridLayout>
                <Button
                  label="Request Change"
                  skin={BUTTON_SKIN.secondaryColor}
                  onClick={() => toggleEditMode(SETTINGS_TYPE.salary)}
                />
              </div>
            }
          />

          <Accordion
            id=""
            title="Pension Fund"
            defaultOpen={false}
            style="section"
            body={
              <div className="space-y-4 p-4 rounded border-c-mid border m-2">
                <GridLayout type={GRID_TYPE.twoCol}>
                  <TextLabel
                    label="Fund Administrator"
                    copy="FCMB Pensions Limited"
                  />
                  <TextLabel label="RSA PIN" copy="PEN0000012543156" />
                  <TextLabel label="Date Joined" copy="23 Aug, 2021" />
                </GridLayout>
                <Button
                  label="Request Change"
                  onClick={() => toggleEditMode(SETTINGS_TYPE.pensionFund)}
                  skin={BUTTON_SKIN.secondaryColor}
                />
              </div>
            }
          />

          <Accordion
            id=""
            title="National Housing Fund"
            defaultOpen={false}
            style="section"
            body={
              <div className="space-y-4 p-4 rounded border-c-mid border m-2">
                <TextLabel label="NHF Number" copy="LAG90334B12" />
                <TextLabel label="Tax ID" copy="EE0932UDWJ12" />
                <Button
                  label="Request Change"
                  onClick={() => toggleEditMode(SETTINGS_TYPE.nhf)}
                  skin={BUTTON_SKIN.secondaryColor}
                />
              </div>
            }
          />
        </>
      </div>
    </PageContainer>
  );
}
