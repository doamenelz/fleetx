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
  AnalyticsCard,
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
  { category: "Exec Mgmt", Years: 3.5 },
  { category: "Senior Mgmt", Years: 3.65 },
  { category: "Middle Mgmt", Years: 2.4 },
  { category: "Leads", Years: 2 },
  { category: "Officer", Years: 1.75 },
];

/** Analytics card showing the Demographics Age Distribution */
export const TimePerGradePromotion: FC<{ config: ReportConfig }> = ({
  config,
}) => {
  return (
    <AnalyticsCard
      title={config.title}
      copy={config.category}
      span={CARD_SPAN.one}
      button={
        <TextLabel
          label="Ave. Across Grades"
          copy={"2.66 years"}
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
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />

              <Bar
                dataKey="Years"
                fill="#2a9d90"
                radius={4}
              >
                <LabelList
                  dataKey="Years"
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
    </AnalyticsCard>
  );
};
