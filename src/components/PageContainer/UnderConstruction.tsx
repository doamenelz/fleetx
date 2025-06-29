"use client";
import { StatusBadge } from "@/components";
export const UnderConstruction = () => {
  return (
    <div className="w-full h-screen mx-auto place-content-center bg-gradient-to-r from-slate-100 to-sky-100">
      <div className="space-y-6 p-6 max-w-md ring-1 ring-slate-50 shadow-md rounded-md mx-auto backdrop-blur-0 bg-white/10">
        <div className="space-y-4">
          <StatusBadge label="Coming Soon" />

          <p className="text-4xl font-medium">Page is under construction</p>
        </div>
        {/* <p className="text-sm font-light text-slate-700">
          ..
        </p> */}
      </div>
    </div>
  );
};
