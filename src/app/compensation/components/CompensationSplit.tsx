"use client";

import { TrendingUp } from "lucide-react";
import {
  CartesianGrid,
  LabelList,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  AnalyticsCard,
  BUTTON_GROUP,
  ButtonGroup,
  CARD_SPAN,
  ChartLegendItem,
  MenuDropdown,
  TextLabel,
} from "@/components";
import { FC } from "react";
import { classNames } from "@/lib/utilities/helperFunctions";
import { ReportConfig } from "@/models/ReportWidgetConfig";
const chartData = [
  { category: "January", FTE: 186000, PartTime: 80000, Contract: 110000 },
  { category: "February", FTE: 305000, PartTime: 200000, Contract: 100000 },
  { category: "March", FTE: 237000, PartTime: 120000, Contract: 100000 },
  { category: "April", FTE: 73000, PartTime: 190000, Contract: 150000 },
  { category: "May", FTE: 209000, PartTime: 130000, Contract: 109000 },
  { category: "June", FTE: 214000, PartTime: 140000, Contract: 190000 },
  { category: "July", FTE: 214000, PartTime: 140000, Contract: 100000 },
  { category: "August", FTE: 214000, PartTime: 140000, Contract: 110000 },
];

export const RCompSplit: FC<{ span?: CARD_SPAN; config: ReportConfig }> = ({
  span,
  config,
}) => {
  return (
    <AnalyticsCard
      title={config.title}
      copy={config.category}
      span={span ?? CARD_SPAN.one}
      button={
        <TextLabel
          label="Average Payroll per month"
          copy={"NGN 150,579.55"}
        />
      }
    >
      <CardContent>
        <ChartContainer
          config={{}}
          className="max-h-[350px] w-full"
        >
          <LineChart
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
              tickFormatter={(value: string) => value.slice(0, 3)}
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
                              name === "FTE"
                                ? "bg-[#2a9d90]"
                                : name === "PartTime"
                                ? "bg-[#fb923c]"
                                : "bg-[#1A2E44]"
                            )}
                          />
                          {name}
                        </div>
                        <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                          <span className="font-normal text-muted-foreground">
                            NGN
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
                              NGN
                            </span>
                            {new Intl.NumberFormat().format(
                              item.payload.FTE +
                                item.payload.PartTime +
                                item.payload.Contract
                            )}
                            {/* {item.payload.FTE +
                              item.payload.PartTime +
                              item.payload.Contract} */}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                />
              }
            />
            <Line
              dataKey="FTE"
              type="linear"
              stroke="#2a9d90"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="PartTime"
              type="linear"
              stroke="#fb923c"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="Contract"
              type="linear"
              stroke="#1A2E44"
              strokeWidth={2}
              dot={false}
            />
            <LabelList
              position="top"
              offset={12}
              className="fill-foreground"
              fontSize={12}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <div className="flex gap-4 justify-center">
        <ChartLegendItem
          name={"Full Time"}
          value={""}
          category=""
          fill="#2a9d90"
        />
        <ChartLegendItem
          name={"Part Time"}
          value={""}
          category=""
          fill="#fb923c"
        />
        <ChartLegendItem
          name={"Contract"}
          value={""}
          category=""
          fill="#1A2E44"
        />
      </div>
    </AnalyticsCard>
  );
};
