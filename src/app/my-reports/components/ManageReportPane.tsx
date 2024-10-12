/* eslint-disable @next/next/no-img-element */
import {
  Button,
  BUTTON_SKIN,
  GRID_TYPE,
  GridLayout,
  TextLabel,
} from "@/components";
import { Dispatch, FC, SetStateAction, useContext, useState } from "react";
import { accessibleReports, ReportViewCardModel } from "../models/ReportModels";
import { classNames, simulateLoader } from "@/lib/utilities/helperFunctions";
import { LoaderCircle, Plus, TrashIcon } from "lucide-react";
import {
  getAllReportCategories,
  ReportConfig,
} from "@/models/ReportWidgetConfig";
import { MyReportContext } from "../models/MyReportContext";
import { WidgetSortManager } from "./ManageWidgetOrder";
import { ReportViewCard } from "./ReportViewCard";

export const ManageReportPane: FC<{
  dismissHandler: Dispatch<SetStateAction<boolean>>;
}> = ({ dismissHandler }) => {
  const maxReports = 10;
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const reportContext = useContext(MyReportContext);

  const createReportList = () => {
    var _report: ReportViewCardModel[] = [];
    reportContext.reports.forEach((report) => {
      _report.push(report);
    });

    return _report;
  };

  //TODO:
  /** Use IDs to make the mapping instead of the array, extract a list of IDs */
  const _sampleReports = createReportList();

  /** List of reports the User has access to */
  const all_reports = accessibleReports(_sampleReports);

  /** List of Widgets the user has added */
  const [widgetCart, setWidgetCart] = useState<ReportViewCardModel[]>([
    ..._sampleReports.filter((report) => report.isAdded === true),
  ]);

  const saveUpdatedList = () => {
    setIsLoading(true);

    _sampleReports.forEach((report) => {
      widgetCart.forEach((widgetReport) => {
        if (widgetReport.id === report.id) {
          report.isAdded = widgetReport.isAdded;
        }
      });
    });

    simulateLoader(dismissHandler, 1000);
    reportContext.updateReports(_sampleReports);

    //TODO: API Call to update the list of reports

    console.log("------ Reports Updated Successfully----- ");
  };

  const removeAllWidgets = () => {
    setWidgetCart([]);
    //Temp Implementation
    _sampleReports.map((report) =>
      report.id === "" ? (report.isAdded = true) : (report.isAdded = false)
    );
  };

  /** List of widget filtered using the lhs toggler */
  const filteredList = () => {
    if (selectedCategory === "All") {
      return all_reports;
    }

    if (selectedCategory === "My Added Widgets") {
      var _tempReports: ReportConfig[] = [];
      all_reports.forEach((report) => {
        var _relatedItem = _sampleReports.find(
          (item) =>
            item.id === report.aliasID.toString() && item.isAdded === true
        );
        if (_relatedItem) {
          _tempReports.push(report);
        }
      });
      return _tempReports;
    }
    return all_reports.filter((report) => report.category === selectedCategory);
  };

  return (
    <div className="flex -z-10">
      <div className="border-r w-56 fixed px-2 py-4 flex flex-col h-full justify-between">
        <div className="space-y-2">
          <CategoryButton
            category="All"
            isSelected={selectedCategory === "All"}
            onClick={() => setSelectedCategory("All")}
          />
          {getAllReportCategories(all_reports).map((category, index) => (
            <CategoryButton
              key={index}
              category={category}
              isSelected={selectedCategory === category}
              onClick={() => {
                setSelectedCategory(category);
              }}
            />
          ))}
          <CategoryButton
            category="My Added Widgets"
            isSelected={selectedCategory === "My Added Widgets"}
            onClick={() => setSelectedCategory("My Added Widgets")}
          />
        </div>

        <div className="mb-20 space-y-2">
          <p className="text-sm text-slate-700 font-medium">
            <span
              className={classNames(
                "text-2xl font-semibold",
                widgetCart.length > maxReports
                  ? "text-red-700"
                  : "text-slate-700"
              )}
            >
              {widgetCart.length}
            </span>{" "}
            / {maxReports}{" "}
            <span className="text-xs text-slate-500 font-mono">
              widgets added
            </span>
          </p>
          {isLoading ? (
            <div className="flex gap-2 mx-auto w-full text-center items-center py-4 px-2 text-xs rounded-full font-medium">
              <LoaderCircle className="w-3 h-3 animate-spin text-indigo-500" />
              Applying Updates...
            </div>
          ) : (
            <>
              <Button
                label="Remove all widgets"
                skin={BUTTON_SKIN.secondaryColor}
                destructive
                fillWidth
                onClick={removeAllWidgets}
              />
              {widgetCart.length <= maxReports && (
                <Button
                  label="Save Changes"
                  skin={BUTTON_SKIN.secondaryColor}
                  fillWidth
                  onClick={saveUpdatedList}
                />
              )}
            </>
          )}
        </div>
      </div>
      <div className="relative h-full ml-56 w-full p-4">
        {isLoading && (
          <div className="w-full h-full bg-gray-50 absolute z-10 opacity-50 items-center place-content-center"></div>
        )}

        {selectedCategory === "My Added Widgets" ? (
          <WidgetSortManager
            reports={filteredList()}
            userWidgetList={widgetCart}
            updateWidgetList={setWidgetCart}
            _sampleReports={_sampleReports}
          />
        ) : (
          <GridLayout type={GRID_TYPE.threeCol}>
            {filteredList().map((report) => (
              <ReportViewCard
                key={report.aliasID}
                config={report}
                userWidgetList={widgetCart}
                updateWidgetList={setWidgetCart}
                _sampleReports={_sampleReports}
              />
            ))}
          </GridLayout>
        )}
      </div>
    </div>
  );
};

const CategoryButton: FC<{
  category: string;
  isSelected: boolean;
  onClick: Function;
}> = ({ category, isSelected, onClick }) => {
  return (
    <button
      onClick={() => onClick()}
      className={classNames(
        "text-xs hover:bg-indigo-800 text-left font-medium  p-2 rounded-md w-full",
        isSelected
          ? "bg-indigo-900 text-slate-50 "
          : "bg-slate-100 text-slate-700 hover:text-slate-50"
      )}
    >
      {category}
    </button>
  );
};
