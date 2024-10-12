import { IconList } from "@/assets/IconList";
import {
  GRID_TYPE,
  GridLayout,
  Lbl,
  STATUS_COLORS,
  StatusBadge,
} from "@/components";
import { ICON_SIZES, Icon } from "@/components/Icons";
import { SCMainRowSingle, SCSideBySide } from "./GenericCards";

export const DemographicsHeader = () => {
  return (
    <GridLayout type={GRID_TYPE.fourCol}>
      <HDEmpTotal />
      <HDemAgeYearlyTrend />
      <HDemGenderTrend />
      {/* <HDemEthnicity /> */}

      <HDemGeopolitical />
    </GridLayout>
  );
};

const HDemAgeYearlyTrend = () => {
  return (
    <SCMainRowSingle
      title="Average Age of Employees"
      main="44.2 years"
      copy={
        <p className="text-xs font-semibold pr-1 text-green-700 pt-2 flex gap-1 tracking-tighter">
          <Icon icon={IconList.trendArrowUp} size={ICON_SIZES.sm} />
          1.5 years{" "}
          <span className="text-xs text-slate-600 font-light">(May 2023)</span>
        </p>
      }
    />
  );
};
const HDemEthnicity = () => {
  return (
    <SCMainRowSingle
      title="Largest Ethnicity (Origin)"
      main="Lagos State"
      copy={
        <p className="text-xs font-semibold pr-1 text-red-700 pt-2 flex gap-1 tracking-tighter">
          <Icon icon={IconList.arrowDown} size={ICON_SIZES.sm} />- 15 Employees
          <span className="text-xs text-slate-600 font-light">(May 2023)</span>
        </p>
      }
    />
  );
};

const HDEmpTotal = () => {
  return (
    <SCMainRowSingle
      title="Total Employees"
      main="520"
      copy={
        <p className="text-xs font-semibold pr-1 text-red-700 pt-2 flex gap-1 tracking-tighter">
          <Icon icon={IconList.arrowDown} size={ICON_SIZES.sm} />- 15 Employees
          <span className="text-xs text-slate-600 font-light">(May 2023)</span>
        </p>
      }
    />
  );
};
const HDemGeopolitical = () => {
  return (
    <SCMainRowSingle
      title="Largest Geopolitical"
      main="South West"
      copy={
        <p className="text-xs font-semibold pr-1 text-green-700 pt-2 flex gap-1 tracking-tighter">
          <Icon icon={IconList.arrowUp} size={ICON_SIZES.sm} />
          +115 Employees
          <span className="text-xs text-slate-600 font-light">(May 2023)</span>
        </p>
      }
    />
  );
};

const HDemGenderTrend = () => {
  return (
    <SCSideBySide
      title="Gender distribution"
      lhs={
        <div className="space-y-0">
          <p className="text-3xl font-semibold flex items-baseline gap-1">
            78%{" "}
            <span className="font-light text-slate-900">
              <Lbl label="(M)" />
            </span>
          </p>

          {/* <p className="text-xs text-green-700 flex pt-1 tracking-tighter font-semibold">
            <Icon icon={IconList.arrowUp} size={ICON_SIZES.sm} />
            2.5%{" "}
            <span className="text-slate-700 font-light pl-1">(May 2023)</span>
          </p> */}
        </div>
      }
      rhs={
        <div className="space-y-0 pl-2 ">
          <p className="text-3xl font-semibold flex items-baseline gap-1 ">
            22%{" "}
            <span className="font-light text-slate-900">
              <Lbl label="(F)" />
            </span>
          </p>
          <p className="text-xs text-green-700 flex pt-1 tracking-tighter font-semibold">
            <Icon icon={IconList.arrowUp} size={ICON_SIZES.sm} />
            2.5%{" "}
            <span className="text-slate-700 font-light pl-1">(May 2023)</span>
          </p>

          {/* <p className="text-xs text-red-700 flex pt-1 tracking-tighter">
            -2% headcount
          </p> */}
        </div>
      }
      copy={""}
      isEqual
    />
  );
};
