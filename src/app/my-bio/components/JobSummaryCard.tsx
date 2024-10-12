import {
  TextLabel,
  Lbl,
  GridLayout,
  GRID_TYPE,
  AvatarCell,
  AVATAR_SIZES,
  StatusBadge,
  STATUS_COLORS,
  AvatarStack,
  PlainCard,
} from "@/components";
import { sampleEmployee, sampleEmployeeList } from "@/models";
export const JobSummaryCard = () => {
  return (
    <GridLayout type={GRID_TYPE.twoCol}>
      <TextLabel
        label="Employment Status"
        copy={<StatusBadge label="Active" statusType={STATUS_COLORS.success} />}
      />

      <TextLabel
        label="Confirmation Status"
        copy={
          <StatusBadge label="Confirmed" statusType={STATUS_COLORS.regular} />
        }
      />
      <TextLabel
        label="Employment Date"
        copy="18 Feb, 2018 (3 years, 2 months)"
      />
      <TextLabel label="Employment Type" copy="Full Time" />
      <TextLabel label="Grade" copy="Senior Manager • Band 1" />
      <TextLabel label="Employee Type" copy="PERMANENT" />
      <TextLabel label="Current Compensation" copy="NGN 12,500,345.34 / year" />

      <TextLabel label="Pay Frequency" copy="Monthly" />

      <div className="space-y-1">
        <Lbl label="Line Manager" />
        <AvatarCell
          firstName={sampleEmployee.lineManager!.bioData.firstName}
          lastName={sampleEmployee.lineManager!.bioData.lastName}
          fullName={sampleEmployee.lineManager!.bioData.fullName}
          row2={sampleEmployee.lineManager!.jobInformation?.jobTitle}
          size={AVATAR_SIZES.md}
        />
      </div>
      <TextLabel
        label="Direct Reports"
        copy={
          <AvatarStack employees={sampleEmployeeList} size={AVATAR_SIZES.sm} />
        }
      />
    </GridLayout>
  );
};
