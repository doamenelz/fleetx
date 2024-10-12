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
  createChartColorScheme,
  createChartData,
} from "@/lib/utilities/ChartStyles";
import { classNames } from "@/lib/utilities/helperFunctions";
import { FC } from "react";
import { ReportConfig } from "@/models/ReportWidgetConfig";

const chartData = [
  {
    name: "Travel",
    value: 3563456.56,
    fill: "#6b21a8",
  },
  { name: "Training", value: 8435234.22, fill: "#FAFAFA" },
  { name: "Others", value: 514435.88, fill: "var(--color-edge)" },
];

/** Analytics card showing the Demographics Age Distribution */
export const RCompNonPayrollSpending: FC<{ config: ReportConfig }> = ({
  config,
}) => {
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
            className="mx-auto aspect-square max-h-[300px] [&_.recharts-pie-label-text]:fill-foreground"
          >
            <PieChart margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    hideLabel
                    formatter={(value, name, item, index) => (
                      <div className="w-full">
                        <div className="flex">
                          <div className="flex items-center gap-2">
                            <div
                              className={classNames(
                                "h-2.5 w-2.5 shrink-0 rounded-[2px]",
                                name === "Travel"
                                  ? `bg-[#2a9d90]`
                                  : name === "Training"
                                  ? "bg-[#fb923c]"
                                  : "bg-[#1e1b4b]"
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
                      </div>
                    )}
                  />
                }
              />
              <Pie
                data={_chartData}
                dataKey="value"
                nameKey="name"
                // label
                stroke="0"
                // innerRadius={50}
                style={{
                  zIndex: -10,
                }}
              />
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
