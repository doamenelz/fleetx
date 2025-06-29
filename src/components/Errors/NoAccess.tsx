"use client";
import { FC, useEffect } from "react";
import { StatusBadge } from "../Badge";
export const NoAccess: FC<{ description?: string; error: string }> = ({
  description = "The page you are looking for does not exist, or you do not have access to this page",
  error = "ERR 1000",
}) => {
  useEffect(() => {
    document.title = "HRFlex™ | Not Authorized";
  }, []);
  return (
    <div className="w-full h-screen mx-auto place-content-center bg-gradient-to-r from-slate-100 to-sky-100 p-4">
      <div className="space-y-6 p-6 max-w-md ring-1 ring-slate-50 shadow-md rounded-md mx-auto backdrop-blur-0 bg-white/10">
        <div className="space-y-4">
          <StatusBadge label="declined" />
          {/* <StatusBadge statusType={STATUS_COLORS.declined} label="404 Error" /> */}

          <p className="text-5xl font-medium">{error}</p>
        </div>
        <p className="text-sm font-light text-slate-700">{description}</p>
      </div>
    </div>
  );
};
