"use client";

import {
  BreadCrumb,
  Button,
  BUTTON_SKIN,
  CopyLoader,
  EmptyTable,
  ICON_POSITION,
  Lbl,
  PageContainer,
  PlainCard,
  SCREEN_WIDTH,
  SearchField,
  SectionHeader,
  Spinner,
} from "@/components";
import { FC, useContext, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Redo, TriangleAlert } from "lucide-react";
import { VehicleExpenseList } from "@/app/inventory/components/VehicleExpenseList";
import clsx from "clsx";
import {
  API_HEADERS,
  APICompletion,
  apiHandler,
} from "@/lib/utilities/apiHelper";
import { RootContext } from "@/context/RootContext";
import { usePathname } from "next/navigation";
import { getCompanyProfile } from "@/models/Shared/Configs";
import { CompanyConfiguration } from "@/models/Shared/CompanyConfig";

export default function Page() {
  const [isLoading, setIsLoading] = useState(true);
  const pathName = usePathname();
  const rootContext = useContext(RootContext);
  const [currency, setCurrency] = useState<string>("₹");
  const [financeCompletion, setFinanceCompletion] = useState<APICompletion>();
  // const [expensesCompletion, setExpensesCompletion] = useState<APICompletion>();
  const breadcrumbs: BreadCrumb[] = [
    {
      name: "Service",
      href: "",
      id: "03",
      type: "highlighted",
    },
    {
      name: "Home",
      href: "/home",
      id: "01",
      type: "main",
    },
    {
      name: "My Vehicles",
      href: "",
      type: "base",
      id: "02",
    },
  ];

  const getExpenseSummary = async () => {
    const config = await getCompanyProfile(rootContext.envVar.baseURL);
    if (config as CompanyConfiguration) {
      setCurrency(config?.currency.code ?? "₹");
      const api = await apiHandler({
        url: `${rootContext.envVar.baseURL}/timeseries/expenses?vehicleId=${
          pathName.split("/")[3]
        }&addResults=false`,
        method: "GET",
        headers: API_HEADERS.baseHeaders,
      });

      setFinanceCompletion(api);
      setIsLoading(false);
    } else {
      setFinanceCompletion({
        success: false,
        data: null,
        errorMessage: "Something went wrong",
        status: 500,
      });
      setIsLoading(false);
    }
  };

  // const getExpenses = async () => {
  //   const api = await apiHandler({
  //     url: `${rootContext.envVar.baseURL}/expenses?vehicleId=${
  //       pathName.split("/")[3]
  //     }`,
  //     method: "GET",
  //     headers: API_HEADERS.baseHeaders,
  //   });

  //   console.log("API Response: ", api);
  //   setExpensesCompletion(api);
  // };
  useEffect(() => {
    getExpenseSummary();
    // getExpenses();
  }, []);
  return (
    <PageContainer
      documentTitle={`My Vehicles - Finance`}
      fullWidth={SCREEN_WIDTH.full}
      isLoading={false}
      hasPadding={true}
      showHeader={false}
      breadCrumbs={breadcrumbs.sort((a, b) => Number(a.id) - Number(b.id))}
    >
      {isLoading && (
        <div className="mx-auto w-full col-span-full py-6">
          <Spinner label="Getting Expenses...." />
        </div>
      )}
      {!isLoading && financeCompletion?.success && (
        <div className="space-y-4 pb-4">
          <SummaryGrid
            total={`${currency}${financeCompletion?.data.results.totalCost}`}
            fuel={`${currency}${financeCompletion?.data.results.totalFuel}`}
            service={`${currency}${financeCompletion?.data.results.totalService}`}
            others={`${currency}${financeCompletion?.data.results.totalOthers}`}
          />
          <PlainCard>
            <VehicleExpenseList vehicleId={pathName.split("/")[3]} />
          </PlainCard>
          {/* {expensesCompletion === undefined && (
            <>
              <CopyLoader />
            </>
          )}
          {expensesCompletion?.success && (
            <PlainCard>
              <VehicleExpenseList data={expensesCompletion?.data.results} />
            </PlainCard>
          )}
          {expensesCompletion?.success === false && (
            <EmptyTable
              title="Something went wrong"
              copy={expensesCompletion?.errorMessage ?? "Unable to fetch data."}
              image={
                <div>
                  <TriangleAlert className="size-8 mx-auto text-error-400" />
                </div>
              }
              action={
                <Button
                  onClick={getExpenseSummary}
                  label="Retry"
                  skin={BUTTON_SKIN.secondary}
                  icon={{
                    asset: <Redo className="size-3" />,
                    position: ICON_POSITION.trailing,
                  }}
                />
              }
            />
          )} */}
        </div>
      )}
      {!isLoading && !financeCompletion?.success && (
        <EmptyTable
          title="Something went wrong"
          copy={financeCompletion?.errorMessage ?? "Unable to fetch data."}
          image={
            <div>
              <TriangleAlert className="size-8 mx-auto text-error-400" />
            </div>
          }
          action={
            <Button
              onClick={getExpenseSummary}
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
    </PageContainer>
  );
}

const SummaryGrid: FC<{
  total: string;
  fuel: string;
  service: string;
  others: string;
}> = ({ total, fuel, service, others }) => {
  return (
    <dl className="mx-auto my-2 lg:flex grid grid-cols-1 gap-px divide-x sm:grid-cols-2 justify-evenly border rounded-md border-l-4 border-r-4">
      <GridCell
        label="Total"
        value={total}
      />
      <GridCell
        label="Fuel"
        value={fuel}
      />
      <GridCell
        label="Service"
        value={service}
      />
      <GridCell
        label="Others"
        value={others}
      />
    </dl>
  );
};

const GridCell: FC<{ label: string; value: string }> = ({ label, value }) => {
  return (
    <div className="flex flex-wrap w-full items-baseline justify-between gap-x-4  bg-white px-4 py-4 sm:px-6 xl:px-8">
      <dt className="text-xs font-medium leading-6 text-gray-500">{label}</dt>

      <dd
        className={clsx(
          "w-full flex-none text-3xl leading-10 tracking-tight font-mono text-slate-700",
          label === "Total" ? "font-medium" : ""
        )}
      >
        {value}
      </dd>
    </div>
  );
};
