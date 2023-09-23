import { MouseEventHandler } from "react";

export interface IconButtonProps {
  text: String;
  onClick: MouseEventHandler<HTMLButtonElement>;
  icon: any;
  iconColor: String;
  className?: String;
}