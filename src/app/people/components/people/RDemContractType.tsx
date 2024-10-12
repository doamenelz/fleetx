"use client";

import {
  AnalyticsCard,
  BodyCopy,
  CARD_SPAN,
  ChartLegendItem,
  MenuDropdown,
} from "@/components";
import { Pie, PieChart } from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { CardContent } from "@/components/ui/card";
import {
  CHART_COLOR_SCHEME,
  createChartData,
} from "@/lib/utilities/ChartStyles";
import { FC } from "react";
import { ReportConfig } from "@/models/ReportWidgetConfig";

const chartData = [
  { name: "Full Time", value: 200, fill: "#FFF" },
  { name: "Contract", value: 187, fill: "#FAFAFA" },
  { name: "Part Time", value: 173, fill: "var(--color-edge)" },
];

/** Analytics card showing the Demographics Age Distribution */
export const RDemContractType: FC<{ config: ReportConfig }> = ({ config }) => {
  const _chartData = createChartData(chartData, CHART_COLOR_SCHEME.default);
  return (
    <AnalyticsCard
      title={config.title}
      copy={config.category}
      span={CARD_SPAN.one}
      button={
        <div>
          <MenuDropdown
            items={[
              { id: "", label: "Add to Favorites", function: () => {} },
              { id: "", label: "View More Details", function: () => {} },
            ]}
          />
        </div>
      }
    >
      <div className="flex-col content-center">
        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={{}}
            className="mx-auto aspect-square max-h-[250px] [&_.recharts-pie-label-text]:fill-foreground"
          >
            <PieChart margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
              <ChartTooltip
                // cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={_chartData}
                dataKey="value"
                nameKey="name"
                label
                stroke="0"
                innerRadius={50}
                style={{
                  zIndex: -10,
                }}
              />
              {/* <ChartLegend
                content={<ChartLegendContent nameKey="name" />}
                className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
              /> */}
            </PieChart>
          </ChartContainer>
        </CardContent>
        <ul className="flex-wrap flex gap-x-8  justify-center  mt-4">
          {_chartData.map((item, index) => (
            <ChartLegendItem
              name={item.name}
              value={item.value}
              category=""
              fill={item.fill}
              key={index}
            />
          ))}
        </ul>
      </div>
    </AnalyticsCard>
  );
};
