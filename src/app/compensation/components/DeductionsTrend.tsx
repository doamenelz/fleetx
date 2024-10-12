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
import { classNames } from "@/lib/utilities/helperFunctions";
import { ReportConfig } from "@/models/ReportWidgetConfig";
const chartData = [
  { category: "January", NHF: 186000, Pension: 120000, Others: 100000 },
  { category: "February", NHF: 186000, Pension: 120000, Others: 100000 },
  { category: "March", NHF: 155000, Pension: 110000, Others: 100000 },
  { category: "April", NHF: 155000, Pension: 110000, Others: 100000 },
  { category: "May", NHF: 200000, Pension: 140000, Others: 100505 },
  { category: "June", NHF: 210000, Pension: 145000, Others: 100000 },
  { category: "July", NHF: 214000, Pension: 145000, Others: 150000 },
  { category: "August", NHF: 214000, Pension: 145000, Others: 150000 },
];

const chartConfig = {
  NHF: {
    label: "NHF",
    color: "hsl(var(--chart-1))",
  },
  Pension: {
    label: "Pension",
    color: "hsl(var(--chart-2))",
  },
  Others: {
    label: "Others",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export const RDeductionsTrend: FC<{
  span: CARD_SPAN;
  config: ReportConfig;
}> = ({ span, config }) => {
  return (
    <AnalyticsCard
      title={config.title}
      copy={config.category}
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
        <ChartContainer
          config={{}}
          className="max-h-[350px] w-full pt-24"
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
            <Line
              dataKey="NHF"
              type="monotone"
              stroke="#2a9d90"
              strokeWidth={2}
              dot={true}
            />
            <Line
              dataKey="Pension"
              type="monotone"
              stroke="#fb923c"
              strokeWidth={2}
              dot={true}
            />
            <Line
              dataKey="Others"
              type="monotone"
              stroke="#1A2E44"
              strokeWidth={2}
              dot={true}
            />
            <LabelList
              position="top"
              offset={12}
              className="fill-foreground"
              fontSize={12}
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
                              name === "NHF"
                                ? "bg-[#2a9d90]"
                                : name === "Pension"
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
                              item.payload.NHF +
                                item.payload.Pension +
                                item.payload.Others
                            )}
                            {/* {item.payload.NHF +
                              item.payload.Pension +
                              item.payload.Others} */}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                />
              }
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <div className="flex gap-4 justify-center">
        <ChartLegendItem
          name={"NHF"}
          value={""}
          category=""
          fill="#2a9d90"
        />
        <ChartLegendItem
          name={"Pensions"}
          value={""}
          category=""
          fill="#fb923c"
        />
        <ChartLegendItem
          name={"Others"}
          value={""}
          category=""
          fill="#1A2E44"
        />
      </div>
    </AnalyticsCard>
  );
};
