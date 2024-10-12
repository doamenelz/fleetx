"use client";
import { FC } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { PieChartData } from "../models/ChartData";
import { Pay } from "../models/Pay";

export const PaySlipPieChart: FC<{ data: PieChartData[]; pay: Pay }> = (
  props
) => {
  return (
    <div className="space-y-2 py-6">
      <ResponsiveContainer height={240}>
        <PieChart
          margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          // width={260}
          // height={260}
          // style={{ zIndex: 1, color: "#000000", position: "relative" }}
        >
          <Pie
            data={props.data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={100}
            fill="#000000"
            dataKey="value"
            style={{
              zIndex: -1,
              backgroundColor: "#000000",
              position: "relative",
            }}
          >
            {props.data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color}
                stroke={entry.color}
                style={{
                  zIndex: -1,
                  backgroundColor: "#000000",
                  position: "relative",
                }}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <PayslipSummaryTable pay={props.pay} />
    </div>
  );
};

const PayslipSummaryTable: FC<{ pay: Pay }> = ({ pay }) => {
  return (
    <div className="w-full space-y-3 text-xs">
      <div className="flex justify-between w-full pb-2 font-medium text-gray-700 border-b border-gray-400">
        <p className="">Allowances</p>
        <p className="">
          {pay.currency} {pay.total.toLocaleString()}
        </p>
      </div>

      <div className="flex justify-between w-full font-normal text-gray-700 ">
        <p className="flex items-center gap-2">
          <span className="block w-3 h-3 rounded-full bg-warning-400"></span>
          Deductions{" "}
        </p>
        <p>
          - {pay.currency} {pay.deduction.toLocaleString()}
        </p>
      </div>

      <div className="flex justify-between w-full pt-2 font-semibold text-gray-700 border-gray-400">
        <p className="flex items-center gap-2">
          <span className="block w-3 h-3 rounded-full bg-success-500"></span>
          Net Pay{" "}
        </p>
        <p>
          {pay.currency} {pay.net.toLocaleString()}
        </p>
      </div>
    </div>
  );
};
