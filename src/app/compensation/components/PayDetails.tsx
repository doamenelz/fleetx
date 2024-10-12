"use client";

import { Accordion, TextLabel } from "@/components";

export const PayDetails = () => {
  return (
    <>
      <Accordion
        id=""
        title="Salary Account Details"
        defaultOpen={false}
        style="section"
        body={
          <div className="space-y-4 p-4 rounded border-c-mid border m-2">
            <TextLabel label="Bank Name" copy="Heritage Bank Plc" />
            <TextLabel label="Account Number" copy="5300000137" />
            <TextLabel label="Account Name" copy="Steve Mayer Jobs" />
            <TextLabel label="Bank Code" copy="030" />
            <TextLabel
              label="Bank Verification Number"
              copy="8293822382938AL"
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
            <TextLabel
              label="Fund Administrator"
              copy="FCMB Pensions Limited"
            />
            <TextLabel label="RSA PIN" copy="PEN0000012543156" />
            <TextLabel label="Date Joined" copy="23 Aug, 2021" />
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
          </div>
        }
      />
    </>
  );
};

/*

 action={
          <div>
            <Button
              onClick={() => {}}
              skin={BUTTON_SKIN.primary}
              label="Request a Change"
              icon={{
                position: ICON_POSITION.trailing,
                asset: <Icon icon={IconList.arrowRight} size={ICON_SIZES.sm} />,
              }}
            />
          </div>
        } */
