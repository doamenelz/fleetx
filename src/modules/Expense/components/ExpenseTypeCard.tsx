import { FC } from "react";
import { ExpenseTypeCardItem } from "./ExpenseTypeCard.types";
import { classNames } from "@/lib/utilities/helperFunctions";
const ExpenseTypeCard: FC<{
  type: ExpenseTypeCardItem;
  isActive: Boolean;
  count: number;
}> = ({ type, isActive, count }) => {
  return (
    <div
      className={classNames(
        "p-4 w-full text-left bg-white border rounded-md ",
        isActive
          ? "border-primary-600"
          : "border-gray-200 hover:shadow-lg hover:shadow-gray-200"
      )}
    >
      <div
        className={classNames(
          `pl-3 border-l-4 `,
          isActive ? "border-primary-600" : "border-gray-200"
        )}
      >
        <p
          className={classNames(
            "mt-1 text-sm ",
            isActive ? "font-semibold text-gray-900" : "text-gray-700"
          )}
        >
          {type.header}
        </p>
        <div className="flex items-baseline justify-between">
          <div>
            <p className="mt-1 text-4xl font-semibold text-gray-700">{count}</p>
            <p className="mt-0 text-xs font-light text-gray-700">
              {type.subtitle}
            </p>
          </div>
        </div>
      </div>

      <p className="flex items-center justify-between mt-4 text-sm text-primary-700 group-hover:text-primary-900 group-hover:font-medium">
        View
      </p>
    </div>
  );
};

export default ExpenseTypeCard;
