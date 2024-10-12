export interface AccordionProps {
  id: string;
  title: string;
  copy?: string;
  body?: React.ReactNode;
  tags?: string;
  defaultOpen?: boolean;
  style?: "section" | "question";
}
