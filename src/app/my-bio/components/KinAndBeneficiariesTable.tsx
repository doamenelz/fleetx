import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHeadCell,
  TableRow,
  AVATAR_SIZES,
  Avatar,
  AvatarCell,
  BUTTON_SKIN,
  ModalBackdrop,
  SlideOutWrapper,
  SectionHeader,
  TextLabel,
  Accordion,
  timelineActivities,
  Timeline,
  MenuDropdown,
  MenuDropdownItemProp,
  CenterCardModal,
  GridLayout,
  GRID_TYPE,
  InputHandler,
  TEXT_INPUT_SIZE,
  INPUT_TYPES,
  DatePicker,
  Button,
  ICON_POSITION,
} from "@/components";
import { Kin } from "../../../modules/MyBio/models/Kin";
import { useState, useRef, useEffect, FC } from "react";
import { classNames } from "@/lib/utilities/helperFunctions";
import { formatDate, DATE_OPTIONS } from "@/lib/utilities/dateHelpers";
import { Menu } from "@headlessui/react";
import { TableContext } from "@/components/Table/TableContext";
import {
  ArrowRightCircleIcon,
  PencilIcon,
  PlusIcon,
} from "@heroicons/react/20/solid";
import { KinAndBeneficiariesForm } from "./KinAndBeneficiariesForm";

export const KinAndBeneficiariesTable: FC<{ data: Kin[] }> = ({ data }) => {
  const [openControl, setOpenControl] = useState(false);

  const ref = useRef<Element | null>(null);
  useEffect(() => {
    ref.current = document.getElementById("modal");
  }, []);

  const [selectedRequest, setSelectedRequest] = useState<Kin>();

  const onClickHandler = (selected: Kin) => {
    setSelectedRequest(selected);
    console.log(selected);
    setOpenControl(true);
  };

  const _items: MenuDropdownItemProp[] = [
    {
      id: "01",
      label: "View",
      function: () => {},
    },
    {
      id: "02",
      label: "Edit",
      function: () => {},
    },
  ];

  return (
    <>
      <TableContext.Provider
        value={{
          updateData: () => {},
          updatePageDetails: () => {},
          data: data,
          page: { totalResults: data.length, tableMax: 8 },
        }}
      >
        <TableContainer
          mainContent={
            <Table
              head={
                <>
                  <TableHeadCell
                    label={"Bio Details"}
                    mainCell={true}
                    hideOnMobile={false}
                  />
                  <TableHeadCell
                    label={"Address"}
                    mainCell={false}
                    hideOnMobile={false}
                  />
                  <TableHeadCell
                    label={"Phone Number"}
                    mainCell={false}
                    hideOnMobile={false}
                  />
                  <TableHeadCell
                    label={"Email"}
                    mainCell={false}
                    hideOnMobile={false}
                  />
                  <TableHeadCell
                    label={""}
                    mainCell={false}
                    hideOnMobile={false}
                  />
                </>
              }
              body={
                <>
                  {data.map((kin, index) => (
                    <TableRow key={kin.id}>
                      <TableCell
                        label={
                          <div>
                            <p className="font-medium text-gray-900">
                              {kin.firstName} {kin.lastName}
                            </p>
                            <div className={classNames("text-gray-500")}>{`${
                              kin.relationship
                            } | ${kin.sex} ${
                              kin.isEmergency === true
                                ? "| Emergency Contact"
                                : ""
                            } ${
                              kin.percentage !== undefined
                                ? `| ${kin.percentage}`
                                : ""
                            }`}</div>
                          </div>
                        }
                        mainCell={false}
                        hideOnMobile={false}
                      />
                      <TableCell
                        label={
                          <div>
                            <div className="text-gray-900">{kin.address}</div>
                            <div className="text-gray-600">{` ${kin.state} | ${kin.country}`}</div>
                          </div>
                        }
                        mainCell={false}
                        hideOnMobile={false}
                      />
                      <TableCell
                        label={
                          <>
                            {kin.mobile !== undefined && (
                              <div className="text-gray-600">{`M: ${kin.mobile}`}</div>
                            )}
                            {kin.home !== undefined && (
                              <div className="text-gray-600">{`H: ${kin.home}`}</div>
                            )}
                          </>
                        }
                        mainCell={false}
                        hideOnMobile={false}
                      />
                      <TableCell
                        label={kin.email}
                        mainCell={false}
                        hideOnMobile={false}
                      />
                      <TableCell
                        label={
                          <Button
                            onClick={() => onClickHandler(kin)}
                            label="Edit"
                            skin={BUTTON_SKIN.secondary}
                            icon={{
                              position: ICON_POSITION.trailing,
                              asset: <PencilIcon className="w-3 h-3" />,
                            }}
                          />
                        }
                        mainCell={true}
                        hideOnMobile={false}
                      />
                    </TableRow>
                  ))}
                </>
              }
            />
          }
        ></TableContainer>
      </TableContext.Provider>

      <ModalBackdrop selector="modal">
        <SlideOutWrapper
          closeControl={setOpenControl}
          openControl={openControl}
          size="3xl"
          showDismissButton
        >
          <>
            <KinAndBeneficiariesForm kin={selectedRequest} />
          </>
        </SlideOutWrapper>
      </ModalBackdrop>
    </>
  );
};
