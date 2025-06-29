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
  Lbl,
  AvatarCell,
  PageLoader,
  SearchField,
  Button,
  BUTTON_SKIN,
  ICON_POSITION,
  SlideOutWrapper,
  ModalHeader,
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
  Factory,
  FactoryIcon,
  EditIcon,
} from "lucide-react";
import { apiHandler } from "@/lib/utilities/apiHelper";
import { RootContext } from "@/context/RootContext";
import { parseRoleDisplay } from "@/models/Modules";
import { setInputs } from "@/lib/utilities/helperFunctions";
import { UserInputModel } from "@/app/users/models/userInputModel";
import { VehicleCategoryDefaultFieldsModel } from "@/app/administration/models/vehicleCategoryInput";
import { Manufacturer } from "@/models/Vehicle/Manufacturer";

//TODO: Add Pagination
export const ManufacturerTable: FC<{}> = () => {
  const rootContext = useContext(RootContext);
  const router = useRouter();
  const [manufacturers, setManufacturerList] = useState<Manufacturer[]>([]);
  const [selectedManufacturer, setSelectedManufacturer] =
    useState<Manufacturer>();
  const [loadComplete, setLoadComplete] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // const tableControlItems: MenuDropdownItemProp[] = [
  //   {
  //     id: "1",
  //     label: "Import from CSV",
  //     function: () => {},
  //     icon: <Upload className="w-3 h-3" />,
  //   },
  //   {
  //     id: "2",
  //     label: "Download to CSV",
  //     function: () => {},
  //     icon: <Download className="w-3 h-3" />,
  //   },
  // ];

  // const manufacturerControlItems: MenuDropdownItemProp[] = [
  //   {
  //     id: "1",
  //     label: "View Manufacturer",
  //     function: () => {},
  //     icon: <FactoryIcon className="w-3 h-3" />,
  //   },
  //   {
  //     id: "2",
  //     label: "Edit Manufacturer",
  //     function: () => {},
  //     icon: <EditIcon className="w-3 h-3" />,
  //   },
  // ];

  const getManufacturers = async () => {
    console.log("Calling Get User");
    const api = await apiHandler({
      url: `${rootContext.envVar.baseURL}/manufacturers`,
      method: "GET",
    });
    if (api.success) {
      let response = api.data.data as Manufacturer[];
      console.log(response);
      setManufacturerList(response);
      setLoadComplete(true);
      setIsLoading(false);
    } else {
      //TODO: Show Error Component
      console.log("Getting State");
    }
  };

  const getTrimCount = (manufacturer: Manufacturer) => {
    let count = 0;
    for (let index = 0; index < manufacturer.models?.length; index++) {
      const trimCount = manufacturer.models[index].trims.length;
      count += trimCount;
    }

    return count;
  };

  useEffect(() => {
    setIsLoading(true);

    getManufacturers();
  }, []);

  return (
    <>
      {loadComplete ? (
        <TableContext.Provider
          value={{
            updateData: () => {},
            updatePageDetails: () => {},
            data: manufacturers,
            page: { totalResults: manufacturers.length, tableMax: 8 },
          }}
        >
          <TableContainer
            sectionHeader={{
              header: "Manufacturers",
              copy: "",
              button: (
                <div className="flex justify-between gap-2 items-center pt-2 w-full">
                  <SearchField
                    placeholder="Search"
                    setQuery={() => {}}
                  />

                  <div className="flex gap-2">
                    {manufacturers.length > 8 && (
                      <div className="border-r pr-2">
                        <button className="border p-2 rounded-l hover:bg-slate-50 hover:text-brand-blueRoyal">
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button className="border p-2 rounded-r hover:bg-slate-50 hover:text-brand-blueRoyal">
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    )}

                    {/* <div className="items-center flex gap-2 border-l pl-2">
                      <IconDropdown
                        items={tableControlItems}
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
                        componentType="link"
                        link="/administration/inventory/manufacturers/create"
                        label="New Manufacturer"
                        skin={BUTTON_SKIN.primary}
                        icon={{
                          position: ICON_POSITION.trailing,
                          asset: <Factory className="w-3 h-3" />,
                        }}
                      />
                    </div> */}
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
                      mainCell={true}
                      hideOnMobile={false}
                    />
                    <TableHeadCell
                      label={"Models"}
                      mainCell={false}
                      hideOnMobile={false}
                    />
                    <TableHeadCell
                      label={"Trims"}
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
                    {manufacturers.map((manufacturer, index) => (
                      <TableRow key={manufacturer.id}>
                        <TableCell
                          label={manufacturer.name}
                          mainCell={false}
                          hideOnMobile={false}
                        />
                        <TableCell
                          label={`${manufacturer.models?.length ?? 0} Model(s)`}
                          mainCell={false}
                          hideOnMobile={false}
                        />

                        <TableCell
                          label={`${getTrimCount(manufacturer)} Trim(s)`}
                          mainCell={false}
                          hideOnMobile={false}
                        />

                        {/* <TableCell
                          label={
                            <IconDropdown
                              items={[
                                {
                                  id: "1",
                                  label: "View Manufacturer",
                                  function: () => {
                                    setShowModal(true);
                                    setSelectedManufacturer(manufacturer);
                                  },
                                  icon: <FactoryIcon className="w-3 h-3" />,
                                },
                                {
                                  id: "2",
                                  label: "Edit Manufacturer",
                                  function: () => {
                                    setShowModal(true);
                                    setSelectedManufacturer(manufacturer);
                                  },
                                  icon: <EditIcon className="w-3 h-3" />,
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
                          centerCell
                        /> */}
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
      >
        <>
          <ViewManufacturerDetails manufacturer={selectedManufacturer!} />
        </>
      </SlideOutWrapper>
    </>
  );
};

//TODO: Models Empty State
const ViewManufacturerDetails: FC<{ manufacturer: Manufacturer }> = ({
  manufacturer,
}) => {
  return (
    <>
      <div className="w-full bg-gradient-to-bl from-gray-700 via-gray-900 to-black p-6">
        <p className="text-xs text-gray-400 font-light">Manufacturer</p>
        <p className="font-bold text-2xl text-gray-50">{manufacturer.name}</p>
      </div>
      {manufacturer.models?.length < 1 ||
      manufacturer.models?.length === undefined ? (
        <p>No Models added yet</p>
      ) : (
        <div className="p-4">
          {manufacturer.models?.map((model) => (
            <ModelCard model={model} />
          ))}
        </div>
      )}
    </>
  );
};

const ModelCard: FC<{
  model: {
    id: string;
    name: string;
    class: string[];
    trims?: {
      id: string;
      name: string;
      class: string;
    }[];
  };
}> = ({ model }) => {
  return (
    <>
      <div className="p-3 my-2 rounded-md border-c-mid border">
        <p className="text-xs font-light text-gray-500">Model</p>
        <p className="font-semibold text-sm border-b pb-2 flex justify-between">
          {model.name}{" "}
          <span className="text-xs font-light text-gray-600">{`${model.trims?.length} Trim(s)`}</span>
        </p>
        <ul className="space-y-2 [&>*:nth-child(odd)]:bg-indigo-50/30 py-2">
          {model.trims?.map((item) => (
            <p className="text-xs p-2">{item.name}</p>
          ))}
        </ul>
      </div>
    </>
  );
};
// const EditModalControls = () => {
//   const [defaultFields, setDefaultFields] = useState<TextInputProps[]>([]);

//   const [categoryInput, setCategoryInput] = useState<InputObject[]>([]);
//   const [categoryType, categorySetType] = useState<InputObject>();
//   const [allCategoryTypes, allCategorySetTypes] = useState<InputObject[]>([]);
//   const [showTypeError, setShowTypeError] = useState(false);
//   const inputHelper = (input: InputObject) => {
//     setCategoryInput(
//       categoryInput.map((item) => {
//         if (item.id === input.id) {
//           return {
//             ...item,
//             stringValue: input.stringValue,
//             boolValue: input.boolValue,
//             // dateValue: input.dateValue,
//           };
//         } else {
//           return item;
//         }
//       })
//     );
//   };

//   const typeHelper = (input: InputObject) => {
//     categorySetType({
//       ...input,
//       stringValue: input.stringValue,
//     });
//   };

//   const dismissModalHandler = () => {
//     allCategorySetTypes([]);
//   };

//   useEffect(() => {
//     const _defaultFields: TextInputProps[] =
//       VehicleCategoryDefaultFieldsModel().map((item) => {
//         return item;
//       });
//     setDefaultFields(_defaultFields);
//     setInputs(VehicleCategoryDefaultFieldsModel(), setCategoryInput);
//   }, []);
//   return (
//     <>
//       {" "}
//       <div className="z-10 sticky top-0">
//         <ModalHeader title="New Manufacturer" />
//       </div>
//       <form className="p-4 space-y-4 relative">
//         {/* <InputHandler
//               props={{
//                 ...findInputById(defaultFields, "categoryName")!,
//                 setValue: inputHelper,
//               }}
//             /> */}
//         <InputHandler
//           props={{
//             ...findInputById(VehicleCategoryDefaultFieldsModel(), "name")!,
//             setValue: typeHelper,
//           }}
//         />
//         <div className="space-y-1">
//           <InputHandler
//             props={{
//               ...findInputById(VehicleCategoryDefaultFieldsModel(), "cat")!,
//               setValue: typeHelper,
//               showError: showTypeError,
//               errorLabel: "Value already exists",
//             }}
//           />

//           <Button
//             label="Add Type"
//             skin={BUTTON_SKIN.secondary}
//             onClick={() => {
//               const validateEntry = allCategoryTypes.find(
//                 (entry) => entry.stringValue === categoryType?.stringValue
//               );

//               if (validateEntry || validateEntry !== undefined) {
//                 setShowTypeError(false);
//                 allCategorySetTypes([...allCategoryTypes, categoryType!]);
//               } else if (validateEntry === "") {
//                 // categorySetType({ ...categoryType!, stringValue: "" });
//               } else {
//                 setShowTypeError(false);
//               }
//             }}
//           />
//         </div>
//         {allCategoryTypes.length >= 1 && (
//           <div className="border p-4 space-y-2 mt-4">
//             <p className="text-[10px] font-semibold text-gray-400">
//               ADDED TYPES
//             </p>
//             <ul>
//               {allCategoryTypes.map((cat, index) => (
//                 <p
//                   key={index}
//                   className="w-full text-xs font-medium flex items-center justify-between p-2 border-b ring-gray-200"
//                 >
//                   {cat.stringValue}
//                   <span>
//                     <button
//                       onClick={() => {
//                         allCategorySetTypes(
//                           allCategoryTypes.filter(
//                             (category) => category.id !== cat.id
//                           )
//                         );
//                       }}
//                     >
//                       <Trash className="size-4 hover:text-red-600" />
//                     </button>
//                   </span>
//                 </p>
//               ))}
//             </ul>
//           </div>
//         )}
//         <div className="fixed bottom-8 right-12">
//           <Button
//             label="Create Category"
//             disabled={allCategoryTypes.length >= 1 ? false : true}
//           />
//         </div>
//       </form>
//     </>
//   );
// };
