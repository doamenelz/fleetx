"use client";

import { IconList } from "@/assets/IconList";
import {
  BUTTON_SKIN,
  BodyCopy,
  Button,
  CardWithSectionHeader,
  Lbl,
  STATUS_COLORS,
  StatusBadge,
  TextLabel,
} from "@/components";
import { ICON_SIZES, Icon } from "@/components/Icons";
import { FC } from "react";

export const PayReviewCard = () => {
  return (
    <CardWithSectionHeader title="Pay Review History">
      <ul className="divide-y">
        <ReviewCell
          title="Performance Based Promotion"
          newValue="NGN 18,262,953"
          oldValue="NGN 14,543,564"
          percentage="+7%"
          key={"1"}
          type="increase"
          date="12 Aug, 2023"
        />
        <ReviewCell
          title="Market Adjustment"
          oldValue="NGN 12,562,256"
          newValue="NGN 14,543,564"
          percentage="+15%"
          key={"2"}
          type="increase"
          date="11 May, 2022"
        />
        <ReviewCell
          title="Base Pay"
          copy="NGN 12,562,256.45"
          percentage="N/A"
          key={"3"}
          type="base"
          date="15 Jan, 2020"
        />
      </ul>
    </CardWithSectionHeader>
  );
};

const ReviewCell: FC<{
  title: string;
  copy?: string;
  oldValue?: string;
  newValue?: string;
  percentage: string;
  date: string;
  type: "increase" | "decrease" | "base";
}> = (props) => {
  return (
    <div className="py-4 w-full flex justify-between items-center">
      <div className="space-y-1">
        <TextLabel
          label={props.title}
          copy={
            props.copy != undefined ? (
              props.copy
            ) : (
              <div className="flex gap-2 items-center text-slate-400">
                <BodyCopy text={props.oldValue!} />
                <Icon icon={IconList.arrowRight} size={ICON_SIZES.sm} />
                <BodyCopy text={props.newValue!} />
              </div>
            )
          }
        />
        <Lbl label={props.date} />
      </div>
      <StatusBadge
        label={props.percentage}
        statusType={
          props.type == "increase"
            ? STATUS_COLORS.success
            : props.type == "decrease"
            ? STATUS_COLORS.declined
            : STATUS_COLORS.regular
        }
      />
    </div>
  );
};
