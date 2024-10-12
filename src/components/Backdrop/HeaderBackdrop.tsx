import { FC } from "react";
import BoxPattern from "../../../public/BoxPattern.svg";
import HeroIllustration from "../../../public/hero-illustration.svg";
import Image from "next/image";
import { classNames } from "@/lib/utilities/helperFunctions";
export const HeaderBackdrop: FC<{ size?: "sm" | "md" }> = (props) => {
  let sizeClass;
  switch (props.size) {
    case "sm":
      sizeClass = "h-8 -z-10";
      break;
    case "md":
      sizeClass = "h-32";
      break;
    default:
      sizeClass = "h-8";
  }
  return (
    <div
      className={classNames(
        "w-full bg-gradient-to-r from-neutral-900 via-blue-800 to-blue-900 flex h-32 justify-end items-center p-2"
      )}
    >
      <Image
        width={110}
        height={60}
        priority={true} // {false} | {true}
        // sizes="(max-width: 768px) 50vw"
        className="h-32 w-52 object-cover"
        src={"/hero-illustration.svg"}
        alt="hero"
      />
      {/* <img src={BoxPattern} className="object-cover w-1/2 h-44" alt="hero" /> */}
    </div>
  );
};

// HeaderBackdrop.defaultProps = {
//   size: "sm",
// };
