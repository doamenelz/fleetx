import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  DragOverlay,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
  PointerSensor,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { useState, useCallback, FC, useContext } from "react";
import { GRID_TYPE, GridLayout } from "@/components";
import { ReportConfig } from "@/models/ReportWidgetConfig";
import { ReportViewCardModel } from "../models/ReportModels";
import React from "react";
import { InfoIcon } from "lucide-react";
import { ReportViewCardHolder, SortableItem } from "./ReportViewCardHolder";

export const WidgetSortManagerContext = React.createContext<{
  reports: ReportConfig[];
  userWidgetList: ReportViewCardModel[];
  updateWidgetList: Function;
  _sampleReports: ReportViewCardModel[];
}>({
  reports: [],
  userWidgetList: [],
  updateWidgetList: () => {},
  _sampleReports: [],
});

export const WidgetSortManager: FC<{
  reports: ReportConfig[];
  _sampleReports: ReportViewCardModel[];
  userWidgetList: ReportViewCardModel[];
  updateWidgetList: Function;
}> = ({ reports, _sampleReports, userWidgetList, updateWidgetList }) => {
  const [reportIds, setReportIds] = useState(
    Array.from(userWidgetList, (report) => report.id.toString())
  );
  const [activeId, setActiveId] = useState<string | null>(null);
  //   const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor)
  );
  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveId(event.active.id.toString());
  }, []);
  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setReportIds((items) => {
        const oldIndex = items.indexOf(active.id.toString());
        const newIndex = items.indexOf(over!.id.toString());

        return arrayMove(items, oldIndex, newIndex);
      });
    }

    setActiveId(null);
  }, []);
  const handleDragCancel = useCallback(() => {
    setActiveId(null);
  }, []);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <SortableContext
        items={reportIds}
        strategy={rectSortingStrategy}
      >
        <div className="rounded-md bg-indigo-50 p-4 mb-2">
          <div className="flex">
            <div className="flex-shrink-0">
              <InfoIcon
                aria-hidden="true"
                className="h-4 w-4 text-indigo-400"
              />
            </div>
            <div className="ml-2 flex-1 md:flex md:justify-between">
              <p className="text-xs text-indigo-700">
                You can sort and reposition the reports added to your
                <span className="font-semibold px-1">My Reports</span>by
                dragging the cards below
              </p>
            </div>
          </div>
        </div>

        <GridLayout type={GRID_TYPE.threeCol}>
          {reportIds.map((id) => (
            <SortableItem
              key={id}
              id={id}
              updateWidgetList={updateWidgetList}
              userWidgetList={userWidgetList}
              _sampleReports={_sampleReports}
            />
          ))}
        </GridLayout>
      </SortableContext>

      <DragOverlay
        adjustScale
        style={{ transformOrigin: "0 0 " }}
      >
        {activeId ? (
          <ReportViewCardHolder
            id={activeId}
            isDragging
            updateWidgetList={updateWidgetList}
            userWidgetList={userWidgetList}
          />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};
