import {
  Bolt,
  Book,
  Briefcase,
  CalendarRange,
  Car,
  CarFront,
  ChartPie,
  CircleHelp,
  House,
  IdCard,
  LayoutPanelLeft,
  Luggage,
  Map,
  Package2,
  Settings,
  UsersRound,
} from "lucide-react";
import { NavigationProps } from ".";

export const PrimaryNavigation: NavigationProps[] = [
  {
    id: "home",
    label: "Home",
    link: "/home",
    description: "",
    category: "personal",
    icon: <House className="w-5 h-5" />,
    searchActions: [],
  },
  {
    id: "planner",
    label: "Schedule",
    link: "/schedule-planner",
    description: "",
    category: "personal",
    icon: <CalendarRange className="w-5 h-5" />,
    searchActions: [],
  },
  {
    id: "inventory",
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
    id: "service",
    label: "Service",
    link: "/service",
    description: "",
    category: "personal",
    icon: <Bolt className="w-5 h-5" />,
    searchActions: [],
    children: [
      {
        id: "performance-home",
        label: "History",
        link: "/service",
      },

      {
        id: "planning",
        label: "Work Orders",
        link: "/service/work-orders",
      },
      {
        id: "appraisals",
        label: "Faults",
        link: "/service/faults",
      },
    ],
  },

  {
    id: "users",
    label: "Users",
    link: "/users",
    description: "",
    category: "personal",
    icon: <UsersRound className="w-5 h-5" />,
    searchActions: [],
  },
  {
    id: "vendors",
    label: "Vendors",
    link: "/vendors",
    description: "",
    category: "personal",
    icon: <Briefcase className="w-5 h-5" />,
    searchActions: [],
  },
  {
    id: "analytics",
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
    label: "Administration",
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
