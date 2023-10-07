import { type } from "os";
import { MouseEventHandler } from "react";

export interface ButtonProps {
  text: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  type: "button" | "submit" | "reset";
  step?: string;
}