import { IconList } from "@/assets/IconList";
import { Tab } from "@/components";

export const eventTabIds = {
  birthdays: "birthdays",
  newHires: "newHires",
  anniversaries: "anniversaries",
  podium: "podium",
};

export const eventTabList: Tab[] = [
  {
    name: "Hires",
    href: "#",
    id: eventTabIds.newHires,
    icon: IconList.hires,
  },
  {
    name: "Birthdays",
    href: "#",
    id: eventTabIds.birthdays,
    icon: IconList.birthdays,
  },
  {
    name: "Anniversaries",
    href: "#",
    id: eventTabIds.anniversaries,
    icon: IconList.calendarDays,
  },
  //   {
  //     name: "Podium",
  //     href: "#",
  //     id: eventTabIds.podium,

  //     icon: IconList.podium,
  //   },
];
