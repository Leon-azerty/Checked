export interface MenuProps {
  tab: String;
  setTab: (create: String) => void;
  filter: String[];
  setFilter: (filter: String[]) => void;
}