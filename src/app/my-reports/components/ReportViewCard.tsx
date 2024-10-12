import { FC, useState } from "react";
import { classNames } from "@/lib/utilities/helperFunctions";
import { GripVertical, Plus, TrashIcon } from "lucide-react";
import { TextLabel } from "@/components";
import { ReportConfig } from "@/models/ReportWidgetConfig";
import { ReportViewCardModel } from "../models/ReportModels";
export const ReportViewCard: FC<{
  /** Report Configuration for this card, contains the Title, Category, PlaceholderImage, and Id */
  config: ReportConfig;
  /** List of Widgets the user has added */
  userWidgetList: ReportViewCardModel[];
  updateWidgetList: Function;
  _sampleReports: ReportViewCardModel[];
  isDragging?: boolean;
  withOpacity?: boolean;
  canDrag?: boolean;
}> = ({
  config,
  userWidgetList,
  updateWidgetList,
  _sampleReports,
  isDragging,
  withOpacity,
  canDrag,
}) => {
  const [isAddedToUserList, setIsAddedToUserList] = useState<boolean>(
    userWidgetList.find((item) => item.id === config.aliasID.toString())
      ?.isAdded === true ?? false
  );

  const addWidget = () => {
    setIsAddedToUserList(true);
    updateWidgetList([
      ...userWidgetList,
      { id: config.aliasID.toString(), isAdded: true },
    ]);
  };

  const removeWidget = () => {
    console.log(config.aliasID.toString());
    setIsAddedToUserList(false);
    updateWidgetList([
      ...userWidgetList.filter((item) => item.id !== config.aliasID.toString()),
    ]);

    _sampleReports.map((report) =>
      report.id === config.aliasID.toString()
        ? (report.isAdded = false)
        : report
    );
  };

  return (
    <div
      className={classNames(
        " bg-slate-50/50 group rounded-md transform ",
        withOpacity ? "0.5" : "1",
        isDragging && canDrag
          ? "cursor-grabbing shadow-xl scale-105 border border-indigo-400"
          : "scale-100"
      )}
    >
      <div className="relative w-full">
        <img
          src={config.placeholderImage}
          alt=""
          className={classNames(
            "h-40 object-cover w-full group-hover:opacity-40"
          )}
        />
        {canDrag && (
          <div className="absolute top-2 right-2 p-1 bg-slate-100 rounded-sm">
            <GripVertical className="w-4 h-4 text-slate-600" />
          </div>
        )}

        {isAddedToUserList && (
          <>
            <span className="absolute top-2 left-2 inline-flex items-center px-2 py-1 text-xs font-normal text-green-700 rounded-md bg-green-50 ">
              Added
            </span>
          </>
        )}

        <button
          onClick={() => {
            isAddedToUserList ? removeWidget() : addWidget();
          }}
          className={classNames(
            "absolute bottom-2 bg-slate-50 hover:shadow-md right-2 inline-flex p-2 place-content-center items-center text-xs font-medium text-slate-700 rounded-full",
            isAddedToUserList ? "hover:bg-red-50 " : "hover:bg-indigo-100"
          )}
        >
          {!isAddedToUserList ? (
            <Plus className="h-6 w-6 text-indigo-700 " />
          ) : (
            <TrashIcon className="h-6 w-6 text-red-700 font-light" />
          )}
        </button>
      </div>

      <div className="p-2  ">
        <TextLabel
          label={config.category}
          copy={
            <p className="text-xs font-mono text-slate-700">{config.title}</p>
          }
        />
      </div>
    </div>
  );
};
