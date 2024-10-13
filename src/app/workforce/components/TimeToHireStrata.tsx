"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import {
  CustomCardWithTitle,
  BodyCopy,
  CARD_SPAN,
  ChartLegendItem,
  MenuDropdown,
  TextLabel,
} from "@/components";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { CardContent } from "@/components/ui/card";
import {
  CHART_COLOR_SCHEME,
  createChartData,
} from "@/lib/utilities/ChartStyles";
import { FC } from "react";
import { ReportConfig } from "@/models/ReportWidgetConfig";

const chartData = [
  { category: "Exec Mgmt", Days: 26, fill: "#2a9d90" },
  { category: "Senior Mgmt", Days: 21, fill: "#2a9d90" },
  { category: "Middle Mgmt", Days: 14, fill: "#2a9d90" },
  { category: "Leads", Days: 14, fill: "#2a9d90" },
  { category: "Officer", Days: 8, fill: "#2a9d90" },
];

const chartConfig = {
  exec: {
    label: "Exec Mgmt",
  },
  senior: {
    label: "Senior Mgmt",
  },
  middle: {
    label: "Middle Mgmt",
  },
  leads: {
    label: "Leads",
  },
  officer: {
    label: "Officer",
  },
} satisfies ChartConfig;

/** Analytics card showing the Time it takes to hire per Grade Strata */
export const TimeToHireStrata: FC<{ config: ReportConfig }> = ({ config }) => {
  return (
    <CustomCardWithTitle
      title={config.title}
      copy={config.category}
      span={CARD_SPAN.one}
      button={
        <TextLabel
          label="Ave. Across Grades"
          copy={"15 Days"}
          textAlign="text-right"
        />
      }
    >
      <div className="flex-col pt-2 lg:h-[300px] content-center">
        <CardContent>
          <ChartContainer
            config={{}}
            className="max-h-[300px] 2xl:aspect-video aspect-square w-full"
          >
            <BarChart
              accessibilityLayer
              data={chartData}
              layout="horizontal"
              margin={{ left: 0, right: 16 }}
            >
              <CartesianGrid
                vertical={false}
                horizontal={false}
              />
              <XAxis
                dataKey="category"
                type="category"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value}
                // tickFormatter={(value) => value}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />

              <Bar
                dataKey="Days"
                radius={4}
              >
                <LabelList
                  dataKey="Days"
                  position="top"
                  offset={1}
                  className="fill-foreground "
                  fontSize={12}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
      </div>
    </CustomCardWithTitle>
  );
};
