import {
  ModalBackdrop,
  SectionHeader,
  CenterCardModal,
  GridLayout,
  GRID_TYPE,
  InputHandler,
  TEXT_INPUT_SIZE,
  INPUT_TYPES,
  DatePicker,
  Button,
} from "@/components";
import { Kin } from "../../../../modules/MyBio/models/Kin";
import {
  useState,
  useRef,
  useEffect,
  FC,
  Dispatch,
  SetStateAction,
} from "react";
import { classNames } from "@/lib/utilities/helperFunctions";
import { ConfirmationContact } from "../../../../modules/MyBio/models/ConfirmationContact";

export const CreateEditGuarantor: FC<{
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}> = ({ showModal, setShowModal }) => {
  const [openControl, setOpenControl] = useState(false);

  const ref = useRef<Element | null>(null);
  useEffect(() => {
    ref.current = document.getElementById("modal");
  }, []);

  const [selectedRequest, setSelectedRequest] = useState<ConfirmationContact>();

  //   const onClickHandler = (selected: Kin) => {
  //     setSelectedRequest(selected);
  //     setOpenControl(true);
  //   };
  return (
    <ModalBackdrop selector="modal">
      <CenterCardModal
        closeControl={setShowModal}
        openControl={showModal}
      >
        <div className="px-4">
          <div>
            <SectionHeader
              title="Update Profile"
              copy=""
              button={
                <button
                  onClick={() => setOpenControl(false)}
                  className="rounded-full hover:bg-gray-900 hover:text-gray-100 p-2 bg-gray-100"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              }
            />
          </div>
          <div className="py-4">
            <GridLayout
              verticalPadding={true}
              type={GRID_TYPE.twoCol}
            >
              <InputHandler
                props={{
                  id: "fullName",
                  label: "Name",
                  setValue: () => {},
                  span: TEXT_INPUT_SIZE.span1,
                  style: INPUT_TYPES.text,
                  editMode: true,
                  placeHolder: selectedRequest?.fullName,
                  setShowError: () => {},
                  copy: selectedRequest?.fullName,
                  defaultValue: selectedRequest?.fullName,
                }}
              />
              <InputHandler
                props={{
                  id: "email",
                  label: "Email",
                  setValue: () => {},
                  span: TEXT_INPUT_SIZE.span1,
                  style: INPUT_TYPES.email,
                  editMode: true,
                  setShowError: () => {},
                  copy: selectedRequest?.email ?? "-",
                  placeHolder: "Enter an Email address",
                }}
              />

              <InputHandler
                props={{
                  id: "address-street",
                  label: "Address",
                  setValue: () => {},
                  setShowError: () => {},
                  span: TEXT_INPUT_SIZE.full,
                  style: INPUT_TYPES.textarea,
                  editMode: true,
                  copy: selectedRequest?.address.streetAddress ?? "-",
                }}
              />
              <InputHandler
                props={{
                  id: "country",
                  label: "Country",
                  setValue: () => {},
                  setShowError: () => {},
                  span: TEXT_INPUT_SIZE.span1,
                  editMode: true,
                  copy: selectedRequest?.address.city ?? "-",
                  style: INPUT_TYPES.dropdown,
                  items: ["Select a Country", "Nigeria", "Canada"],
                  defaultValue: "Nigeria",
                }}
              />
              <InputHandler
                props={{
                  id: "state",
                  label: "State",
                  setValue: () => {},
                  span: TEXT_INPUT_SIZE.span1,
                  style: INPUT_TYPES.dropdown,
                  items: ["Select a State", "Lagos", "Abuja"],
                  defaultValue: "Lagos",
                  editMode: true,
                  setShowError: () => {},
                  copy: selectedRequest?.address.state ?? "-",
                }}
              />

              <InputHandler
                props={{
                  id: "mobileNumber",
                  label: "Mobile #",
                  setValue: () => {},
                  setShowError: () => {},
                  span: TEXT_INPUT_SIZE.span1,
                  style: INPUT_TYPES.phone,
                  editMode: true,
                  copy: selectedRequest?.mobileNumber ?? "-",
                  placeHolder: "Enter your Mobile Number",
                }}
              />

              {/* <InputHandler
                id="employer"
                label="Employer"
                setValue={() => {}}
                span={TEXT_INPUT_SIZE.span1}
                style={INPUT_TYPES.text}
                editMode={true}
                copy={selectedRequest?.employer}
                defaultValue={selectedRequest?.employer}
              />

              <InputHandler
                id="relationship"
                label="Relationship"
                setValue={() => {}}
                span={TEXT_INPUT_SIZE.span1}
                style={INPUT_TYPES.dropdown}
                items={["Select a Relationship", "Spouse", "Child", "Sibling"]}
                editMode={true}
                copy={selectedRequest?.relationship}
                defaultValue={selectedRequest?.relationship}
              />

              <InputHandler
                id="position"
                label="Job Position"
                setValue={() => {}}
                span={TEXT_INPUT_SIZE.span1}
                style={INPUT_TYPES.text}
                editMode={true}
                copy={selectedRequest?.jobPosition ?? "-"}
              />

              <InputHandler
                id="relationship-duration"
                label="Relationship Duration"
                setValue={() => {}}
                span={TEXT_INPUT_SIZE.span1}
                style={INPUT_TYPES.phone}
                editMode={true}
                copy={selectedRequest?.relationshipDuration ?? "-"}
                placeHolder="Enter the duration of your relationship"
              /> */}
            </GridLayout>
          </div>
          <Button label="Submit Changes" />
        </div>
      </CenterCardModal>
    </ModalBackdrop>
  );
};
