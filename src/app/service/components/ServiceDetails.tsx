"use client";

import {
  Accordion,
  AuditTimeline,
  LIST_TABLE_TYPE,
  ListTable,
  ListTableData,
  SectionHeader,
  TextLabel,
  timelineActivities,
} from "@/components";
import {
  sampleServiceReminders,
  ServiceReminders,
} from "@/models/ServiceAndRecalls/Service";
import { FC, useEffect, useState } from "react";

export const ServiceDetails: FC<{ serviceId: string }> = ({ serviceId }) => {
  const [serviceDetails, setServiceDetails] = useState<ServiceReminders>();
  useEffect(() => {
    const _service = sampleServiceReminders.find(
      (service) => service.id === serviceId
    );
    setServiceDetails(_service);
  }, []);

  const parseDetailsView = () => {
    var _data: ListTableData[] = [];
    const base = [
      {
        id: "",
        key: "Service Name",
        value: serviceDetails?.programName,
      },
      {
        id: "",
        key: "Scheduled Data",
        value: serviceDetails?.scheduledDate,
      },
      {
        id: "",
        key: "Status",
        value: serviceDetails?.status,
      },
      {
        id: "",
        key: "Completed Date",
        value: serviceDetails?.repairEndDate,
      },
      {
        id: "",
        key: "Mileage",
        value: serviceDetails?.odometer,
      },
      {
        id: "",
        key: "Work Order #",
        value: serviceDetails?.workOrderId,
      },
    ];
    base.map((item) => _data.push(item));
    serviceDetails?.serviceDetails?.map((item) => _data.push(item));

    return _data;
  };

  return (
    <div className="px-4 py-2">
      <SectionHeader title={`Service # - ${serviceDetails?.id}`} />
      <Accordion
        title={"Service Overview"}
        copy="Last Updated: 25 July, 2024"
        id=""
        style="section"
        defaultOpen={true}
        body={<ListTable data={parseDetailsView()} />}
      />

      <Accordion
        title={"Work Items"}
        id=""
        style="section"
        body={
          <>
            <ListTable
              type={LIST_TABLE_TYPE.invoice}
              data={
                serviceDetails?.workItems?.items.map((issue) => ({
                  id: issue.id,
                  key: `${issue.key}`,
                  //   value: `${issue.qty}`,
                  valueTwo: `${serviceDetails.workItems?.currency}${issue.value}`,
                })) ?? []
              }
            />
            <div className="flex justify-between px-4 py-3 border-t border-slate-500 mt-1 text-xs leading-6 text-slate-700  sm:mt-0">
              <p className="font-medium text-slate-900">Sub-Total</p>
              <p className="font-mono text-sm">
                {serviceDetails?.workItems?.currency}
                {serviceDetails?.workItems?.subtotal}
              </p>
            </div>
            <div className="flex justify-between px-4 py-3 border-t mt-1 text-xs leading-6 text-slate-700  sm:mt-0">
              <p className=" text-slate-900">Taxes</p>
              <p className="font-mono">
                {serviceDetails?.workItems?.currency}
                {serviceDetails?.workItems?.taxes}
              </p>
            </div>
            <div className="flex justify-between p-4 border-t-2 border-b-2 border-slate-300 mt-1 text-xs leading-6 text-slate-700  sm:mt-0">
              <p className="text-slate-900 font-semibold">TOTAL</p>
              <p className="font-mono text-sm font-semibold">
                {serviceDetails?.workItems?.currency}
                {serviceDetails?.workItems?.total}
              </p>
            </div>
          </>
        }
      />

      <Accordion
        title={"Resolved Issues"}
        id=""
        style="section"
        body={
          <ListTable
            data={
              serviceDetails?.resolvedIssues?.map((issue) => ({
                id: issue.id,
                key: issue.summary,
                value: issue.additionalNotes,
              })) ?? []
            }
          />
        }
      />
      <Accordion
        title={"History"}
        id=""
        style="section"
        body={
          <div className="p-4">
            <AuditTimeline data={timelineActivities} />
            <>Submitted / Requested - Approved - Serviced - Completed</>
          </div>
        }
      />
    </div>
  );
};
