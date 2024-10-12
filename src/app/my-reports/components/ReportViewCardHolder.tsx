import { forwardRef, useContext, FC } from "react";
import { ReportCardProps } from "../models/ReportCardProps";
import { ReportViewCard } from "./ReportViewCard";
import { WidgetSortManagerContext } from "./ManageWidgetOrder";
import { ALL_REPORTS } from "@/models/ReportWidgetConfig";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ReportViewCardModel } from "../models/ReportModels";

export const ReportViewCardHolder = forwardRef<HTMLDivElement, ReportCardProps>(
  (
    {
      id,
      withOpacity,
      isDragging,
      style,
      updateWidgetList,
      userWidgetList,
      _sampleReports,
      ...props
    },
    ref
  ) => {
    return (
      <div
        className="bg-slate-50"
        ref={ref}
        style={style}
        {...props}
      >
        <ReportViewCard
          config={
            ALL_REPORTS.find((item) => item.aliasID.toString() === id) ??
            ALL_REPORTS[0]
          }
          userWidgetList={userWidgetList ?? []}
          updateWidgetList={
            updateWidgetList ??
            (() => {
              console.log("Selected Update List from CardHolder");
            })
          }
          _sampleReports={_sampleReports ?? []}
          isDragging={isDragging}
          withOpacity={withOpacity}
          canDrag
        />
      </div>
    );
  }
);

export const SortableItem: FC<{
  id: string;
  updateWidgetList: Function;
  userWidgetList: ReportViewCardModel[];
  _sampleReports: ReportViewCardModel[];
}> = ({ id, updateWidgetList, userWidgetList, _sampleReports }) => {
  const {
    isDragging,
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || undefined,
  };

  return (
    <ReportViewCardHolder
      ref={setNodeRef}
      style={style}
      withOpacity={isDragging}
      updateWidgetList={updateWidgetList}
      userWidgetList={userWidgetList}
      _sampleReports={_sampleReports}
      id={id}
      {...attributes}
      {...listeners}
    />
  );
};

ReportViewCardHolder.displayName = "ReportViewCardHolder";
