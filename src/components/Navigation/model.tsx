import {
  Bolt,
  Book,
  Briefcase,
  CalendarRange,
  CarFront,
  ChartPie,
  CircleHelp,
  House,
  IdCard,
  LayoutPanelLeft,
  Settings,
  UsersRound,
} from "lucide-react";
import { NavigationProps } from ".";

export const PrimaryNavigation: NavigationProps[] = [
  {
    id: "dashboard",
    label: "Home",
    link: "/dashboard",
    description: "",
    category: "personal",
    icon: <House className="w-5 h-5" />,
    searchActions: [],
  },
  {
    id: "Inventory",
    label: "Inventory",
    link: "/inventory",
    description: "",
    category: "personal",
    icon: <CarFront className="w-5 h-5" />,
    searchActions: [],
    fillIcon: <CarFront className="w-5 h-5" />,
    children: [
      {
        id: "performance-home",
        label: "Inventory",
        link: "/inventory",
      },

      {
        id: "appraisals",
        label: "Fuel & Expenses",
        link: "/inventory/appraisals",
      },
    ],
  },
  {
    id: "dashboard",
    label: "Service",
    link: "/dashboard",
    description: "",
    category: "personal",
    icon: <Bolt className="w-5 h-5" />,
    searchActions: [],
  },
  {
    id: "home",
    label: "Planner",
    link: "/home",
    description: "",
    category: "personal",
    icon: <CalendarRange className="w-5 h-5" />,
    searchActions: [],
  },
  {
    id: "dashboard",
    label: "Users",
    link: "/dashboard",
    description: "",
    category: "personal",
    icon: <UsersRound className="w-5 h-5" />,
    searchActions: [],
  },
  {
    id: "dashboard",
    label: "Vendors",
    link: "/dashboard",
    description: "",
    category: "personal",
    icon: <Briefcase className="w-5 h-5" />,
    searchActions: [],
  },
  {
    id: "dashboard",
    label: "Reports",
    link: "/dashboard",
    description: "",
    category: "personal",
    icon: <ChartPie className="w-5 h-5" />,
    searchActions: [],
  },
  {
    id: "dashboard",
    label: "Documents",
    link: "/dashboard",
    description: "",
    category: "personal",
    icon: <Book className="w-5 h-5" />,
    searchActions: [],
  },
];

export const SecondaryNavigation: NavigationProps[] = [
  {
    id: "administration",
    label: "Configurations",
    link: "/administration",
    description: "",
    category: "personal",
    icon: <Settings className="w-5 h-5" />,
    searchActions: [],
    children: [
      {
        id: "performance-home",
        label: "Inventory",
        link: "/vehicles",
      },

      {
        id: "planning",
        label: "Schedule",
        link: "/performance/planning",
      },
      {
        id: "appraisals",
        label: "Parts",
        link: "/performance/appraisals",
      },
      {
        id: "benefits",
        label: "Benefits",
        link: "/performance/team",
        children: [
          {
            id: "plans",
            label: "Plans",
            link: "/performance/team/planning",
          },
          {
            id: "team-scorecards",
            label: "HMO",
            link: "/performance/team/scorecards",
          },
          {
            id: "team-interventions",
            label: "Loans",
            link: "/performance/team/scorecards",
          },
        ],
      },
    ],
  },
  {
    id: "design-center",
    label: "Help",
    link: "/compensation",
    category: "admin",
    description: "Payslips, Remittance, Taxes",
    icon: <CircleHelp className="w-5 h-5" />,
  },
];
