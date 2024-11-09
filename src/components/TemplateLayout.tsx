"use client";
import { FC } from "react";

export const TemplateLayout: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <div>{children}</div>;
};
