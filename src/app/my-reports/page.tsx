"use client";
import {
  Dropdown,
  GRID_TYPE,
  GridLayout,
  INPUT_TYPES,
  InputObject,
  Lbl,
  PageContainer,
  sampleStats,
  SCREEN_WIDTH,
  SectionHeader,
  setScreenWidth,
  SlideOutWrapper,
  SummaryCardObject,
  TEXT_INPUT_SIZE,
} from "@/components";
import { sampleEmployee } from "@/models";
import { classNames, simulateLoader } from "@/lib/utilities/helperFunctions";
import { DATE_OPTIONS, formatDate } from "@/lib/utilities/dateHelpers";
import ReactDOM from "react-dom";
import { FC, useContext, useEffect, useState } from "react";
import { useMounted } from "@/lib/hooks/useMounted";
import { ManageReportPane } from "./components/ManageReportPane";
import { MyReportContext } from "./models/MyReportContext";
import {
  ReportWidgetConfig,
  ReportWidgetList,
} from "@/models/ReportWidgetList";
import { Cog, GripVertical, SlidersHorizontal } from "lucide-react";
import _sampleJsonFirstLoad from "./models/sampleFirstLoadReport.json";
import { demoStats } from "../dashboard/model/DDemographics";
import { compStats } from "../dashboard/model/DCompensation";
import { workforceStats } from "../dashboard/model/DWorkforce";

enum DCompsType {
  all,
  demographics,
  compensation,
  timeOff,
  workforce,
}
interface DashboardComps {
  headerStats: SummaryCardObject[];
  label: string;
  type: DCompsType;
}

const dComps: DashboardComps[] = [
  {
    type: DCompsType.all,
    headerStats: sampleStats,
    label: "All",
  },
  {
    type: DCompsType.demographics,
    headerStats: demoStats,
    label: "Demographics",
  },
  {
    type: DCompsType.compensation,
    headerStats: compStats,
    label: "Compensation",
  },
  // {
  //   type: DCompsType.timeOff,
  //   headerStats: compStats,
  //   label: "Time Off",
  // },
  {
    type: DCompsType.workforce,
    headerStats: workforceStats,
    label: "Workforce",
  },
];

export default function Page() {
  const reportContext = useContext(MyReportContext);
  const [showModal, setShowModal] = useState(false);
  const [selectedView, setSelectedView] = useState<InputObject>({
    id: "01",
    stringValue: "All",
    type: INPUT_TYPES.dropdown,
    required: false,
  });
  const toggleHandler = (e: InputObject) => {
    setSelectedView(e);
  };

  const showModalHandler = () => {
    //TODO: Make API call to get the list of reports on modal dismiss if the user saved changes
    setShowModal(false);
    setIsLoading(false);
    // simulateLoader(setIsLoading, 2000);
  };

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    reportContext.updateReports(_sampleJsonFirstLoad);
    simulateLoader(setIsLoading, 3000);
    console.log("My Reports Landing loaded");
  }, []);

  const getAddedWidgets = () => {
    var _mappedWidgets: ReportWidgetConfig[] = [];
    ReportWidgetList.forEach((report) => {
      var _report = reportContext.reports.find(
        (item) => item.id === report.aliasID.toString() && item.isAdded === true
      );

      if (_report) {
        _mappedWidgets.push(report);
      }
    });

    return _mappedWidgets;
  };

  const mounted = useMounted();
  if (!mounted) return null;
  return (
    <PageContainer
      documentTitle="My Reports"
      fullWidth={SCREEN_WIDTH.full}
      isLoading={isLoading}
      hasPadding={true}
      bgColor=""
      loaderText="...Getting your reports"
    >
      <div
        className={classNames(
          setScreenWidth(SCREEN_WIDTH.full),
          "py-2 lg:px-4 space-y-6"
        )}
      >
        <div className="space-y-4">
          <SectionHeader
            title={`Hi, ${sampleEmployee.bioData.firstName}`}
            copy={`Today is ${formatDate(new Date(), DATE_OPTIONS.dMY)}`}
            button={
              <div className="flex gap-2">
                {getAddedWidgets().length >= 1 && (
                  <button
                    onClick={() => setShowModal(true)}
                    className="group inline-flex w-full justify-center bg-slate-50 rounded-md p-2 text-gray-900 hover:bg-indigo-50 focus:outline-none focus-visible:ring-1 focus-visible:ring-indigo-200"
                  >
                    <SlidersHorizontal className="w-4 h-4 group-hover:text-indigo-700" />
                  </button>
                )}
              </div>
            }
          />

          {/* <Dropdown
            style={INPUT_TYPES.dropdown}
            id=""
            value={selectedView.stringValue ?? ""}
            defaultValue={dComps[0].label}
            items={dComps.map((item) => item.label)}
            span={TEXT_INPUT_SIZE.span2}
            setValue={toggleHandler}
          /> */}
          {getAddedWidgets().length === 0 ? (
            <EmptyStateAdd onClick={() => setShowModal(true)} />
          ) : (
            <GridLayout type={GRID_TYPE.twoCol}>
              {getAddedWidgets().map((widget, index) => (
                <div
                  className="col-span-1"
                  key={index}
                >
                  {widget.component}
                </div>
              ))}
            </GridLayout>
          )}
        </div>

        {ReactDOM.createPortal(
          <SlideOutWrapper
            closeControl={showModalHandler}
            openControl={showModal}
            showDismissButton
            size="lg"
          >
            <div className="px-4 ">
              <div className="sticky top-0 z-20 bg-white">
                <SectionHeader
                  title="Manage Reports"
                  copy="Add and Remove Widgets to My Reports"
                />
              </div>
              <ManageReportPane dismissHandler={showModalHandler} />
            </div>
          </SlideOutWrapper>,
          document.getElementById("modal")!
        )}
      </div>
    </PageContainer>
  );
}

const EmptyStateAdd: FC<{ onClick: Function }> = ({ onClick }) => {
  return (
    <button
      type="button"
      onClick={() => onClick()}
      className="relative group block w-full rounded-lg border border-dashed border-gray-300 p-12 text-center hover:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
    >
      <svg
        fill="none"
        stroke="currentColor"
        viewBox="0 0 48 48"
        aria-hidden="true"
        className="mx-auto h-12 w-12 text-gray-400 group-hover:text-indigo-700"
      >
        <path
          d="M8 14v20c0 4.418 7.163 8 16 8 1.381 0 2.721-.087 4-.252M8 14c0 4.418 7.163 8 16 8s16-3.582 16-8M8 14c0-4.418 7.163-8 16-8s16 3.582 16 8m0 0v14m0-4c0 4.418-7.163 8-16 8S8 28.418 8 24m32 10v6m0 0v6m0-6h6m-6 0h-6"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="mt-2 block text-sm font-medium text-indigo-700">
        No Reports added yet
      </span>
    </button>
  );
};
