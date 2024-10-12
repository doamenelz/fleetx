"use client";
import {
  CARD_SPAN,
  Dropdown,
  GRID_TYPE,
  GridLayout,
  INPUT_TYPES,
  InputObject,
  PageContainer,
  sampleStats,
  SCREEN_WIDTH,
  SectionHeader,
  setScreenWidth,
  SummaryCardHeader,
  SummaryCardObject,
  TEXT_INPUT_SIZE,
} from "@/components";
import { Icon, ICON_SIZES } from "@/components/Icons";
import { classNames } from "@/lib/utilities/helperFunctions";
import {
  RDemBusinessUnit,
  RDemContractType,
  RDemEmpTrend,
  RDemGender,
} from "../people/components";
import { sampleEmployee } from "@/models";
import { DATE_OPTIONS, formatDate } from "@/lib/utilities/dateHelpers";
import {
  RCompNonPayrollSpending,
  RCompSplit,
  RCompTrend,
  RDeductionsTrend,
  TimePerGradePromotion,
} from "../compensation/components";
import { useState } from "react";
import { demoStats } from "./model/DDemographics";
import {
  DashboardCompensationGrid,
  DashboardDemographicsGrid,
} from "./components";
import { compStats } from "./model/DCompensation";
import { workforceStats } from "./model/DWorkforce";
import { DashboardWorkforceGrid } from "./components/workforce";
import {
  EmployeeHireSummaryCard,
  PromotionsSummaryCard,
  SanctionsSummaryCard,
  TimeToHireStrata,
} from "../workforce/components";
import { DashboardOutOfOfficeList } from "../home/components";
import { getReportCategory, getReportInfo } from "@/models/ReportWidgetConfig";
import { getWidgetConfig } from "@/models/ReportWidgetHelpers";
import { COMPONENT_ALIAS_ID } from "@/models/ComponentAliasEnums";
import {
  Listbox,
  ListboxOption,
  ListboxLabel,
} from "@/components/Dropdown/ListBox";

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

export default function Page() {
  const [selectedView, setSelectedView] = useState<InputObject>({
    id: "01",
    stringValue: "All",
    type: INPUT_TYPES.dropdown,
    required: false,
  });

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

  const toggleHandler = (e: InputObject) => {
    setSelectedView(e);
  };

  const getCompsType = (type: DCompsType) => {
    return dComps.find((item) => item.type === type)?.label;
  };

  const getStats = (selectedViewLabel: string) => {
    return dComps.find((item) => item.label === selectedViewLabel)!.headerStats;
  };
  return (
    <PageContainer
      documentTitle="Dashboard"
      fullWidth={SCREEN_WIDTH.full}
      isLoading={false}
      hasPadding={true}
      showFooter={true}
    >
      <div
        className={classNames(
          setScreenWidth(SCREEN_WIDTH.full),
          "py-2 lg:px-4 space-y-6"
        )}
      >
        <SectionHeader
          title={`Hi, ${sampleEmployee.bioData.firstName}`}
          copy={`Today is ${formatDate(new Date(), DATE_OPTIONS.dMY)}`}
          button={
            <Dropdown
              style={INPUT_TYPES.dropdown}
              id=""
              value={selectedView.stringValue ?? ""}
              defaultValue={dComps[0].label}
              items={dComps.map((item) => item.label)}
              span={TEXT_INPUT_SIZE.span2}
              setValue={toggleHandler}
            />
          }
        />
        {/* <Listbox>
          <ListboxOption value="active">
            <ListboxLabel>Active</ListboxLabel>
          </ListboxOption>
          <ListboxOption value="paused">
            <ListboxLabel>Paused</ListboxLabel>
          </ListboxOption>
          <ListboxOption value="delayed">
            <ListboxLabel>Delayed</ListboxLabel>
          </ListboxOption>
          <ListboxOption value="canceled">
            <ListboxLabel>Canceled</ListboxLabel>
          </ListboxOption>
        </Listbox> */}
        <SummaryCardHeader stats={getStats(selectedView.stringValue!)} />

        {selectedView.stringValue === getCompsType(DCompsType.all) && (
          <>
            <GridLayout type={GRID_TYPE.twoCol}>
              <RDemEmpTrend
                span={CARD_SPAN.oneFullOnSmall}
                config={getReportInfo(COMPONENT_ALIAS_ID.RDemEmpTrend)!}
              />
              <RCompSplit
                span={CARD_SPAN.one}
                config={getReportInfo(COMPONENT_ALIAS_ID.RCompSplit)!}
              />
              <EmployeeHireSummaryCard
                span={CARD_SPAN.full}
                config={
                  getReportInfo(COMPONENT_ALIAS_ID.EmployeeHireSummaryCard)!
                }
              />
              <RDeductionsTrend
                span={CARD_SPAN.one}
                config={getReportInfo(COMPONENT_ALIAS_ID.RDeductionsTrend)!}
              />
              <RDemGender
                config={getReportInfo(COMPONENT_ALIAS_ID.RDemGender)!}
              />
            </GridLayout>
            <GridLayout type={GRID_TYPE.threeCol}>
              <RDemBusinessUnit
                config={getReportInfo(COMPONENT_ALIAS_ID.RDemGender)!}
              />
              <RDemContractType
                config={getReportInfo(COMPONENT_ALIAS_ID.RDemGender)!}
              />
              <RCompNonPayrollSpending
                config={getReportInfo(COMPONENT_ALIAS_ID.RDemGender)!}
              />
              <DashboardOutOfOfficeList />
            </GridLayout>
            <GridLayout type={GRID_TYPE.twoCol}>
              <TimeToHireStrata
                config={getReportInfo(COMPONENT_ALIAS_ID.RDemGender)!}
              />
              <TimePerGradePromotion
                config={getReportInfo(COMPONENT_ALIAS_ID.RDemGender)!}
              />
              <PromotionsSummaryCard
                config={getReportInfo(COMPONENT_ALIAS_ID.RDemGender)!}
              />
              <SanctionsSummaryCard
                config={getReportInfo(COMPONENT_ALIAS_ID.RDemGender)!}
              />
            </GridLayout>
            <GridLayout type={GRID_TYPE.threeCol}></GridLayout>
          </>
        )}

        {selectedView.stringValue === getCompsType(DCompsType.demographics) && (
          <DashboardDemographicsGrid />
        )}

        {selectedView.stringValue === getCompsType(DCompsType.compensation) && (
          <DashboardCompensationGrid />
        )}

        {selectedView.stringValue === getCompsType(DCompsType.workforce) && (
          <DashboardWorkforceGrid />
        )}
      </div>
    </PageContainer>
  );
}
