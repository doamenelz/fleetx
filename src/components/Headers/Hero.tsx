import { classNames } from "@/lib/utilities/helperFunctions";
import { FC } from "react";

export const ImageHero: FC<{ size: "lg" | "sm"; url: string }> = ({
  size,
  url,
}) => {
  return (
    <>
      <div className="">
        <img
          src={url}
          className={classNames(
            "object-cover w-full",
            size === "sm" ? "h-60" : "h-96"
          )}
          alt={"hero"}
        />
        {/* {copy !== undefined && (
          <div
            className={`mx-auto h-full w-full text-3xl font-bold relative z-10 bg-gray-900/90 text-gray-25 ${bgStyle}`}
          >
            {copy}
          </div>
        )} */}
      </div>
    </>
  );
};
