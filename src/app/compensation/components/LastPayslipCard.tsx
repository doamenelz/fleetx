"use client";

import { FC, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Pay, sampleAnnualPay, samplePay } from "../models/Pay";
import {
  Accordion,
  BUTTON_SKIN,
  Button,
  CardWithSectionHeader,
  GRID_TYPE,
  GridLayout,
  ModalBackdrop,
  PlainCard,
  SectionHeader,
  SlideOutWrapper,
  TextLabel,
} from "@/components";
import { ICON_SIZES, Icon } from "@/components/Icons";
import { IconList } from "@/assets/IconList";
import { PaySlipPieChart } from "./PayslipChart";
import {
  samplePieChartAnnualPayData,
  samplePieChartData,
} from "../models/ChartData";
import { BreakdownSection, PayslipBreakdownTable } from "./PayslipBreakdown";

//TODO: Make color property constants
export interface ChartData {
  name: string;
  value: number;
  label?: string;
  color: string;
}

export const AnnualRemunerationCard = () => {
  const [showModal, setShowModal] = useState(false);
  const showModalHandler = () => {
    setShowModal(false);
  };
  const chartData: ChartData[] = [
    { name: "Deductions", value: samplePay[0].deduction, color: "#fdb022" },
    { name: "Net Pay", value: samplePay[0].net, color: "#12B76A" },
  ];
  return (
    <>
      <PlainCard>
        <>
          <TextLabel label="My Remuneration " copy={"Annual Pay"} />
          <div className="w-full pt-4 space-y-4">
            <LastPayslipChart data={chartData} />
            <PayslipSummaryTable pay={samplePay[0]} />
            <Button
              skin={BUTTON_SKIN.secondaryColor}
              label="View Breakdown"
              fillWidth={true}
              onClick={() => setShowModal(true)}
            />
          </div>
        </>
      </PlainCard>
      <ModalBackdrop selector="modal">
        <SlideOutWrapper
          closeControl={showModalHandler}
          openControl={showModal}
          size="lg"
          //   showDismissButton={window.innerWidth > 1023 ? false : true}
        >
          <div className="px-4 pt-4 pb-8">
            <SectionHeader
              title={"Annual Remuneration"}
              button={
                <button className="text-indigo-600 hover:text-slate-700">
                  <Icon icon={IconList.download} size={ICON_SIZES.md} />
                </button>
              }
            />
            <Accordion
              id="pay-summary"
              title="Contract Summary"
              defaultOpen={true}
              style="section"
              body={
                <>
                  <AnnualPayPie data={samplePieChartAnnualPayData} />
                  <div className="text-xs space-y-2 py-4">
                    <div className=" w-full pb-2 space-y-2 text-gray-700 border-gray-400">
                      <p className="font-medium">Allowances</p>
                      <BreakdownSection
                        obj={sampleAnnualPay.allowances}
                        currency={sampleAnnualPay.currency}
                        total={sampleAnnualPay.totalAllowance}
                        isSubtraction={false}
                      />
                    </div>
                    <div className="w-full pb-2 space-y-2 text-gray-700 border-gray-400">
                      <p className="flex items-center gap-2">
                        <span className="block w-3 h-3 rounded-full bg-warning-400"></span>
                        Deductions
                        <span className="px-2 py-0.5 text-xs rounded-xl font-medium bg-warning-50 text-warning-600">
                          17.5%
                        </span>
                      </p>
                      <BreakdownSection
                        obj={sampleAnnualPay.deduction}
                        currency={sampleAnnualPay.currency}
                        total={sampleAnnualPay.totalDeduction}
                        isSubtraction={true}
                      />
                    </div>
                    <div className="flex justify-between w-full pt-2 font-semibold text-gray-700 border-t border-gray-400">
                      <p className="flex items-center gap-2">
                        <span className="block w-3 h-3 rounded-full bg-success-500"></span>
                        Net Pay{" "}
                        <span className="px-2 py-0.5 text-xs rounded-xl font-medium bg-success-50 text-success-700">
                          65.25%
                        </span>
                      </p>
                      <p>
                        {sampleAnnualPay.currency}{" "}
                        {sampleAnnualPay.totalNet.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </>
              }
            />
          </div>
        </SlideOutWrapper>
      </ModalBackdrop>
    </>
  );
};

export const LastPayslipChart: FC<{ data: ChartData[] }> = (props) => {
  return (
    <ResponsiveContainer height={240}>
      <PieChart
        margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
        // width={260}
        // height={260}
        // style={{ zIndex: 1, color: "#000000", position: "relative" }}
      >
        <Pie
          data={props.data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={100}
          fill="#000000"
          dataKey="value"
          style={{
            zIndex: -1,
            backgroundColor: "#000000",
            position: "relative",
          }}
        >
          {props.data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={entry.color}
              stroke={entry.color}
              style={{
                zIndex: -1,
                backgroundColor: "#000000",
                position: "relative",
              }}
            />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export const PayslipSummaryTable: FC<{ pay: Pay }> = ({ pay }) => {
  return (
    <div className="w-full space-y-3 text-xs">
      <div className="flex justify-between w-full pb-2 font-medium text-gray-700 border-b border-gray-400">
        <p className="">Allowances</p>
        <p className="">
          {pay.currency} {pay.total.toLocaleString()}
        </p>
      </div>

      <div className="flex justify-between w-full font-normal text-gray-700 ">
        <p className="flex items-center gap-2">
          <span className="block w-3 h-3 rounded-full bg-warning-400"></span>
          Deductions{" "}
        </p>
        <p>
          - {pay.currency} {pay.deduction.toLocaleString()}
        </p>
      </div>

      <div className="flex justify-between w-full pt-2 font-semibold text-gray-700 border-gray-400">
        <p className="flex items-center gap-2">
          <span className="block w-3 h-3 rounded-full bg-success-500"></span>
          Net Pay{" "}
        </p>
        <p>
          {pay.currency} {pay.net.toLocaleString()}
        </p>
      </div>
    </div>
  );
};

const AnnualPayPie: FC<{ data: ChartData[] }> = (props) => {
  return (
    <div className="space-y-2 py-6">
      <ResponsiveContainer height={240}>
        <PieChart
          margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          // width={260}
          // height={260}
          // style={{ zIndex: 1, color: "#000000", position: "relative" }}
        >
          <Pie
            data={props.data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={100}
            fill="#000000"
            dataKey="value"
            style={{
              zIndex: -1,
              backgroundColor: "#000000",
              position: "relative",
            }}
          >
            {props.data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color}
                stroke={entry.color}
                style={{
                  zIndex: -1,
                  backgroundColor: "#000000",
                  position: "relative",
                }}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
