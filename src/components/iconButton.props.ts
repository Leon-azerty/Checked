import { MouseEventHandler } from "react";

export interface IconButtonProps {
  text: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  icon: any;
  iconColor: string;
  className?: string;
}