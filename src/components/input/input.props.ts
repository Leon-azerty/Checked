export interface InputProps {
  htmlFor: string;
  label: string;
  placeholder: string;
  type: string;
  onchange: (e: any) => void;
  value?: string;
  isError?: boolean;
}