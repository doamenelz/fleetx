"use client";
import { FC, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHeadCell,
  TableRow,
  AVATAR_SIZES,
  Avatar,
  StatusBadge,
  STATUS_COLORS,
  Lbl,
  AvatarCell,
  MenuDropdownItemProp,
  IconDropdown,
  PageLoader,
  SearchField,
  Button,
  BUTTON_SKIN,
  ICON_POSITION,
  SlideOutWrapper,
  ModalHeader,
  InputHandler,
  InputObject,
  findInputById,
  TextInputProps,
} from "@/components";
import { TableContext } from "@/components/Table/TableContext";
import { Person } from "@/models/Person";
import {
  ChevronLeft,
  Ellipsis,
  UserCog,
  UserPen,
  UserRound,
  UserRoundMinus,
  PlusIcon,
  Upload,
  Download,
  ChevronRight,
  SlidersHorizontal,
  Filter,
  UserRoundPlus,
  SquarePlus,
  PackagePlus,
  Trash,
} from "lucide-react";
import { apiHandler } from "@/lib/utilities/apiHelper";
import { RootContext } from "@/context/RootContext";
import { parseRoleDisplay } from "@/models/Modules";
import { setInputs } from "@/lib/utilities/helperFunctions";
import { UserInputModel } from "@/app/users/models/userInputModel";
import { VehicleCategoryDefaultFieldsModel } from "@/app/administration/models/vehicleCategoryInput";

