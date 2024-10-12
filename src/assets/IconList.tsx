import {
  ArrowDownTrayIcon,
  ArrowLongDownIcon,
  ArrowLongUpIcon,
  ArrowRightIcon,
  ArrowTrendingDownIcon,
  ArrowTrendingUpIcon,
  CalendarDaysIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import {
  CakeIcon,
  TrophyIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";
import { Ellipsis, EllipsisVertical } from "lucide-react";

export const IconList = {
  arrowRight: <ArrowRightIcon />,
  calendarDays: <CalendarDaysIcon />,
  birthdays: <CakeIcon />,
  podium: <TrophyIcon />,
  hires: <UserPlusIcon />,
  download: <ArrowDownTrayIcon />,
  trendArrowDown: <ArrowTrendingDownIcon />,
  trendArrowUp: <ArrowTrendingUpIcon />,
  arrowUp: <ArrowLongUpIcon />,
  arrowDown: <ArrowLongDownIcon />,
  search: <MagnifyingGlassIcon />,
  ellipsis: <EllipsisVertical />,
};
