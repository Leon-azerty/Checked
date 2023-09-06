import { MouseEventHandler } from "react";

export interface ButtonProps {
  text: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  icon: any;
  iconColor: string;
  className?: string;
}