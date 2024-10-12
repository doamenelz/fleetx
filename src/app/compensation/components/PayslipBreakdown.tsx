"use client";
import { FC } from "react";
import { Pay } from "../models/Pay";
export const PayslipBreakdownTable: FC<{ pay: Pay }> = ({ pay }) => {
  return (
    <div className="w-full space-y-6 text-xs py-4">
      <div>
        <div className="flex justify-between w-full pb-2 font-medium text-gray-700 border-gray-400">
          <p className="">Allowances</p>
        </div>
        <BreakdownSection
          obj={pay.earningBreakdown!}
          currency={pay.currency}
          total={pay.total}
          isSubtraction={false}
        />
      </div>

      {/* <div className="space-y-1">
          <div className="flex justify-between w-full font-normal text-gray-700 ">
            <p className="flex items-center gap-2">
              <span className="block w-3 h-3 rounded-full bg-error-500"></span>
              Taxes{" "}
              <span className="px-2 py-0.5 text-xs rounded-xl font-medium bg-error-50 text-error-500">
                15%
              </span>
            </p>
          </div>
          <BreakdownSection
            obj={pay.taxBreakDown!}
            currency={pay.currency}
            total={pay.tax}
            isSubtraction={true}
          />
        </div> */}
      <div className="space-y-1">
        <div className="flex justify-between w-full font-normal text-gray-700 ">
          <p className="flex items-center gap-2">
            <span className="block w-3 h-3 rounded-full bg-warning-400"></span>
            Deductions{" "}
            <span className="px-2 py-0.5 text-xs rounded-xl font-medium bg-warning-50 text-warning-600">
              17.5%
            </span>
          </p>
        </div>
        <BreakdownSection
          obj={pay.deductionBreakDown!}
          currency={pay.currency}
          total={pay.deduction}
          isSubtraction={true}
        />
      </div>

      <div className="flex justify-between w-full pt-2 font-semibold text-gray-700 border-t border-gray-400">
        <p className="flex items-center gap-2">
          <span className="block w-3 h-3 rounded-full bg-success-500"></span>
          Net Pay{" "}
          <span className="px-2 py-0.5 text-xs rounded-xl font-medium bg-success-50 text-success-700">
            65.25%
          </span>
        </p>
        <p>
          {pay.currency} {pay.net.toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export const BreakdownSection: FC<{
  obj: Object;
  currency: string;
  total: number;
  isSubtraction: boolean;
}> = ({ obj, currency, total, isSubtraction }) => {
  const objEntries = Object.entries(obj);

  return (
    <div className="p-3 ml-1 space-y-3 rounded-md lg:ml-3 bg-gray-50">
      {objEntries.map((entry, index) => (
        <div key={index} className="flex justify-between">
          <p className="flex items-center gap-2">{entry[0]}</p>
          <p>
            {isSubtraction && "-"} {currency} {entry[1].toLocaleString()}
          </p>
        </div>
      ))}
      <p className="flex justify-end w-full pt-2 text-xs font-semibold border-t border-gray-400">
        {isSubtraction && "-"} {currency} {total.toLocaleString()}
      </p>
    </div>
  );
};
