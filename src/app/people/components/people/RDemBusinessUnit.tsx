"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Pie,
  PieChart,
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
  createChartColorScheme,
  createChartData,
} from "@/lib/utilities/ChartStyles";
import { classNames } from "@/lib/utilities/helperFunctions";
import { FC } from "react";
import { ReportConfig } from "@/models/ReportWidgetConfig";

const womenData = [
  { name: "Front Office", women: 275, fill: "#e2e2e2", category: "Women" },
  { name: "Back Office", women: 200, fill: "#FFF", category: "Women" },
  { name: "Sales", women: 187, fill: "#FAFAFA", category: "Women" },
  {
    name: "Operations",
    women: 173,
    fill: "var(--color-edge)",
    category: "Women",
  },
  { name: "Support", women: 90, fill: "var(--color-other)", category: "Women" },
];

const menData = [
  { name: "Front Office", men: 80, fill: "#e2e2e2" },
  { name: "Back Office", men: 85, fill: "#FFF" },
  { name: "Sales", men: 80, fill: "#FAFAFA" },
  { name: "Operations", men: 120, fill: "var(--color-edge)" },
  { name: "Support", men: 60, fill: "var(--color-other)" },
];

const chartConfig = {
  women: {
    label: "Women",
  },
  men: {
    label: "Men",
  },
} satisfies ChartConfig;

interface DemData {
  id?: string;
  category: string;
  type: "men" | "women";
  value: number;
}

const sampleDemData: DemData[] = [
  { category: "Front Office", value: 275, type: "women" },
  { category: "Back Office", value: 200, type: "women" },
  { category: "Sales", value: 187, type: "women" },
  {
    category: "Operations",
    value: 173,
    type: "women",
  },
  { category: "Support", value: 90, type: "women" },
  { category: "Front Office", value: 80, type: "men" },
  { category: "Back Office", value: 85, type: "men" },
  { category: "Sales", value: 120, type: "men" },
  {
    category: "Operations",
    value: 60,
    type: "men",
  },
  { category: "Support", value: 145, type: "men" },
];

const createChartDataModel = (data: DemData[]) => {
  const colors = createChartColorScheme(CHART_COLOR_SCHEME.default);
  var _data: any[] = [];
  for (let item = 0; item < data.length; item++) {
    const element = {
      name: data[item].category,
      value: data[item].value,
      fill: colors[item % colors.length],
      [data[item].type]: data[item].type,
    };
    _data.push(element);
  }
  return _data;
};
/** Analytics card showing the Demographics Age Distribution */
export const RDemBusinessUnit: FC<{ config: ReportConfig }> = ({ config }) => {
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
        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    indicator="line"
                    nameKey="name"
                    labelFormatter={(_, payload) => {
                      return payload[0].payload.name;
                    }}
                  />
                }
              />

              <Pie
                data={createChartDataModel(
                  sampleDemData.filter((item) => item.type === "women")
                )}
                nameKey={"women"}
                dataKey="value"
                innerRadius={70}
                outerRadius={90}
              />
              <Pie
                data={createChartDataModel(
                  sampleDemData.filter((item) => item.type === "men")
                )}
                nameKey={"men"}
                dataKey="value"
                outerRadius={60}
              />
            </PieChart>
          </ChartContainer>
        </CardContent>
        <ul className="grid grid-cols-3 gap-4  place-items-center">
          {createChartDataModel(
            sampleDemData.filter((item) => item.type === "women")
          ).map((item, index) => (
            <ChartLegendItem
              key={index}
              name={item.name}
              value={""}
              category=""
              fill={item.fill}
            />
          ))}
        </ul>
      </div>
    </CustomCardWithTitle>
  );
};
