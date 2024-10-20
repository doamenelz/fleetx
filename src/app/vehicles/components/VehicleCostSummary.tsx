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
  CustomCardWithTitle,
  BUTTON_GROUP,
  ButtonGroup,
  CARD_SPAN,
  ChartLegendItem,
  MenuDropdown,
  CardWithSectionHeader,
  Lbl,
  TextLabel,
} from "@/components";
import { FC } from "react";
import { classNames } from "@/lib/utilities/helperFunctions";
import { ReportConfig } from "@/models/ReportWidgetConfig";
import { Vehicle } from "@/models";
const chartData = [
  { category: "January", Fuel: 186000, Service: 120000, Others: 100000 },
  { category: "February", Fuel: 186000, Service: 120000, Others: 100000 },
  { category: "March", Fuel: 155000, Service: 110000, Others: 100000 },
  { category: "April", Fuel: 155000, Service: 110000, Others: 100000 },
  { category: "May", Fuel: 200000, Service: 140000, Others: 100505 },
  { category: "June", Fuel: 210000, Service: 145000, Others: 100000 },
  { category: "July", Fuel: 214000, Service: 145000, Others: 150000 },
  { category: "August", Fuel: 214000, Service: 145000, Others: 150000 },
  { category: "September", Fuel: 210000, Service: 145000, Others: 100000 },
  { category: "October", Fuel: 214000, Service: 145000, Others: 150000 },
  { category: "November", Fuel: 214000, Service: 145000, Others: 150000 },
  { category: "December", Fuel: 214000, Service: 145000, Others: 150000 },
];

const chartConfig = {
  NHF: {
    label: "Fuel",
    color: "#2a9d90",
  },
  Service: {
    label: "Service & Repairs",
    color: "hsl(var(--chart-2))",
  },
  Others: {
    label: "Other Expenses",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export const CostSummaryCard: FC<{
  span: CARD_SPAN;
  // config: ReportConfig;
  vehicle: Vehicle;
  title: string;
  copy?: string;
}> = ({ span, vehicle, title, copy }) => {
  return (
    <CardWithSectionHeader
      title={title}
      copy={copy}
      // copy={config.category}
      span={span}
      // button={
      //   <ButtonGroup type={BUTTON_GROUP.text} />
      //   // <MenuDropdown
      //   //   items={[
      //   //     { id: "", label: "Add to Favorites", function: () => {} },
      //   //     { id: "", label: "View More Details", function: () => {} },
      //   //   ]}
      //   // />
      // }
    >
      <div className="grid grid-cols-3 py-4">
        <div className="col-span-2">
          <CardContent>
            <ChartContainer config={{}} className="max-h-[350px] w-full pt-24">
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
                <Line
                  dataKey="Fuel"
                  type="monotone"
                  stroke="#F98513"
                  strokeWidth={2}
                  dot={true}
                />
                <Line
                  dataKey="Service"
                  type="monotone"
                  stroke="#301885"
                  strokeWidth={2}
                  dot={true}
                />
                <Line
                  dataKey="Others"
                  type="monotone"
                  stroke="#7A9CEF"
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
                                  name === "Fuel"
                                    ? "bg-[#F98513]"
                                    : name === "Service"
                                    ? "bg-[#301885]"
                                    : "bg-[#7A9CEF]"
                                )}
                              />
                              {name}
                            </div>
                            <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                              <span className="font-normal text-muted-foreground">
                                $
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
                                  $
                                </span>
                                {new Intl.NumberFormat().format(
                                  item.payload.Others +
                                    item.payload.Fuel +
                                    item.payload.Service
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
        </div>
        <div className=" flex flex-col space-y-6 p-4 rounded-sm justify-center">
          <div className="">
            <Lbl label="Total Cost(s)" />
            <p className="text-3xl font-medium font-mono">$5,361.05</p>
          </div>

          <div className=" content-center space-y-4 border-t pt-4">
            <div className="border-l-4 pl-2 border-brand-orangeHabanero">
              <TextLabel
                label="Fuel"
                copy={"$1,695.56"}
                copyStyle="font-mono"
              />
            </div>
            <div className="border-l-4 pl-2 border-brand-indiGlow">
              <TextLabel
                label="Service & Repairs"
                copy={"$3,110.00"}
                copyStyle="font-mono"
              />
            </div>
            <div className="border-l-4 pl-2 border-brand-vistaBlue">
              <TextLabel
                label="Other Costs (Expenses)"
                copy={"$555.49"}
                copyStyle="font-mono"
              />
            </div>
          </div>
        </div>
      </div>
    </CardWithSectionHeader>
  );
};
