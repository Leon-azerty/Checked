export interface BodyProps {
  tab: string;
  setTab: (tab: string) => void;
  isLoading: boolean;
  filter: string[];
  showMenu: boolean;
  setShowMenu: (showMenu: boolean) => void;
}