import { IconList } from "@/assets/IconList";
import { ICON_SIZES, Icon } from "@/components/Icons";
import Link from "next/link";
import { FC } from "react";
import { Balances } from "../models/Balances";
import {
  BUTTON_SKIN,
  Button,
  ICON_POSITION,
  STATUS_COLORS,
  StatusBadge,
} from "@/components";

export const BalancesCard: FC<{ leaveType: Balances }> = (props) => {
  return (
    <div>
      <Link
        key={""}
        href={`time-off/apply/${props.leaveType.type}`}
        id={props.leaveType.id}
        className="w-full" //hover:shadow-gray-100 shadow-gray-200 shadow-lg
      >
        <div className="py-3 space-y-2 w-full px-2 hover:bg-slate-50">
          <div className="flex justify-between items-center">
            <p className=" text-xs md:text-sm tracking-tight font-medium text-primary-600">
              {props.leaveType.name}
            </p>
          </div>

          <div className="flex justify-between items-baseline gap-1">
            <div>
              <p className="text-sm text-left font-semibold text-slate-600">
                {props.leaveType.available}
              </p>
              <p className="text-xs text-left font-light text-gray-700">
                Available
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-700">{props.leaveType.limit}</p>
              <p className="text-xs font-light text-gray-700">Earned</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-700">{props.leaveType.limit}</p>
              <p className="text-xs font-light text-gray-700">Used</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
