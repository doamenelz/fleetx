export interface MessageCenterNav {
  id: string;
  mainLabel: string;
  children: { id: string; label: string; url: string; notifications: number }[];
}
