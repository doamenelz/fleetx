"use client";

import {
  CardWithSectionHeader,
  Lbl,
  LblText,
  TipDirection,
  ToolTip,
} from "@/components";
import { ServiceStatusGrid } from "./ServiceStatusGrid";
import { FC } from "react";
import { ServiceSummary } from "@/models/ServiceAndRecalls/Service";

export const ServiceSummaryCard: FC<{ data: ServiceSummary }> = ({ data }) => {
  return (
    <CardWithSectionHeader
      title="Overview"
      copy="Year to date"
      hasBoundary={false}
    >
      <ServiceStatusGrid
        data={[
          { label: "Scheduled", value: data.scheduled },
          { label: "Overdue", value: data.overdue },
          { label: "Completed", value: data.completed },
        ]}
      />

      <div className="py-4 space-y-6">
        <div className="">
          <Lbl label="Total Cost(s)" />
          <p className="text-3xl font-mono font-medium">{`${data.totalCost.currency}${data.totalCost.cost}`}</p>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <LblText
            label="Service Cost(s)"
            copy={
              <p className="font-mono text-sm">{`${data.serviceCost.currency}${data.serviceCost.cost}`}</p>
            }
          />

          <LblText
            label="Repairs"
            copy={
              <div className="group relative">
                <ToolTip
                  label={
                    "Cost is the total of all Out-of-Service parts & fixes"
                  }
                  direction={TipDirection.none}
                ></ToolTip>
                <p className="decoration-dotted underline hover:decoration-primary-400 font-mono text-sm">
                  {`${data.repairCost.currency}${data.repairCost.cost}`}
                </p>
              </div>
            }
          />
        </div>
      </div>
    </CardWithSectionHeader>
  );
};
