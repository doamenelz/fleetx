import { FC } from "react";
import { Employee } from "../../models/Employee";
import { AVATAR_SIZES, Avatar, AvatarCell } from "../Avatar";
import { TextLabel } from "../Typography";

/** TODO: Enable View Profile Summary after ny information is completed */

export const EmployeeSlideOutPanel: FC<{ selectedEmployee: Employee }> = (
  props
) => {
  return (
    <>
      <div className="h-24 px-4 py-6 sm:px-6 bg-gradient-to-r from-gray-900 to-gray-800"></div>
      <div className="flex-col items-center px-4 -mt-12 space-y-4 group">
        <Avatar
          size={AVATAR_SIZES.xxl}
          firstName={props.selectedEmployee.bioData.firstName}
          lastName={props.selectedEmployee.bioData.lastName}
          imageUrl={props.selectedEmployee.bioData.avatar}
        />

        <div className="space-y-1">
          <p className="text-2xl font-bold text-gray-700 ">
            {props.selectedEmployee?.bioData.firstName}{" "}
            {props.selectedEmployee?.bioData.lastName}
          </p>
          <p className="text-base text-gray-800">
            {props.selectedEmployee?.jobInformation?.jobTitle}
          </p>
        </div>
      </div>
      <div className="px-4 pt-4 mt-4 space-y-5 border-t">
        <TextLabel
          label="Email"
          copy={
            <button
              className="text-sm font-medium text-gray-900 hover:text-primary-900"
              onClick={() =>
                (window.location.href = `mailto:${
                  props.selectedEmployee?.contactDetails?.emailAddress ?? ""
                }`)
              }
            >
              {props.selectedEmployee?.contactDetails?.emailAddress ?? ""}
            </button>
          }
        />
        <TextLabel
          label="Phone Number"
          copy={props.selectedEmployee?.contactDetails?.phoneNumber ?? ""}
        />
        <TextLabel
          label="Location"
          copy={props.selectedEmployee.jobInformation?.location ?? ""}
        />
        <TextLabel
          label="Team"
          copy={props.selectedEmployee?.jobInformation?.teamName ?? ""}
        />
        <TextLabel
          label="Reports to"
          copy={<AvatarCell firstName="" lastName="" fullName="" imageUrl="" />}
        />
        {/* <p className="pt-8 font-medium">Celebrations</p> */}
        {/* <CelebrationCard />
    <CelebrationCard />
    <CelebrationCard /> */}
      </div>
      {/* <CelebrationCard
        type={CELEBRATION_TYPE.anniversary}
        value="Resumes today"
      />
      <CelebrationCard type={CELEBRATION_TYPE.podium} value="Resumes today" />
      <CelebrationCard
        type={CELEBRATION_TYPE.newHire}
        value={`Resumes on ${props.selectedEmployee.resumptionDate?.toDateString()}`}
      />
      <CelebrationCard
        type={CELEBRATION_TYPE.birthday}
        value={props.selectedEmployee.birthday?.toDateString() ?? ""}
      /> */}
      {/* <div className="px-4 py-6">
        <QuickLink
          label="View Profile Summary"
          url={props.selectedEmployee.id}
          id="#"
          state={{ employee: props.selectedEmployee }}
        />
      </div> */}
    </>
  );
};
