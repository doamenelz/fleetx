"use client";

import { TrendingUp } from "lucide-react";
import {
  CartesianGrid,
  LabelList,
  Line,
  LineChart,
  XAxis,
  YAxis,
  Area,
  AreaChart,
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
  CustomCardWithTitle,
  BodyCopy,
  BUTTON_GROUP,
  ButtonGroup,
  CARD_SPAN,
  ChartLegendItem,
  Lbl,
  MenuDropdown,
  TextLabel,
} from "@/components";
import { FC } from "react";
import { ReportConfig } from "@/models/ReportWidgetConfig";
const chartData = [
  { category: "January", Hires: 5, Exits: 10 },
  { category: "February", Hires: 0, Exits: 0 },
  { category: "March", Hires: 0, Exits: 1 },
  { category: "April", Hires: 0, Exits: 4 },
  { category: "May", Hires: 4, Exits: 0 },
  { category: "June", Hires: 1, Exits: 0 },
  { category: "July", Hires: 0, Exits: 0 },
  { category: "August", Hires: 0, Exits: 10 },
  { category: "September", Hires: 5, Exits: 2 },
  { category: "October", Hires: 15, Exits: 3 },
  { category: "November", Hires: 0, Exits: 4 },
  { category: "December", Hires: 0, Exits: 1 },
];

export const EmployeeHireSummaryCard: FC<{
  span: CARD_SPAN;
  config: ReportConfig;
}> = ({ span, config }) => {
  return (
    <CustomCardWithTitle
      title={config.title}
      copy={config.category}
      span={span}
    >
      <CardContent className="lg:grid flex flex-col-reverse lg:grid-cols-6 gap-2">
        <ChartContainer
          config={{}}
          className="max-h-[350px] w-full col-span-5"
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
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="Hires"
              type="monotone"
              fill="#2a9d90"
              fillOpacity={0.8}
              stroke="#2a9d90"
              //   stackId="a"
            />
            <Area
              dataKey="Exits"
              type="monotone"
              fill="#fb923c"
              fillOpacity={0.1}
              stroke="#fb923c"
              //   stackId="a"
            />
            {/* <Line
              dataKey="Men"
              type="monotone"
              stroke="#fb923c"
              strokeWidth={2}
              dot={false}
            /> */}
            <LabelList
              position="top"
              offset={12}
              className="fill-foreground"
              fontSize={12}
            />
          </AreaChart>
        </ChartContainer>
        <div className="bg-slate-25  space-y-2  flex flex-col p-4 rounded-sm justify-evenly">
          <div className="basis-1/5">
            <Lbl label="New Hires" />
            <p className="text-3xl font-medium">15</p>
          </div>
          <div className="basis-2/5 content-center border-t border-b">
            <Lbl label="Exited Employees" />
            <p className="text-3xl font-medium">35</p>
            <div className="flex justify-between pt-2">
              <Lbl label="1.3 years (Ave. Tenure)" />
              {/* <Lbl label="1.3 yrs" /> */}
            </div>
          </div>
          <div className="basis-2/5 content-center">
            <TextLabel
              label="Top Reason for Exit"
              copy={"Chasing new opportunities elsewhere"}
            />
          </div>
        </div>
      </CardContent>
    </CustomCardWithTitle>
  );
};
