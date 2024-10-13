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
  { category: "Exec Mgmt", Women: 186, Men: 80 },
  { category: "Senior Mgmt", Women: 305, Men: 200 },
  { category: "Middle Mgmt", Women: 237, Men: 120 },
  { category: "Leads", Women: 93, Men: 190 },
  { category: "Officer", Women: 13, Men: 190 },
];

/** Analytics card showing the Demographics Age Distribution */
export const RDemGender: FC<{ config: ReportConfig }> = ({ config }) => {
  return (
    <CustomCardWithTitle
      title={config.title}
      copy={config.category}
      span={CARD_SPAN.one}
      button={
        <MenuDropdown
          items={[
            { id: "", label: "Add to Favorites", function: () => {} },
            { id: "", label: "View More Details", function: () => {} },
          ]}
        />
      }
    >
      <div className="flex-col pt-2 lg:h-[300px] content-center">
        <CardContent>
          <ChartContainer
            config={{}}
            className="max-h-[250px] 2xl:aspect-video aspect-square w-full"
          >
            <BarChart
              accessibilityLayer
              data={chartData}
              layout="vertical"
              margin={{ left: 0, right: 16 }}
            >
              <CartesianGrid
                vertical={false}
                horizontal={false}
              />
              <YAxis
                dataKey="category"
                type="category"
                tickLine={false}
                tickMargin={10}
                startOffset={"expand"}
                axisLine={false}
                tickFormatter={(value) => value}
              />
              <XAxis
                type="number"
                hide
              />
              {/* <ChartTooltip content={<ChartTooltipContent hideLabel />} /> */}
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              {/* <ChartLegend content={<ChartLegendContent />} /> */}
              {/* <Bar
                dataKey="Women"
                layout="vertical"
                stackId="a"
                fill="#2a9d90"
                radius={[0, 0, 4, 4]}
                
              /> */}
              <Bar
                dataKey="Women"
                layout="vertical"
                // stackId="a"
                fill="#2a9d90"
                radius={4}
              >
                <LabelList
                  dataKey="Women"
                  position="right"
                  offset={1}
                  className="fill-foreground"
                  fontSize={12}
                />
                {/* <LabelList
                  dataKey="category"
                  position="insideLeft"
                  offset={5}
                  className="fill-foreground"
                  fontSize={12}
                /> */}
                {/* <LabelList
                  dataKey="Women"
                  position="right"
                  offset={8}
                  className="fill-foreground"
                  fontSize={12}
                /> */}
              </Bar>
              <Bar
                dataKey="Men"
                // stackId="a"
                fill="#fb923c"
                radius={4}
              >
                <LabelList
                  dataKey="Men"
                  position="right"
                  offset={5}
                  className="fill-foreground"
                  fontSize={12}
                />
              </Bar>
            </BarChart>
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
      </div>
    </CustomCardWithTitle>
  );
};
