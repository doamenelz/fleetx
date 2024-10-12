import { AvatarCell, SlideOutWrapper } from "@/components";
import { EmployeeSlideOutPanel } from "@/components/Employee";
import { Employee } from "@/models";
import { FC } from "react";
import { useState } from "react";
import ReactDOM from "react-dom";

export enum CELEBRATION_TYPE {
  podium,
  birthday,
  newHire,
  anniversary,
}
export const CelebrationsCell: FC<{
  employee: Employee;
  row3: JSX.Element;
  type: CELEBRATION_TYPE;
  shouldHover?: boolean;
}> = (props) => {
  const [showEmployeeDetails, setShowEmployeeDetails] = useState(false);

  return (
    <>
      <button
        className="w-full text-left"
        onClick={() => setShowEmployeeDetails(true)}
      >
        <AvatarCell
          firstName={props.employee.bioData.firstName}
          lastName={props.employee.bioData.lastName}
          fullName={props.employee.bioData.fullName}
          imageUrl={props.employee.bioData.avatar}
          rowComponent={props.row3}
        />
      </button>

      {/* {ReactDOM.createPortal(
        <SlideOutWrapper
          closeControl={setShowEmployeeDetails}
          openControl={showEmployeeDetails}
        >
          <EmployeeSlideOutPanel selectedEmployee={props.employee!} />
        </SlideOutWrapper>,
        document.getElementById("modal-root")!
      )} */}
    </>
  );
};
