"use client";

import {
  Accordion,
  BUTTON_SKIN,
  BodyCopy,
  Button,
  CardWithSectionHeader,
  GRID_TYPE,
  GridLayout,
  Lbl,
  ModalBackdrop,
  SectionHeader,
  SlideOutWrapper,
  TextLabel,
} from "@/components";
import { FC, useState } from "react";
import { Pay, samplePay } from "../models/Pay";
import { sampleEmployee } from "@/models";
import { PaySlipPieChart } from "./PayslipChart";
import { samplePieChartData } from "../models/ChartData";
import { PayslipBreakdownTable } from "./PayslipBreakdown";
import { ICON_SIZES, Icon } from "@/components/Icons";
import { IconList } from "@/assets/IconList";
import ReactDOM from "react-dom";

export const EarningsTable = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const showModalHandler = () => {
    setShowModal(false);
  };
  const [selectedPay, setSelectedPay] = useState<Pay>();
  return (
    <>
      <CardWithSectionHeader
        title="Payslips"
        copy="Your Payslips for the current period"
      >
        <ul className="divide-y my-2">
          {samplePay.slice(0, isExpanded ? samplePay.length : 3).map((pay) => (
            <li
              key={pay.id}
              onClick={() => {
                setSelectedPay(pay);
                setShowModal(true);
              }}
            >
              <EarningsCell data={pay} />
            </li>
          ))}
        </ul>
        {samplePay.length > 3 && (
          <Button
            onClick={() => setIsExpanded(!isExpanded)}
            label={
              isExpanded ? "View Less" : `View More (${samplePay.length - 3})`
            }
            fillWidth={true}
            skin={BUTTON_SKIN.secondary}
          />
        )}
      </CardWithSectionHeader>
      <ModalBackdrop selector="modal">
        <SlideOutWrapper
          closeControl={showModalHandler}
          openControl={showModal}
          size="lg"
          //   showDismissButton={window.innerWidth > 1023 ? false : true}
        >
          <div className="px-4 pt-4 pb-8">
            <SectionHeader
              title={selectedPay?.title ?? ""}
              button={
                <button className="text-indigo-600 hover:text-slate-700">
                  <Icon icon={IconList.download} size={ICON_SIZES.md} />
                </button>
              }
            />
            <Accordion
              id="pay-summary"
              title="Pay Summary"
              defaultOpen={true}
              style="section"
              body={
                <PaySlipPieChart data={samplePieChartData} pay={samplePay[0]} />
              }
            />
            <Accordion
              id="pay-details"
              title="Pay Breakdown"
              defaultOpen={false}
              style="section"
              body={<PayslipBreakdownTable pay={samplePay[0]} />}
            />

            <Accordion
              id="pay-breakdown"
              title="Employee and Payment Details"
              defaultOpen={false}
              style="section"
              body={
                <div className="space-y-4 p-4 rounded border-c-mid border m-2">
                  <GridLayout type={GRID_TYPE.twoCol}>
                    <TextLabel
                      label="Payment Date"
                      copy={selectedPay?.paymentDate}
                    />
                    <TextLabel
                      label="Pay Period"
                      copy={"25 Apr, 2021 - 24 May, 2021"}
                    />
                    <TextLabel
                      label="Grade"
                      copy={sampleEmployee.jobInformation?.grade ?? "-"}
                    />

                    <TextLabel
                      label="Bank Name"
                      copy={selectedPay?.bankName ?? "-"}
                    />
                    <TextLabel
                      label="Bank Account #"
                      copy={selectedPay?.bankAccount ?? "-"}
                    />
                    <TextLabel
                      label="Pension Provider"
                      copy={selectedPay?.pensionProvider ?? "-"}
                    />
                    <TextLabel
                      label="Pension ID #"
                      copy={selectedPay?.pensionAccount ?? "-"}
                    />
                    <TextLabel
                      label="Tax ID #"
                      copy={selectedPay?.taxNumber ?? "-"}
                    />
                    <TextLabel
                      label="NHF ID #"
                      copy={selectedPay?.nhfNumber ?? "-"}
                    />
                  </GridLayout>
                </div>
              }
            />
          </div>
        </SlideOutWrapper>
      </ModalBackdrop>
    </>
  );
};

const EarningsCell: FC<{ data: Pay }> = ({ data }) => {
  return (
    <>
      <button className="p-3 space-y-4 w-full hover:bg-slate-50">
        <div className="flex justify-between items-center">
          <p className=" text-xs md:text-sm tracking-tight font-medium text-primary-700">
            {data.title}
          </p>
          <Lbl label={data.paymentDate} />
        </div>

        <div className="flex justify-between items-baseline gap-1">
          <div>
            <p className="text-sm text-left font-semibold text-slate-600">
              {data.currency} {data.net.toLocaleString()}
            </p>
            <p className="text-xs flex items-center gap-1 text-left font-light text-gray-700">
              <span className="rounded-md bg-green-600 h-2 w-2"></span>Net Pay
            </p>
          </div>
          <div className="hidden md:block text-left">
            <p className="text-sm font-medium text-gray-700">
              {data.currency} {data.deduction.toLocaleString()}
            </p>
            <p className="text-xs flex items-center gap-1 font-light text-gray-700">
              <span className="rounded-md bg-warning-400 h-2 w-2"></span> Total
              Deductions
            </p>
          </div>
          <div className="text-right hidden md:block">
            <p className="text-sm text-gray-700">
              {data.currency} {data.total.toLocaleString()}
            </p>
            <p className="text-xs font-light text-gray-700">Allowances</p>
          </div>
        </div>
      </button>
    </>
  );
};

export const SummaryHeader: FC<{
  label: string;
  copy: string;
  type?: "deduction" | "net" | "tax" | undefined;
}> = (props) => {
  let styleClass = "";
  switch (props.type) {
    case "deduction":
      styleClass = "bg-gradient-to-r from-warning-400 to-warning-600";

      break;
    case "tax":
      styleClass = "bg-gradient-to-r from-error-400 to-error-600";

      break;
    case "net":
      styleClass = "bg-gradient-to-r from-success-400 to-success-600";

      break;

    default:
      break;
  }

  return (
    <div className="flex items-center gap-2 p-4 space-y-0 text-left">
      {props.type !== undefined && (
        <div className={`${styleClass} w-2 h-8 rounded-sm`}></div>
      )}

      <div>
        <Lbl label={props.label} />
        <BodyCopy text={props.copy} style="font-semibold" />
      </div>
    </div>
  );
};
