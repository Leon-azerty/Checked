export interface MenuProps {
  tab: string;
  setTab: (create: string) => void;
  filter: string[];
  setFilter: (filter: string[]) => void;
}