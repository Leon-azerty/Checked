import { MouseEventHandler } from "react";

export interface ButtonProps {
  text: String;
  onClick: MouseEventHandler<HTMLButtonElement>;
  className?: String;
}