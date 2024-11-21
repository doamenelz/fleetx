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
  Upload,
  Download,
  ChevronRight,
  PackagePlus,
  Trash,
  Lock,
} from "lucide-react";
import { apiHandler } from "@/lib/utilities/apiHelper";
import { RootContext } from "@/context/RootContext";
import {
  getSessionStorageInfo,
  SessionStore,
  setInputs,
} from "@/lib/utilities/helperFunctions";
import { VehicleCategoryDefaultFieldsModel } from "@/app/administration/models/vehicleCategoryInput";
import { VehicleCategories } from "@/models/Configurations";

export const CategoryTable: FC<{}> = () => {
  const rootContext = useContext(RootContext);
  const router = useRouter();
  const [users, setUserList] = useState<Person[]>([]);
  const [categories, setCategories] = useState<VehicleCategories[]>([]);
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

  const getTypes = () => {
    const store = getSessionStorageInfo(
      SessionStore.configurations,
      "VEHICLE_CATEGORIES"
    );

    if (store !== null || store !== undefined) {
      const parsedTypes = store!.find(
        (item: { type: string }) => item.type === "VEHICLE_CATEGORIES"
      ) as { type: string; types: VehicleCategories[] };
      setCategories(parsedTypes.types);
      setLoadComplete(true);
      setIsLoading(false);
      console.log(parsedTypes);
    } else {
      //TODO: Call API
    }
  };

  useEffect(() => {
    setIsLoading(true);

    getTypes();
  }, []);

  return (
    <>
      {loadComplete ? (
        <TableContext.Provider
          value={{
            updateData: () => {},
            updatePageDetails: () => {},
            data: users,
            page: { totalResults: categories.length, tableMax: 8 },
          }}
        >
          <TableContainer
            sectionHeader={{
              header: <SearchField placeholder="Search" setQuery={() => {}} />,
              copy: "",
              button: (
                <div className="flex justify-between gap-2 items-center w-full">
                  <div className="flex gap-2">
                    {/* <Lbl label={`${categories.length} results`} /> */}
                    {/* <div className="border-r pr-2">
                      <button className="border p-2 rounded-l hover:bg-slate-50 hover:text-brand-blueRoyal">
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button className="border p-2 rounded-r hover:bg-slate-50 hover:text-brand-blueRoyal">
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div> */}
                    <div className="items-center flex gap-2">
                      {/* <IconDropdown
                        items={vehicleControlItems}
                        button={
                          <div className="p-2 rounded-sm border hover:bg-slate-50 hover:text-brand-blueRoyal">
                            <Ellipsis className="w-4 h-4" />
                          </div>
                        }
                      /> */}
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
              ),
            }}
            mainContent={
              <Table
                head={
                  <>
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
                  </>
                }
                body={
                  <>
                    {categories.map((category, index) => (
                      <TableRow key={index}>
                        <TableCell
                          label={
                            <p className="capitalize font-semibold">
                              {category.name}
                            </p>
                          }
                          mainCell={false}
                          hideOnMobile={false}
                        />

                        <TableCell
                          label={
                            <ul>
                              {category.class.map((type, index) => (
                                <li key={index}>
                                  <p>• {type}</p>
                                </li>
                              ))}
                            </ul>
                          }
                          mainCell={false}
                          hideOnMobile={false}
                        />

                        <TableCell
                          label={
                            category.canEdit ? (
                              <p className="flex gap-1 items-center text-gray-500 hover:cursor-not-allowed">
                                <span>
                                  <Lock className="size-3 " />
                                </span>
                                Edit{" "}
                              </p>
                            ) : (
                              <Button
                                label="Edit"
                                skin={BUTTON_SKIN.secondary}
                              />
                            )
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

              if (validateEntry) {
                setShowTypeError(true);
              } else if (validateEntry === "") {
                // categorySetType({ ...categoryType!, stringValue: "" });
              } else {
                setShowTypeError(false);
                allCategorySetTypes([...allCategoryTypes, categoryType!]);
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
                        console.log(allCategoryTypes);
                        allCategorySetTypes(
                          allCategoryTypes.filter(
                            (category) =>
                              category.stringValue !== cat.stringValue
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
