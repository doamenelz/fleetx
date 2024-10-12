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
} from "@/components";
import { FC } from "react";
const chartData = [
  { category: "January", Net: 186, Deductions: 80, SpecialPayments: 100 },
  { category: "February", Net: 305, Deductions: 200, SpecialPayments: 100 },
  { category: "March", Net: 237, Deductions: 120, SpecialPayments: 100 },
  { category: "April", Net: 73, Deductions: 190, SpecialPayments: 100 },
  { category: "May", Net: 209, Deductions: 130, SpecialPayments: 100 },
  { category: "June", Net: 214, Deductions: 140, SpecialPayments: 100 },
  { category: "July", Net: 214, Deductions: 140, SpecialPayments: 100 },
  { category: "August", Net: 214, Deductions: 140, SpecialPayments: 100 },
  { category: "September", Net: 214, Deductions: 140, SpecialPayments: 100 },
  { category: "October", Net: 260, Deductions: 140, SpecialPayments: 100 },
  { category: "November", Net: 260, Deductions: 110, SpecialPayments: 100 },
  { category: "December", Net: 260, Deductions: 105, SpecialPayments: 100 },
];

// const chartConfig = {
//   desktop: {
//     label: "Desktop",
//     color: "hsl(var(--chart-1))",
//   },
//   mobile: {
//     label: "Mobile",
//     color: "hsl(var(--chart-2))",
//   },
// } satisfies ChartConfig;

export const RCompTrend: FC<{ span: CARD_SPAN }> = ({ span }) => {
  return (
    <AnalyticsCard
      title="Monthly Payroll"
      copy="Compensation"
      span={span}
      button={
        <ButtonGroup type={BUTTON_GROUP.text} />
        // <MenuDropdown
        //   items={[
        //     { id: "", label: "Add to Favorites", function: () => {} },
        //     { id: "", label: "View More Details", function: () => {} },
        //   ]}
        // />
      }
    >
      <CardContent>
        <ChartContainer config={{}} className="max-h-[350px] w-full">
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={true} horizontal={false} />
            <XAxis
              dataKey="category"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="Net"
              type="monotone"
              stroke="#2a9d90"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="Deductions"
              type="monotone"
              stroke="#fb923c"
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
        <ChartLegendItem name={"Net"} value={""} category="" fill="#2a9d90" />
        <ChartLegendItem
          name={"Deductions"}
          value={""}
          category=""
          fill="#fb923c"
        />
      </div>
    </AnalyticsCard>
  );
};
