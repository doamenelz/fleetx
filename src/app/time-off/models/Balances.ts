export interface Balances {
  id: string;
  name: string;
  available: string;
  limit: string;
  color: string;
  type: string;
}

export const sampleBalances: Balances[] = [
  {
    id: "1",
    name: "Annual Leave",
    available: "12 days",
    limit: "24 days",
    color: "#0052cc",
    type: "annual-leave",
  },
  {
    id: "2",
    name: "Compassionate Leave",
    available: "5 days",
    limit: "24 days",
    color: "#f79009",
    type: "compassionate-leave",
  },
  {
    id: "3",
    name: "Sick Leave",
    available: "2 days",
    limit: "24 days",
    color: "#002266",
    type: "sick-leave",
  },
  {
    id: "4",
    name: "Parental Leave",
    available: "75 days",
    limit: "24 days",
    color: "#039855",
    type: "parental-leave",
  },
  {
    id: "5",
    name: "Sabbatical Leave",
    available: "365 days",
    limit: "24 days",
    color: "#D92D20",
    type: "sabbatical-leave",
  },
];
