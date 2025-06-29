"use client";

import { classNames } from "@/lib/utilities/helperFunctions";
import clsx from "clsx";
import { LoaderCircle } from "lucide-react";
// import { lineWobble } from "ldrs";

import { FC, useEffect } from "react";

export interface LoaderProps {
  label?: string;
  size?: "sm" | "md" | "lg";
  withModal?: boolean;
  showBackground?: boolean;
}
export const PageLoader: FC<LoaderProps> = (props) => {
  return (
    <div className="mx-auto fixed inset-0 overscroll-y-none flex items-center justify-center bg-slate-200/50 z-20">
      <Spinner
        label={props.label}
        showBackground={props.showBackground}
        size={props.size}
      />
    </div>
  );
};

export const Spinner: FC<{
  label?: string;
  size?: string;
  showBackground?: boolean;
}> = ({ label, size, showBackground = false }) => {
  return (
    <div
      className={clsx(
        "text-center mx-auto",
        showBackground && "bg-white p-4 rounded-md"
      )}
    >
      <LoaderCircle
        className={classNames(
          "animate-spin text-indigo-700 bg-clip-text mx-auto",
          size === "lg"
            ? "h-24 w-24"
            : size === "md"
            ? "h-16 w-16"
            : "h-12 w-12"
        )}
      />
      {label && (
        <p className="animate-pulse font-mono text-center text-xs text-slate-600">
          {label}
        </p>
      )}
    </div>
  );
};

export const AvatarLoader = () => {
  return (
    <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
  );
};

export const CopyLoader = () => {
  return (
    <div className="flex pt-3 space-x-4 animate-pulse">
      <div className="w-full space-y-3">
        <div className="h-3 bg-gray-200 rounded-md"></div>
        <div className="grid grid-cols-4 gap-2">
          <div className="h-3 col-span-2 bg-gray-200 rounded-md"></div>
          <div className="h-3 col-span-1 bg-gray-200 rounded-md"></div>
          <div className="h-3 col-span-1 bg-gray-200 rounded-md"></div>
        </div>
        <div className="h-3 bg-gray-200 rounded-md"></div>
      </div>
    </div>
  );
};

export const EmployeeCellLoader = () => {
  return (
    <div className="flex items-center min-w-full space-x-4 animate-pulse">
      <AvatarLoader />
      <div className="w-64">
        <CopyLoader />
      </div>
    </div>
  );
};

export const EmptyStateText: FC<{ title: string }> = ({ title }) => {
  return (
    <div className="w-full py-12 my-3 text-sm font-medium text-center text-gray-700 rounded-md bg-gray-50">
      {title}
    </div>
  );
};
