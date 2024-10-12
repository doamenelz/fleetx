import { NavigationProps } from ".";
import {
  NavigationIcon,
  ICON_SIZES,
  HomeIcon,
  Compensation,
  Performance,
  HRAnalytics,
  People,
  Workforce,
  Absence,
  Configuration,
  Switch,
  Dashboard,
  MyReports,
} from "../Icons";
export const PrimaryNavigation: NavigationProps[] = [
  {
    id: "dashboard",
    label: "Home",
    link: "/dashboard",
    description: "",
    category: "personal",
    icon: (
      <NavigationIcon
        size={ICON_SIZES.xxl}
        icon={<Dashboard />}
      />
    ),
    searchActions: [],
    fillIcon: (
      <NavigationIcon
        size={ICON_SIZES.xxl}
        icon={<Dashboard fill={true} />}
      />
    ),
  },
  {
    id: "vehicles",
    label: "Vehicles",
    link: "/vehicles",
    description: "",
    category: "personal",
    icon: (
      <NavigationIcon
        size={ICON_SIZES.xxl}
        icon={<Dashboard />}
      />
    ),
    searchActions: [],
    fillIcon: (
      <NavigationIcon
        size={ICON_SIZES.xxl}
        icon={<Dashboard fill={true} />}
      />
    ),
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
    id: "home",
    label: "Schedule",
    link: "/home",
    description: "",
    category: "personal",
    icon: (
      <NavigationIcon
        size={ICON_SIZES.xxl}
        icon={<HomeIcon />}
      />
    ),
    searchActions: [],
    fillIcon: (
      <NavigationIcon
        size={ICON_SIZES.xxl}
        icon={<HomeIcon fill={true} />}
      />
    ),
  },
  {
    id: "home",
    label: "Service",
    link: "/service",
    description: "",
    category: "personal",
    icon: (
      <NavigationIcon
        size={ICON_SIZES.xxl}
        icon={<HomeIcon />}
      />
    ),
    searchActions: [],
    fillIcon: (
      <NavigationIcon
        size={ICON_SIZES.xxl}
        icon={<HomeIcon fill={true} />}
      />
    ),
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
  // {
  //   id: "administration",
  //   label: "Administration",
  //   link: "/performance",
  //   category: "admin",
  //   description: "Appraisals, KPIs and Deliverables",
  //   icon: (
  //     <NavigationIcon
  //       size={ICON_SIZES.xxl}
  //       icon={<Performance />}
  //     />
  //   ),
  //   fillIcon: (
  //     <NavigationIcon
  //       size={ICON_SIZES.xxl}
  //       icon={<Performance fill={true} />}
  //     />
  //   ),
  //   children: [
  //     {
  //       id: "performance-home",
  //       label: "Home",
  //       link: "/performance",
  //     },

  //     {
  //       id: "planning",
  //       label: "Planning",
  //       link: "/performance/planning",
  //     },
  //     {
  //       id: "appraisals",
  //       label: "Appraisals",
  //       link: "/performance/appraisals",
  //     },
  //     {
  //       id: "benefits",
  //       label: "Benefits",
  //       link: "/performance/team",
  //       children: [
  //         {
  //           id: "plans",
  //           label: "Plans",
  //           link: "/performance/team/planning",
  //         },
  //         {
  //           id: "team-scorecards",
  //           label: "HMO",
  //           link: "/performance/team/scorecards",
  //         },
  //         {
  //           id: "team-interventions",
  //           label: "Loans",
  //           link: "/performance/team/scorecards",
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   id: "my-reports",
  //   label: "My Reports",
  //   link: "/my-reports",
  //   description: "",
  //   category: "admin",
  //   icon: (
  //     <NavigationIcon
  //       size={ICON_SIZES.xxl}
  //       icon={<MyReports />}
  //     />
  //   ),
  //   searchActions: [],
  //   fillIcon: (
  //     <NavigationIcon
  //       size={ICON_SIZES.xxl}
  //       icon={<MyReports fill={true} />}
  //     />
  //   ),
  // },
  {
    id: "people",
    label: "Users",
    link: "/people",
    category: "admin",
    description: "",
    icon: (
      <NavigationIcon
        size={ICON_SIZES.xxl}
        icon={<People />}
      />
    ),

    fillIcon: (
      <NavigationIcon
        size={ICON_SIZES.xxl}
        icon={<People fill={true} />}
      />
    ),
    children: [
      {
        id: "people",
        label: "Home",
        link: "/people",
      },
      {
        id: "people-demographics",
        label: "Demographics",
        link: "/people/demographics",
      },
      {
        id: "people-diversity",
        label: "Diversity",
        link: "/people/diversity",
      },
      {
        id: "people-wellness",
        label: "Wellness",
        link: "/people/wellness",
      },
      {
        id: "people-tenure-retirement",
        label: "Tenure & Retirement",
        link: "/people/tenure-retirement",
      },
    ],
  },
  // {
  //   id: "requests",
  //   label: "Requests",
  //   link: "/workforce",
  //   category: "admin",
  //   description: "",
  //   icon: (
  //     <NavigationIcon
  //       size={ICON_SIZES.xxl}
  //       icon={<Workforce />}
  //     />
  //   ),
  //   fillIcon: (
  //     <NavigationIcon
  //       size={ICON_SIZES.xxl}
  //       icon={<Workforce fill={true} />}
  //     />
  //   ),
  //   children: [
  //     {
  //       id: "workforce-talent",
  //       label: "Talent & Recruitment",
  //       link: "/workforce/talent-recruitment",
  //     },
  //     {
  //       id: "workforce-succession",
  //       label: "Succession Planning",
  //       link: "/workforce/succession-planning",
  //     },
  //     {
  //       id: "workforce-skills-competencies",
  //       label: "Skills and Competencies",
  //       link: "/workforce/skills-competencies",
  //     },
  //     {
  //       id: "learning-development",
  //       label: "Learning & Development",
  //       link: "/workforce/learning-development",
  //     },
  //   ],
  // },
  {
    id: "design-center",
    label: "Vendors",
    link: "/compensation",
    category: "admin",
    description: "Payslips, Remittance, Taxes",
    icon: (
      <NavigationIcon
        size={ICON_SIZES.xxl}
        icon={<Compensation />}
      />
    ),
    fillIcon: (
      <NavigationIcon
        size={ICON_SIZES.xxl}
        icon={<Compensation fill={true} />}
      />
    ),
  },
  {
    id: "design-center",
    label: "Configurations",
    link: "/compensation",
    category: "admin",
    description: "Payslips, Remittance, Taxes",
    icon: (
      <NavigationIcon
        size={ICON_SIZES.xxl}
        icon={<Compensation />}
      />
    ),
    fillIcon: (
      <NavigationIcon
        size={ICON_SIZES.xxl}
        icon={<Compensation fill={true} />}
      />
    ),
  },
];

export const SecondaryNavigation: NavigationProps[] = [
  {
    id: "switch",
    label: "HRFlex Core",
    link: "/flex-core",
    description: "Setups and Configurations for HR Processes",
    category: "admin",
    icon: (
      <NavigationIcon
        size={ICON_SIZES.xxl}
        icon={<Switch />}
      />
    ),
    fillIcon: (
      <NavigationIcon
        size={ICON_SIZES.xxl}
        icon={<Switch fill={true} />}
      />
    ),
  },
];
