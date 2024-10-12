"use client";

import {
  BUTTON_SKIN,
  BodyCopy,
  Button,
  CardWithSectionHeader,
  Lbl,
  TextLabel,
} from "@/components";
import { FC } from "react";
const DeductionCard: FC<{
  title: string;
  amount: string;
  percentage: string;
}> = (props) => {
  return (
    <div className="py-4 w-full flex justify-between items-center">
      <TextLabel label={props.title} copy={props.amount} />
      <div>
        <Button label="View Statement" skin={BUTTON_SKIN.secondary} />
      </div>
    </div>
  );
};

export const RemittanceCard = () => {
  return (
    <CardWithSectionHeader
      title="Remittance"
      copy="Remittance Deductions for the current period"
    >
      <ul className="divide-y">
        <DeductionCard
          title="National Housing Fund"
          amount="NGN 180,324.55"
          percentage="2.5%"
          key={"nhf"}
        />
        <DeductionCard
          title="Taxes"
          amount="NGN 374,127.90"
          percentage="2.5%"
          key={"tx"}
        />
        <DeductionCard
          title="Pension Fund"
          amount="NGN 54,253.45"
          percentage="2.5%"
          key={"pf"}
        />
      </ul>
    </CardWithSectionHeader>
  );
};
