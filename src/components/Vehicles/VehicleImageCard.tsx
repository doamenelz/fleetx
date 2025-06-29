import { simulateLoader } from "@/lib/utilities/helperFunctions";
import clsx from "clsx";
import { CarFront } from "lucide-react";
import { FC, useEffect, useState } from "react";
import ReactDOM from "react-dom";
export const VehicleImageCard: FC<{
  imageUrl?: string;
  style: string;
  iconSize: string;
}> = ({ imageUrl, style, iconSize }) => {
  const [loadError, setLoadError] = useState(false);
  const [loadComplete, setLoadComplete] = useState(false);

  return (
    <>
      {imageUrl !== undefined && imageUrl !== "" && !loadError ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className={clsx(style)}
          src={imageUrl}
          //   onLoad={() => setLoadComplete(true)}
          alt=""
          onError={() => setLoadError(true)}
        />
      ) : (
        <div
          className={clsx(
            style,
            "bg-gray-100 place-content-center flex justify-center",
            !loadComplete || (imageUrl !== undefined && "animate-pulse")
          )}
        >
          <span
            className={clsx("items-center font-medium my-auto text-gray-600")}
          >
            <CarFront className={iconSize} />
          </span>
        </div>
      )}
    </>
  );
};
