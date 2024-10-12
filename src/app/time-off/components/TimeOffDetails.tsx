"use client";

import {
  AVATAR_SIZES,
  Accordion,
  AvatarCell,
  STATUS_COLORS,
  SectionHeader,
  StatusBadge,
  TextLabel,
  Timeline,
  timelineActivities,
} from "@/components";
import { FC } from "react";
import { sampleTimeOffDetailsArray } from "../models/TimeOff";
import { DATE_OPTIONS, formatDate } from "@/lib/utilities/dateHelpers";
import { sampleEmployeeList } from "@/models";

export const TimeOffDetailsView: FC<{ id: string }> = ({ id }) => {
  const getLeaveDetails = () => {
    return sampleTimeOffDetailsArray.find((e) => e.id === id);
  };

  const _leaveDetails = getLeaveDetails();
  return (
    <div className="p-4">
      <Accordion
        id=""
        title="Leave Details"
        style="section"
        defaultOpen={true}
        body={
          <div className="space-y-6 p-4 rounded-md border border-indigo-50 my-4">
            <TextLabel label="Leave Type" copy={_leaveDetails?.name} />
            <TextLabel
              label="Status"
              copy={
                <StatusBadge
                  label={_leaveDetails?.approvalStatus ?? ""}
                  statusType={STATUS_COLORS.success}
                />
              }
            />
            <TextLabel
              label="Start Date"
              copy={formatDate(
                new Date(_leaveDetails?.startDate ?? ""),
                DATE_OPTIONS.full
              )}
            />
            <TextLabel
              label="End Date"
              copy={formatDate(
                new Date(_leaveDetails?.endDate ?? ""),
                DATE_OPTIONS.full
              )}
            />
            <TextLabel
              label="Resumption Date"
              copy={formatDate(
                new Date(_leaveDetails?.resumption ?? ""),
                DATE_OPTIONS.full
              )}
            />
            <TextLabel
              label="Duration"
              copy={`${_leaveDetails?.numberOfDays.toString()} days`}
            />
            {_leaveDetails?.reliefOfficer && (
              <TextLabel
                label="Relief Officer"
                copy={
                  <AvatarCell
                    imageUrl={_leaveDetails.reliefOfficer.bioData.avatar}
                    firstName={_leaveDetails.reliefOfficer.bioData.firstName}
                    lastName={_leaveDetails.reliefOfficer.bioData.lastName}
                    size={AVATAR_SIZES.sm}
                    fullName={`${_leaveDetails.reliefOfficer.bioData.firstName} ${sampleEmployeeList[1].bioData.lastName}`}
                    row2={_leaveDetails.reliefOfficer.jobInformation?.jobTitle}
                  />
                }
              />
            )}
          </div>
        }
      />
      <Accordion
        id=""
        title="Approvals"
        style="section"
        defaultOpen={false}
        body={
          <div className="p-4">
            <Timeline data={timelineActivities} />
          </div>
        }
      />
    </div>
  );
};
