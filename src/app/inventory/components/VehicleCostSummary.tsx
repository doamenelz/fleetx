"use client";

import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts";

import { CardContent } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  CARD_SPAN,
  CardWithSectionHeader,
  Lbl,
  TextLabel,
  Spinner,
} from "@/components";
import { FC, useContext, useEffect, useState } from "react";
import { Vehicle } from "@/models";
import clsx from "clsx";
import { getCompanyProfile } from "@/models/Shared/Configs";
import { RootContext } from "@/context/RootContext";
import { CompanyConfiguration } from "@/models/Shared/CompanyConfig";
import {
  API_HEADERS,
  APICompletion,
  apiHandler,
} from "@/lib/utilities/apiHelper";
//TODO: Show Error
export const CostSummaryCard: FC<{
  span: CARD_SPAN;
  vehicle: Vehicle;
  title: string;
  copy?: string;
}> = ({ span, vehicle, title, copy }) => {
  const [companyConfiguration, setCompanyConfig] = useState<
    CompanyConfiguration | undefined
  >();
  const rootContext = useContext(RootContext);
  const [isLoading, setIsloading] = useState(true);
  const [apiResponse, setApiResponse] = useState<APICompletion>();

  useEffect(() => {
    getChart();
  }, []);

  const getChart = async () => {
    const config = getCompanyProfile(rootContext.envVar.baseURL);

    if (config) {
      setCompanyConfig(config as CompanyConfiguration);
      const api = await apiHandler({
        url: `${rootContext.envVar.baseURL}/expenses/timeseries?vehicleId=${vehicle.id}&addResults=true`,
        method: "GET",
        // params: { createdBy: rootContext.store?.user?.id },
        headers: API_HEADERS.baseHeaders,
      });

      console.log("Calling GetChart", api);
      setApiResponse(api);
      setIsloading(false);
    } else {
      setApiResponse({
        success: false,
        data: null,
        errorMessage: "Something went wrong",
        status: 500,
      });
      setIsloading(false);
    }
  };
  return (
    <CardWithSectionHeader
      title={title}
      copy={copy}
      span={span}
    >
      <div className="grid grid-cols-3 py-4">
        {isLoading && (
          <div className="mx-auto w-full col-span-full py-6">
            {/* <CopyLoader /> */}
            <Spinner label="Getting chart...." />
          </div>
        )}
        {!isLoading && apiResponse?.success && (
          <>
            <div className="col-span-2">
              <CardContent>
                <ChartContainer
                  config={{}}
                  className="max-h-[350px] w-full pt-24"
                >
                  <LineChart
                    accessibilityLayer
                    data={apiResponse.data.results.data}
                    margin={{
                      left: 12,
                      right: 12,
                    }}
                  >
                    <CartesianGrid
                      vertical={true}
                      horizontal={false}
                    />
                    <XAxis
                      dataKey="category"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      tickFormatter={(value) => value.slice(0, 3)}
                    />
                    <Line
                      dataKey="Fuel"
                      type="monotone"
                      stroke="#F98513"
                      strokeWidth={2}
                      dot={false}
                    />
                    <Line
                      dataKey="Service"
                      type="monotone"
                      stroke="#301885"
                      strokeWidth={2}
                      dot={false}
                    />
                    <Line
                      dataKey="Others"
                      type="monotone"
                      stroke="#7A9CEF"
                      strokeWidth={2}
                      dot={false}
                    />
                    <LabelList
                      position="top"
                      offset={12}
                      className="fill-foreground"
                      fontSize={12}
                    />
                    <ChartTooltip
                      cursor={false}
                      content={
                        <ChartTooltipContent
                          hideLabel
                          className={"w-[250px]"}
                          formatter={(value, name, item, index) => (
                            <div className="w-full">
                              <div className="flex">
                                <div className="flex items-center gap-2">
                                  <div
                                    className={clsx(
                                      "h-2.5 w-2.5 shrink-0 rounded-[2px]",
                                      name === "Fuel"
                                        ? "bg-[#F98513]"
                                        : name === "Service"
                                        ? "bg-[#301885]"
                                        : "bg-[#7A9CEF]"
                                    )}
                                  />
                                  {name}
                                </div>
                                <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                                  <span className="font-normal text-muted-foreground">
                                    {companyConfiguration?.currency.code}
                                  </span>
                                  {/* {new Intl.NumberFormat().format(value)} */}
                                  {value}
                                </div>
                              </div>

                              {index === 2 && (
                                <div className="mt-1.5  flex basis-full items-center border-t pt-1.5 text-xs font-medium text-foreground">
                                  Total
                                  <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                                    <span className="font-normal text-muted-foreground">
                                      {companyConfiguration?.currency.code}
                                    </span>
                                    {new Intl.NumberFormat().format(
                                      item.payload.Others +
                                        item.payload.Fuel +
                                        item.payload.Service
                                    )}
                                    {/* {item.payload.NHF +
                              item.payload.Pension +
                              item.payload.Others} */}
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        />
                      }
                    />
                  </LineChart>
                </ChartContainer>
              </CardContent>
            </div>
            <div className=" flex flex-col space-y-6 p-4 rounded-sm justify-center">
              <div className="">
                <Lbl label="Total Cost(s)" />
                <p className="text-3xl font-medium font-mono">
                  {companyConfiguration?.currency.code}
                  {apiResponse.data.results.totalCost}
                </p>
              </div>

              <div className=" content-center space-y-4 border-t pt-4">
                <div className="border-l-4 pl-2 border-brand-orangeHabanero">
                  <TextLabel
                    label="Fuel"
                    copy={`${companyConfiguration?.currency.code}${apiResponse.data.results.totalFuel}`}
                    copyStyle="font-mono"
                  />
                </div>
                <div className="border-l-4 pl-2 border-brand-indiGlow">
                  <TextLabel
                    label="Service & Repairs"
                    copy={`${companyConfiguration?.currency.code}${apiResponse.data.results.totalService}`}
                    copyStyle="font-mono"
                  />
                </div>
                <div className="border-l-4 pl-2 border-brand-vistaBlue">
                  <TextLabel
                    label="Other Costs (Expenses)"
                    copy={`${companyConfiguration?.currency.code}${apiResponse.data.results.totalOthers}`}
                    copyStyle="font-mono"
                  />
                </div>
              </div>
            </div>
          </>
        )}

        {!isLoading && !apiResponse?.success && (
          <>
            <p>{apiResponse?.errorMessage}</p>
          </>
        )}
      </div>
    </CardWithSectionHeader>
  );
};
