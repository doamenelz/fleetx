export interface CardProps {
  /** Children components of the card */
  children: React.ReactNode;
  title?: string;
  /** Determines the size of the bottom padding */
  bottomPadding?: "sm" | "md";
  button?: JSX.Element;
  copy?: string;
  /** Used to determine the span of the Card.  */
  span?: CARD_SPAN;
}

export enum CARD_SPAN {
  one,
  three,
  two,
  full,
  /** Takes up one column but full on Tablet and Mobile */
  oneFullOnSmall,
}
