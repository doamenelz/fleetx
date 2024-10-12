export interface TableCellProps {
  label: string | React.ReactNode;
  mainCell: boolean;
  hideOnMobile: boolean;
  button?: { url: string; label: string };
  isDark?: Boolean;
}

export interface TableContainerProps {
  sectionHeader?: {
    header: string;
    copy?: string;
    button?: React.ReactNode;
    isEmpty?: boolean;
  };
  mainContent: React.ReactNode;
}

export interface TableHeaderCellProps {
  label: string;
}
