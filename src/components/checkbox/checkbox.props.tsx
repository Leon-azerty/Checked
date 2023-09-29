export interface CheckboxProps {
  htmlFor: string;
  label: string;
  placeholder: string;
  onchange: (e: any) => void;
  value?: string;
  isError?: boolean;
}