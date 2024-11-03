import { FC } from "react";

export const VendorRating: FC<{ rating: string }> = ({ rating }) => {
  return (
    <div className="flex gap-1">
      <span className="h-1 w-4 bg-green-600"></span>
      <span className="h-1 w-4 bg-green-600"></span>
      <span className="h-1 w-4 bg-brand-tan"></span>
      <span className="h-1 w-4 bg-brand-tan"></span>
    </div>
  );
};
