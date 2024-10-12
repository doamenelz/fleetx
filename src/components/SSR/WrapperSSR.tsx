"use client";
import { useEffect } from "react";
import { STATUS_COLORS, StatusBadge } from "..";
export default function Aces() {
  useEffect(() => {
    document.title = "HRFlex™ | 404 Page";
  }, []);
  return (
    <div className="w-full h-screen mx-auto place-content-center bg-gradient-to-r from-slate-100 to-sky-100 p-4">
      <div className="space-y-6 p-6 max-w-md ring-1 ring-slate-50 shadow-md rounded-md mx-auto backdrop-blur-0 bg-white/10">
        <div className="space-y-4">
          <StatusBadge statusType={STATUS_COLORS.declined} label="404 Error" />

          <p className="text-7xl font-medium">404</p>
        </div>
        <p className="text-sm font-light text-slate-700">
          The page you are looking for does not exist, or you do not have access
          to this page
        </p>
      </div>
    </div>
  );
}
