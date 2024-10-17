"use client";

import { TrendingUp } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  LabelList,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";

import { CardContent } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  CustomCardWithTitle,
  BUTTON_GROUP,
  ButtonGroup,
  CARD_SPAN,
  ChartLegendItem,
  MenuDropdown,
  CardWithSectionHeader,
  Lbl,
  TextLabel,
} from "@/components";
import { FC } from "react";
import { classNames } from "@/lib/utilities/helperFunctions";
import { ReportConfig } from "@/models/ReportWidgetConfig";
import { Vehicle } from "@/models";
const chartData = [
  { category: "January", Fuel: 300.67, Mileage: 1600 },
  { category: "February", Fuel: 435.44, Mileage: 2100 },
  { category: "March", Fuel: 123, Mileage: 300 },
  { category: "April", Fuel: 453, Mileage: 1985 },
  { category: "May", Fuel: 500, Mileage: 2700 },
  { category: "June", Fuel: 120, Mileage: 300 },
  { category: "July", Fuel: 800, Mileage: 3400 },
  { category: "August", Fuel: 400, Mileage: 1800 },
  { category: "September", Fuel: 456, Mileage: 2000 },
  //   { category: "October", Fuel: 375, Mileage: 1850 },
  //   { category: "November", Fuel: 180, Mileage: 400 },
  //   { category: "December", Fuel: 240.55, Mileage: 525 },
];

export const VehicleFuelSummaryCard: FC<{
  vehicle: Vehicle;
}> = ({ vehicle }) => {
  return (
    <CardWithSectionHeader
      title={"Energy Utilization"}
      copy={"Year to Date"}
      span={CARD_SPAN.full}
      //   button={
      //     <TextLabel
      //       label="Total Spent"
      //       copy={"$1,658.34"}
      //     />
      //   }
    >
      <div className="grid grid-cols-3 py-4">
        <div className="col-span-2">
          <CardContent>
            <ChartContainer
              config={{}}
              className="max-h-[350px] w-full pt-24"
            >
              <AreaChart
                accessibilityLayer
                data={chartData}
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

                <LabelList
                  position="top"
                  offset={12}
                  className="fill-foreground"
                  fontSize={12}
                />
                <Area
                  dataKey="Mileage"
                  type="monotone"
                  fill="#7A9CEF"
                  fillOpacity={0.4}
                  stroke="#7A9CEF"
                  stackId="a"
                />
                <Area
                  dataKey="Fuel"
                  type="monotone"
                  fill="#F98513"
                  fillOpacity={0.4}
                  stroke="#F98513"
                  stackId="a"
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
                                className={classNames(
                                  "h-2.5 w-2.5 shrink-0 rounded-[2px]",
                                  name === "Fuel"
                                    ? "bg-[#F98513]"
                                    : "bg-[#7A9CEF]"
                                )}
                              />
                              {name}
                            </div>
                            <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                              {name === "Fuel" && (
                                <span className="font-normal text-muted-foreground">
                                  $
                                </span>
                              )}
                              {/* {new Intl.NumberFormat().format(value)} */}
                              {value}
                              {name === "Mileage" && (
                                <span className="font-normal text-muted-foreground">
                                  km
                                </span>
                              )}
                            </div>
                          </div>

                          {index === 2 && (
                            <div className="mt-1.5  flex basis-full items-center border-t pt-1.5 text-xs font-medium text-foreground">
                              Total
                              <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                                <span className="font-normal text-muted-foreground">
                                  $
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
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </div>
        <div className=" flex flex-col space-y-6 p-4 rounded-sm justify-center">
          <div className="space-y-4">
            <div className="border-l-4 pl-2 border-brand-orangeHabanero space-y-1">
              <TextLabel
                label="Total Fuel"
                copy={"3,650 litres"}
              />
              <p className="text-[10px]/[10px] text-slate-500">
                Company Ave: 8,450 litres
              </p>
            </div>
            <div className="border-l-4 pl-2 border-brand-vistaBlue space-y-1">
              <TextLabel
                label="Total Mileage"
                copy={"21,110.45 km"}
              />
              <p className="text-[10px]/[10px] text-slate-500">
                Company Ave: 34,523.89 km
              </p>
            </div>
          </div>

          <div className=" content-center space-y-4 border-t pt-4">
            <TextLabel
              label="Ave. Fuel Efficiency"
              copy={"8km / litre"}
            />
            <TextLabel
              label="Ave. Fuel Cost"
              copy={"$2.57 / km"}
            />
          </div>
        </div>
      </div>
    </CardWithSectionHeader>
  );
};
