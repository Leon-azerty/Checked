export interface RadioProps {
  htmlFor: string;
  label: string;
  placeholder: string;
  onchange: (e: any) => void;
  value?: string;
  isError?: boolean;
  name: string;
}