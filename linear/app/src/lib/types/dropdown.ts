import type { ReactNode } from "react";

export interface DropdownOption {
  type: "option";
  value: string;
  label: string;
  labelSecondary?: string;
  icon?: ReactNode;
  shortcut?: string;
  searchableText?: string;
}

export interface DropdownLabel {
  type: "label";
  text: string;
}

export interface DropdownSeparator {
  type: "separator";
}

export type DropdownItem = DropdownOption | DropdownLabel | DropdownSeparator;
