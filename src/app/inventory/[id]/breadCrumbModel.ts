import { BreadCrumb } from "@/components";

export const getVehicleBreadCrumbs = (loc: string, id: string) => {
  var _breadCrumbs: BreadCrumb[] = [
    { id: "001", name: loc.split("/")[2], href: "" },
  ];

  const tabs = [
    {
      name: "Summary",
      href: `/inventory/${loc.split("/")[2]}`,
      id: "1",
    },
    {
      name: "Specifications",
      href: `/inventory/${loc.split("/")[2]}/specifications`,
      id: "2",
    },
    {
      name: "Service & Repairs",
      href: `/inventory/${loc.split("/")[2]}/service`,
      id: "3",
    },
    {
      name: "Assignments",
      href: `/inventory/${loc.split("/")[2]}/assignments`,
      id: "4",
    },
    {
      name: "Finance",
      href: `/inventory/${loc.split("/")[2]}/finance`,
      id: "6",
    },
    {
      name: "Schedule & Reminders",
      href: `/inventory/${loc.split("/")[2]}/schedule`,
      id: "5",
    },
    {
      name: "Audit History",
      href: `/inventory/${loc.split("/")[2]}/audit`,
      id: "7",
    },
  ];

  _breadCrumbs.push(tabs.find((breadC) => breadC.id === id)!);
  return _breadCrumbs;
};
