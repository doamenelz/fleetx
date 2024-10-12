export interface ExpenseTypeCardItem {
  type: "history" | "inbox" | "draft" | "awaiting";
  icon: JSX.Element;
  subtitle: string;
  header: string;
}
