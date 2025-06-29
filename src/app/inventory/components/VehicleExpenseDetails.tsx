import {
  API_HEADERS,
  APICompletion,
  apiHandler,
} from "@/lib/utilities/apiHelper";
import { Vehicle, VehicleExpenseEntry } from "@/models";
import { FC, useEffect, useState } from "react";
import {
  Accordion,
  AuditTimeline,
  AVATAR_TOOLTIP_TYPES,
  AvatarToolTip,
  Button,
  BUTTON_SKIN,
  CopyLoader,
  EmptyTable,
  ICON_POSITION,
  Lbl,
  ListTable,
  ListTableData,
  SectionHeader,
  StatusBadge,
  TextLabel,
  timelineActivities,
} from "@/components";
import { DATE_OPTIONS, formatDate } from "@/lib/utilities/dateHelpers";
import { getCompanyProfile } from "@/models/Shared/Configs";
import { CompanyConfiguration } from "@/models/Shared/CompanyConfig";
import { Redo, TriangleAlert } from "lucide-react";

//TODO: Parse Decisions
export const VehicleExpenseDetails: FC<{ expense: VehicleExpenseEntry }> = ({
  expense,
}) => {
  const [expenseDetails, setExpenseDetails] = useState<APICompletion>();
  const companyInfo = getCompanyProfile() as CompanyConfiguration;

  const getExpenseDetails = async () => {
    const api = await apiHandler({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/expenses/${expense.id}`,
      method: "GET",
      headers: API_HEADERS.baseHeaders,
    });

    setExpenseDetails(api);
  };
  useEffect(() => {
    getExpenseDetails();
  }, []);

  const parseDetailsView = (expense: VehicleExpenseEntry) => {
    var _data: ListTableData[] = [];
    const base = [
      {
        id: "name",
        key: "Name",
        value: expense.summary,
      },
      {
        id: "expenseDate",
        key: "Date",
        value: formatDate(
          new Date(expense.expenseDate ?? ""),
          DATE_OPTIONS.dMY
        ),
      },
      {
        id: "type",
        key: "Type",
        value: <p className="capitalize">{expense.type}</p>,
      },
      {
        id: "status",
        key: "Status",
        value: (
          <StatusBadge
            showDot
            style="text"
            label={expense.status}
          />
        ),
      },
      {
        id: "mileage",
        key: "Mileage",
        value: `${expense.odometer.value.toString()}${expense.odometer.unit.toString()}`,
      },
      {
        id: "additionalNotes",
        key: "Additional Notes",
        value: expense.notes,
      },
      {
        id: "createdBy",
        key: "Reported",
        value: (
          <>
            <AvatarToolTip
              type={AVATAR_TOOLTIP_TYPES.text}
              person={expense.log!.createdBy}
            />
            <p>
              {formatDate(
                new Date(expense.log?.createdAt ?? ""),
                DATE_OPTIONS.dMHrs
              )}
            </p>
          </>
        ),
      },
      //   {
      //     id: "createdAt",
      //     key: "Created At",
      //     value: formatDate(
      //       new Date(expense.log?.createdAt ?? ""),
      //       DATE_OPTIONS.dMHrs
      //     ),
      //   },
      {
        id: "updatedBy",
        key: "Last Updated",
        value: (
          <>
            <AvatarToolTip
              type={AVATAR_TOOLTIP_TYPES.text}
              person={expense.log!.lastUpdatedBy}
            />
            <p>
              {formatDate(
                new Date(expense.log?.lastUpdatedAt ?? ""),
                DATE_OPTIONS.dMHrs
              )}
            </p>
          </>
        ),
      },
    ];
    base.map((item) => _data.push(item));
    //   expenseDetails?.expenseDetails?.map((item) => _data.push(item));

    return _data;
  };

  return (
    <div className="px-4 py-2">
      <SectionHeader title={"Expense Details"} />
      <div className="p-4 mt-4 border rounded-md text-sm space-y-2 bg-gradient-to-r from-black via-brand-black to-brand-blueOblivion text-white">
        <Lbl label="Total Expense Amount" />
        <p className="text-3xl font-mono font-medium">
          {companyInfo.currency.code}
          {expense.status === "approved"
            ? expense.cost.approvedAmount
            : expense.cost.reportedAmount}
        </p>
      </div>
      {expenseDetails === undefined && <CopyLoader />}
      {expenseDetails?.success === true && (
        <Accordion
          title={"Expense Overview"}
          copy={`ID: ${expense.id}`}
          id=""
          style="section"
          defaultOpen={true}
          body={<ListTable data={parseDetailsView(expenseDetails?.data)} />}
        />
      )}

      {expenseDetails?.success === false && (
        <EmptyTable
          title="Something went wrong"
          copy={expenseDetails?.errorMessage ?? "Unable to fetch data."}
          image={
            <div>
              <TriangleAlert className="size-8 mx-auto text-error-400" />
            </div>
          }
          action={
            <Button
              onClick={getExpenseDetails}
              label="Retry"
              skin={BUTTON_SKIN.secondary}
              icon={{
                asset: <Redo className="size-3" />,
                position: ICON_POSITION.trailing,
              }}
            />
          }
        />
      )}

      {/* <Accordion
          title={"Work Items"}
          id=""
          style="section"
          body={
            <>
              <ListTable
                type={LIST_TABLE_TYPE.invoice}
                data={
                  expenseDetails?.workItems?.items.map((issue) => ({
                    id: issue.id,
                    key: `${issue.key}`,
                    //   value: `${issue.qty}`,
                    valueTwo: `${expenseDetails.workItems?.currency}${issue.value}`,
                  })) ?? []
                }
              />
              <div className="flex justify-between px-4 py-3 border-t border-slate-500 mt-1 text-xs leading-6 text-slate-700  sm:mt-0">
                <p className="font-medium text-slate-900">Sub-Total</p>
                <p className="font-mono text-sm">
                  {expenseDetails?.workItems?.currency}
                  {expenseDetails?.workItems?.subtotal}
                </p>
              </div>
              <div className="flex justify-between px-4 py-3 border-t mt-1 text-xs leading-6 text-slate-700  sm:mt-0">
                <p className=" text-slate-900">Taxes</p>
                <p className="font-mono">
                  {expenseDetails?.workItems?.currency}
                  {expenseDetails?.workItems?.taxes}
                </p>
              </div>
              <div className="flex justify-between p-4 border-t-2 border-b-2 border-slate-300 mt-1 text-xs leading-6 text-slate-700  sm:mt-0">
                <p className="text-slate-900 font-semibold">TOTAL</p>
                <p className="font-mono text-sm font-semibold">
                  {expenseDetails?.workItems?.currency}
                  {expenseDetails?.workItems?.total}
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
                expenseDetails?.resolvedIssues?.map((issue) => ({
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
        /> */}
    </div>
  );
};
