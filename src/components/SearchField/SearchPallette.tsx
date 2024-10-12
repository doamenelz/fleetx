import { FC, Fragment, useState } from "react";
import { Combobox, Dialog, Transition } from "@headlessui/react";
import { FolderIcon } from "@heroicons/react/24/outline";
// import {
//   CentralNavigationList,
//   NavigationListItemAction,
//   searchQuickActions,
// } from "../models/NavigationList";
import { Compensation, Icon, ICON_SIZES, IconProps } from "../Icons";
import { NavSearchAction, PrimaryNavigation } from "../Navigation";

const searchQuickActions: NavSearchAction[] = [
  { id: "", label: "View Last Payslip", url: "", icon: <Compensation /> },
];

const _tabs = [
  { name: "Modules", id: "modules", isCurrent: false },
  { name: "People", id: "people", isCurrent: false },
];

export const SearchPallette: FC<{ open: boolean; setOpen: Function }> = ({
  open,
  setOpen,
}) => {
  const [query, setQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState(_tabs[0].id);

  const filteredActions = () => {
    var actions: NavSearchAction[] = [];
    PrimaryNavigation.forEach((item) => {
      item.searchActions?.forEach((action) => {
        if (action.label.toLowerCase().includes(query.toLowerCase())) {
          actions.push(action);
        }
      });
    });

    return actions;
  };
  const filteredProjects =
    query === ""
      ? []
      : PrimaryNavigation.filter((item) => {
          return item.searchActions?.filter((_item) =>
            _item.label.toUpperCase().includes(query.toLowerCase())
          );
          //   return item.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <Transition.Root
      show={open}
      as={Fragment}
      afterLeave={() => setQuery("")}
      appear
    >
      <Dialog
        as="div"
        className="relative z-50 "
        onClose={() => setOpen(!open)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 transition-opacity bg-white bg-opacity-80" />
        </Transition.Child>

        <div className="fixed inset-0 z-50 w-screen p-4 overflow-y-auto sm:p-6 md:p-20">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="p-2 max-w-2xl mx-auto overflow-hidden transition-all transform bg-white  shadow-2xl max-[h-1/3] divide-opacity-10 rounded-xl ring-1 ring-gray-200 ring-opacity-5 ">
              <Combobox onChange={() => {}}>
                <div className="relative">
                  <Combobox.Input
                    className="w-full rounded-md border-0 bg-gray-100 px-4 py-2.5 text-gray-900 focus:ring-0 sm:text-sm"
                    placeholder="Search for Application / feature"
                    onChange={(event) => setQuery(event.target.value)}
                  />
                </div>

                {/* {query !== "" && filteredProjects.length !== 0 && (
                  <PillTabs
                    tabs={_tabs}
                    selectedTab={selectedTab}
                    updateTab={setSelectedTab}
                  />
                )} */}

                {(query === "" || filteredProjects.length > 0) && (
                  <Combobox.Options
                    static
                    className="overflow-y-auto divide-y divide-gray-500 max-h-80 scroll-py-2 divide-opacity-10"
                  >
                    <li className="">
                      {query === "" && (
                        <>
                          <h2 className="px-3 mt-4 mb-2 text-xs font-semibold text-gray-900">
                            Quick Actions
                          </h2>
                        </>
                      )}
                    </li>
                    {query === "" && (
                      <li className="pt-2">
                        <h2 className="sr-only">Quick actions</h2>
                        <ul className="text-sm text-gray-700">
                          {searchQuickActions.map((action) => (
                            <Combobox.Button
                              key={action.id}
                              //   value={action}
                              className="flex w-full text-sm items-center text-left text-gray-600 hover:text-warning-50 py-2.5 hover:bg-primary-900 px-2 rounded-md"
                            >
                              <>
                                <Icon
                                  icon={action.icon!}
                                  size={ICON_SIZES.md}
                                />
                                <p className="flex-auto ml-3 truncate ">
                                  {action.label}
                                </p>
                              </>
                            </Combobox.Button>
                          ))}
                        </ul>
                      </li>
                    )}
                  </Combobox.Options>
                )}

                {query !== "" && filteredProjects.length > 0 && (
                  <ul className="pt-2 text-sm text-gray-700">
                    {filteredActions().map((action) => (
                      <Combobox.Button
                        key={action.id}
                        className="flex w-full text-sm text-left text-gray-600 hover:text-warning-50 py-2.5 hover:bg-primary-900 px-2 rounded-md"
                      >
                        <>
                          <Icon icon={action.icon!} size={ICON_SIZES.md} />
                          <p className="flex-auto ml-3 truncate ">
                            {action.label}
                          </p>
                        </>
                      </Combobox.Button>
                    ))}
                  </ul>
                )}

                {query !== "" && filteredActions().length === 0 && (
                  <div className="px-6 text-center py-14 sm:px-14">
                    <FolderIcon
                      className="w-6 h-6 mx-auto text-gray-900 text-opacity-40"
                      aria-hidden="true"
                    />
                    <p className="mt-4 text-sm text-gray-900">
                      We could not find any modules with that term.
                    </p>
                  </div>
                )}
              </Combobox>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
