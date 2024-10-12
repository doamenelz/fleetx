"use client";

import { INPUT_TYPES, TEXT_INPUT_SIZE } from "@/components";

export const OverviewToggle = {
  id: "period",
  label: "",
  span: TEXT_INPUT_SIZE.span1,
  style: INPUT_TYPES.dropdown,
  items: ["Current Year", "2023", "2022"],
  editMode: true,
  copy: "",
  setValue: () => {},
  setShowError: () => {},
  defaultValue: "Current Year",
  required: false,
};