export const CategoryTable: FC<{}> = () => {
  const rootContext = useContext(RootContext);
  const router = useRouter();
  const [users, setUserList] = useState<Person[]>([]);
  const [loadComplete, setLoadComplete] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const vehicleControlItems: MenuDropdownItemProp[] = [
    {
      id: "1",
      label: "Import from CSV",
      function: () => {},
      icon: <Upload className="w-3 h-3" />,
    },
    {
      id: "2",
      label: "Download to CSV",
      function: () => {},
      icon: <Download className="w-3 h-3" />,
    },
  ];

  const getUsers = async () => {
    console.log("Calling Get User");
    const api = await apiHandler({
      url: `${rootContext.envVar.baseURL}/users`,
      method: "GET",
    });
    if (api.success) {
      let response = api.data.data as Person[];
      console.log(response);
      setUserList(response);
      setLoadComplete(true);
      setIsLoading(false);
    } else {
      //TODO: Show Error Component
      console.log("Getting State");
    }
  };

  useEffect(() => {
    setIsLoading(true);

    getUsers();
  }, []);

  return (
    <>
      <div className="flex justify-between gap-2 items-center pt-2 w-full">
        <SearchField
          placeholder="Search"
          setQuery={() => {}}
        />
        <div className="flex gap-2">
          <Lbl label={`${users.length} results`} />
          <div className="border-r pr-2">
            <button className="border p-2 rounded-l hover:bg-slate-50 hover:text-brand-blueRoyal">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="border p-2 rounded-r hover:bg-slate-50 hover:text-brand-blueRoyal">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="items-center flex gap-2">
            <IconDropdown
              items={vehicleControlItems}
              button={
                <div className="p-2 rounded-sm border hover:bg-slate-50 hover:text-brand-blueRoyal">
                  <Ellipsis className="w-4 h-4" />
                </div>
              }
            />
            <Button
              onClick={() => {
                setShowModal(true);
              }}
              label="New Category"
              skin={BUTTON_SKIN.primary}
              icon={{
                position: ICON_POSITION.trailing,
                asset: <PackagePlus className="w-3 h-3" />,
              }}
            />
          </div>
        </div>
      </div>
      {loadComplete ? (
        <TableContext.Provider
          value={{
            updateData: () => {},
            updatePageDetails: () => {},
            data: users,
            page: { totalResults: users.length, tableMax: 8 },
          }}
        >
          <TableContainer
            //   sectionHeader={{
            //     header: "All vendors",
            //     copy: "Manage your Next of vendor, Beneficiaries and Dependents",
            //   }}
            mainContent={
              <Table
                head={
                  <>
                    <TableHeadCell
                      label={"#"}
                      mainCell={true}
                      hideOnMobile={false}
                    />
                    <TableHeadCell
                      label={"Name"}
                      mainCell={false}
                      hideOnMobile={false}
                    />
                    <TableHeadCell
                      label={"Types"}
                      mainCell={true}
                      hideOnMobile={false}
                    />
                    <TableHeadCell
                      label={""}
                      mainCell={false}
                      hideOnMobile={false}
                    />
                    {/* <TableHeadCell
                      label={"Status"}
                      mainCell={false}
                      hideOnMobile={false}
                    />
                    <TableHeadCell
                      label={""}
                      mainCell={false}
                      hideOnMobile={false}
                    /> */}
                  </>
                }
                body={
                  <>
                    {users.map((person, index) => (
                      <TableRow key={person.id}>
                        <TableCell
                          label="#2FDJF"
                          mainCell={false}
                          hideOnMobile={false}
                        />
                        <TableCell
                          label={"Car"}
                          mainCell={false}
                          hideOnMobile={false}
                        />

                        <TableCell
                          label={
                            <ul>
                              {person.role.map((role, index) => (
                                <li key={index}>
                                  <p>• {parseRoleDisplay(role)}</p>
                                </li>
                              ))}
                            </ul>
                          }
                          mainCell={false}
                          hideOnMobile={false}
                        />
                        {/* <TableCell
                          label={person.phone}
                          mainCell={false}
                          hideOnMobile={false}
                        />
                        <TableCell
                          label={
                            <StatusBadge
                              // style="text"
                              label={person.status ?? ""}
                              statusType={
                                person.status === "Active"
                                  ? STATUS_COLORS.success
                                  : person.status === "Deactivated"
                                  ? STATUS_COLORS.declined
                                  : STATUS_COLORS.pending
                              }
                            />
                          }
                          mainCell={true}
                          hideOnMobile={false}
                        /> */}
                        <TableCell
                          label={
                            <IconDropdown
                              items={[
                                {
                                  id: "1",
                                  label: "View User",
                                  function: () => {
                                    router.push(`users/${person.id}`);
                                  },
                                  icon: <UserRound className="w-3 h-3" />,
                                  // type: "link",
                                  href: `users/${person.id}`,
                                },
                                {
                                  id: "2",
                                  label: "Disable User",
                                  function: () => {},
                                  icon: <UserRoundMinus className="w-3 h-3" />,
                                },
                                {
                                  id: "2",
                                  label: "Reset User Password",
                                  function: () => {},
                                  icon: <UserCog className="w-3 h-3" />,
                                },
                              ]}
                              button={
                                <div className="p-2 rounded-sm border hover:border-slate-300 hover:bg-slate-50 hover:text-brand-persianBlue">
                                  <Ellipsis className="w-4 h-4" />
                                </div>
                              }
                            />
                          }
                          mainCell={false}
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
      ) : (
        <PageLoader size="sm" />
      )}

      <SlideOutWrapper
        closeControl={setShowModal}
        openControl={showModal}
        size="lg"
        showDismissButton
      >
        <>
          <EditModalControls />
        </>
      </SlideOutWrapper>
    </>
  );
};

const EditModalControls = () => {
  const [defaultFields, setDefaultFields] = useState<TextInputProps[]>([]);

  const [categoryInput, setCategoryInput] = useState<InputObject[]>([]);
  const [categoryType, categorySetType] = useState<InputObject>();
  const [allCategoryTypes, allCategorySetTypes] = useState<InputObject[]>([]);
  const [showTypeError, setShowTypeError] = useState(false);
  const inputHelper = (input: InputObject) => {
    setCategoryInput(
      categoryInput.map((item) => {
        if (item.id === input.id) {
          return {
            ...item,
            stringValue: input.stringValue,
            boolValue: input.boolValue,
            // dateValue: input.dateValue,
          };
        } else {
          return item;
        }
      })
    );
  };

  const typeHelper = (input: InputObject) => {
    categorySetType({
      ...input,
      stringValue: input.stringValue,
    });
  };

  const dismissModalHandler = () => {
    allCategorySetTypes([]);
  };

  useEffect(() => {
    const _defaultFields: TextInputProps[] =
      VehicleCategoryDefaultFieldsModel().map((item) => {
        return item;
      });
    setDefaultFields(_defaultFields);
    setInputs(VehicleCategoryDefaultFieldsModel(), setCategoryInput);
  }, []);
  return (
    <>
      {" "}
      <div className="z-10 sticky top-0">
        <ModalHeader title="New Category" />
      </div>
      <form className="p-4 space-y-4 relative">
        {/* <InputHandler
              props={{
                ...findInputById(defaultFields, "categoryName")!,
                setValue: inputHelper,
              }}
            /> */}
        <InputHandler
          props={{
            ...findInputById(VehicleCategoryDefaultFieldsModel(), "name")!,
            setValue: typeHelper,
          }}
        />
        <div className="space-y-1">
          <InputHandler
            props={{
              ...findInputById(VehicleCategoryDefaultFieldsModel(), "cat")!,
              setValue: typeHelper,
              showError: showTypeError,
              errorLabel: "Value already exists",
            }}
          />

          <Button
            label="Add Type"
            skin={BUTTON_SKIN.secondary}
            onClick={() => {
              const validateEntry = allCategoryTypes.find(
                (entry) => entry.stringValue === categoryType?.stringValue
              );

              if (validateEntry || validateEntry !== "") {
                setShowTypeError(false);
                allCategorySetTypes([...allCategoryTypes, categoryType!]);
              } else if (validateEntry === "") {
                // categorySetType({ ...categoryType!, stringValue: "" });
              } else {
                setShowTypeError(false);
              }
            }}
          />
        </div>
        {allCategoryTypes.length >= 1 && (
          <div className="border p-4 space-y-2 mt-4">
            <p className="text-[10px] font-semibold text-gray-400">
              ADDED TYPES
            </p>
            <ul>
              {allCategoryTypes.map((cat, index) => (
                <p
                  key={index}
                  className="w-full text-xs font-medium flex items-center justify-between p-2 border-b ring-gray-200"
                >
                  {cat.stringValue}
                  <span>
                    <button
                      onClick={() => {
                        allCategorySetTypes(
                          allCategoryTypes.filter(
                            (category) => category.id !== cat.id
                          )
                        );
                      }}
                    >
                      <Trash className="size-4 hover:text-red-600" />
                    </button>
                  </span>
                </p>
              ))}
            </ul>
          </div>
        )}
        <div className="fixed bottom-8 right-12">
          <Button
            label="Create Category"
            disabled={allCategoryTypes.length >= 1 ? false : true}
          />
        </div>
      </form>
    </>
  );
};
