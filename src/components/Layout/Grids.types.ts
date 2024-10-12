export type GridProps = {
  /** Use this if the grid is ignorant of the sides (LHS, or RHS) and only needs to render items in the order at which they are entered as children */
  children?: React.ReactNode;
  /** Left Hand Side. Use this if you want the grid to be knowledgeable of the sides. Always pair with the RHS */
  lhs?: React.ReactNode;
  /** Right Hand Side. Use this if you want the grid to be knowledgeable of the sides. Always pair with the LHS*/
  rhs?: React.ReactNode;
  type: GRID_TYPE;
  verticalPadding?: boolean;
};

/** Grid Types */
export enum GRID_TYPE {
  /** Two Column */
  twoCol = "twoCol",
  twoOne = "twoOne",
  threeCol = "threeCol",
  oneTwo = "oneTwo",
  oneThree = "oneThree",
  fourCol = "fourCol",
}
