export interface TableCellProps {
  label: string | React.ReactNode;
  mainCell: boolean;
  hideOnMobile: boolean;
  button?: { url: string; label: string };
  isDark?: Boolean;
  centerCell?: boolean;
}

export interface TableContainerProps {
  sectionHeader?: {
    header: string | JSX.Element;
    copy?: string;
    button?: React.ReactNode;
    isEmpty?: boolean;
  };
  mainContent: React.ReactNode;
}

export interface TableHeaderCellProps {
  label: string;
  centerCell?: boolean;
}
