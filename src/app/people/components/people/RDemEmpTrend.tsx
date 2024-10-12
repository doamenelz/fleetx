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
import { ReportConfig } from "@/models/ReportWidgetConfig";
const chartData = [
  { category: "January", Women: 186, Men: 80 },
  { category: "February", Women: 305, Men: 200 },
  { category: "March", Women: 237, Men: 120 },
  { category: "April", Women: 73, Men: 190 },
  { category: "May", Women: 209, Men: 130 },
  { category: "June", Women: 214, Men: 140 },
  { category: "July", Women: 214, Men: 140 },
  { category: "August", Women: 214, Men: 140 },
  { category: "September", Women: 214, Men: 140 },
  { category: "October", Women: 260, Men: 140 },
  { category: "November", Women: 260, Men: 110 },
  { category: "December", Women: 260, Men: 105 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export const RDemEmpTrend: FC<{ span?: CARD_SPAN; config: ReportConfig }> = ({
  span,
  config,
}) => {
  return (
    <AnalyticsCard
      title={config.title}
      copy={config.category}
      span={span ?? CARD_SPAN.one}
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
        <ChartContainer
          config={{}}
          className="max-h-[250px] w-full"
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
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent />}
            />
            <Line
              dataKey="Women"
              type="monotone"
              stroke="#2a9d90"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="Men"
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
        <ChartLegendItem
          name={"Women"}
          value={""}
          category=""
          fill="#2a9d90"
        />
        <ChartLegendItem
          name={"Men"}
          value={""}
          category=""
          fill="#fb923c"
        />
      </div>
    </AnalyticsCard>
  );
};
