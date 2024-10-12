"use client";
import { FC, useContext, useState, useEffect, useRef } from "react";
import {
  FormLayout,
  GRID_TYPE,
  GridLayout,
  TextInput,
  TextArea,
  TEXT_INPUT_SIZE,
  Dropdown,
  ModalBackdrop,
  TextLabel,
  Button,
  InputHandler,
  BUTTON_SKIN,
  ICON_POSITION,
  findInputById,
  InputObject,
  SlideOutWrapper,
  SectionHeader,
  BodyCopy,
  setScreenWidth,
  SCREEN_WIDTH,
} from "../../../components";
import { ProfileContext } from "./EditProfile";
import { RootContext } from "@/context/RootContext";
import { INPUT_TYPES } from "../../../components";
import { ArrowRightCircleIcon } from "@heroicons/react/20/solid";
import { BasicInfo, ContactInfo, OtherInfo } from "./ProfileFormView.types";
import { classNames, setInputs } from "@/lib/utilities/helperFunctions";
import { DATE_OPTIONS, formatDate } from "@/lib/utilities/dateHelpers";
import {
  EditBasicInformationList,
  BasicInformationCopy,
} from "./ProfileFormBasicInformation";
import {
  ContactInformationCopy,
  EditContactInformation,
} from "./ProfileFormContactInfo";
import { JobSummaryCard } from "./JobSummaryCard";
import {
  OtherInformation,
  OtherInformationCopy,
} from "./ProfileFormOtherInformation";

export const ProfileFormView: FC<{ editMode: boolean }> = ({ editMode }) => {
  const ref = useRef<Element | null>(null);
  const context = useContext(ProfileContext);
  const rootContext = useContext(RootContext);
  const [showModal, setShowModal] = useState(false);
  const [editBasicInfo, setEditBasicInfo] = useState(false);
  const [selectedEdit, setSelectedEdit] = useState<
    "basicInfo" | "otherInfo" | "contactInformation"
  >("basicInfo");
  const [editContactInformation, setEditContactInformation] = useState(false);
  const [editOtherInfo, setEditOtherInfo] = useState(false);
  const [basicInfoInputs, setBasicInfoInputs] = useState<InputObject[]>([]);

  const clickFormHandler = () => {
    rootContext.setNotificationHeader("Success");
    rootContext.setNotificationCopy!(
      "Your profile details were submitted successfully"
    );
    rootContext.toggleNotification(true);
    console.log(rootContext.notificationCopy);
    // navigate("/dashboard");
  };

  const showModalHandler = () => {
    setShowModal(false);
  };

  const toggleEditMode = (
    editType: "basicInfo" | "otherInfo" | "contactInformation"
  ) => {
    setSelectedEdit(editType);
    setShowModal(true);
  };

  useEffect(() => {
    // ref.current = document.getElementById("modal");
  }, []);

  return (
    <>
      <div
        className={classNames(
          "py-8 px-4",
          setScreenWidth(SCREEN_WIDTH.regular)
        )}
      >
        <FormLayout title="Job Details" defaultOpen={true}>
          <JobSummaryCard />
        </FormLayout>
        <FormLayout title="Basic Information" copy="" defaultOpen={false}>
          <BasicInformationCopy employee={context.employee} />
          {/* <PendingRequest /> */}
          <Button
            label="Request Change"
            onClick={() => toggleEditMode("basicInfo")}
            skin={BUTTON_SKIN.secondaryColor}
          />
        </FormLayout>
        <FormLayout title="Contact Information" copy="">
          <ContactInformationCopy employee={context.employee} />
          <Button
            label="Request Change"
            onClick={() => toggleEditMode("contactInformation")}
            skin={BUTTON_SKIN.secondaryColor}
          />
        </FormLayout>
        <FormLayout title="Other Information" copy="" defaultOpen={false}>
          <OtherInformationCopy employee={context.employee} />
          <Button
            label="Request Change"
            onClick={() => toggleEditMode("otherInfo")}
            skin={BUTTON_SKIN.secondaryColor}
          />
        </FormLayout>
        {editMode && (
          <div className="my-6">
            <Button label="Submit Profile Changes" onClick={clickFormHandler} />
          </div>
        )}
      </div>
      <ModalBackdrop selector="modal">
        <SlideOutWrapper
          closeControl={showModalHandler}
          openControl={showModal}
          size="3xl"
          showDismissButton
        >
          <>
            <BodyCopy
              style="mx-4 mt-4 p-4 text-sm rounded-md border-primary-600 bg-primary-200 text-primary-900 font-medium"
              text="Changes made to your profile may require approvals from your
              HR Administrator"
            />

            {selectedEdit === "basicInfo" && (
              <EditBasicInformationList
                employee={context.employee}
                dismissModal={showModalHandler}
              />
            )}
            {selectedEdit === "contactInformation" && (
              <EditContactInformation
                employee={context.employee}
                dismissModal={showModalHandler}
              />
            )}
            {selectedEdit === "otherInfo" && (
              <OtherInformation
                employee={context.employee}
                dismissModal={showModalHandler}
              />
            )}
          </>
        </SlideOutWrapper>
      </ModalBackdrop>
    </>
  );
};

const PendingRequest = () => {
  return (
    <div className="text-xs text-center text-gray-800 bg-primary-50 rounded py-2 items-center px-4 mt-6">
      You have a pending Change Request awaiting approvals •
      <Button
        componentType="link"
        link="/my-bio/requests"
        label="View Request"
        skin={BUTTON_SKIN.linkColor}
        icon={{
          position: ICON_POSITION.trailing,
          asset: <ArrowRightCircleIcon className="w-3 h-3" />,
        }}
      />
    </div>
  );
};
