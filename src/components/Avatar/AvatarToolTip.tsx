import { FC } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { PlainCard } from "../Cards";
import { Avatar } from "./Avatar";
import { Person, User } from "@/models";
import { BodyCopy, Lbl } from "../Typography";
import Link from "next/link";

export const AvatarToolTip: FC<{
  type: AVATAR_TOOLTIP_TYPES;
  person: User | string;
}> = ({ type, person }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <>
          {type === AVATAR_TOOLTIP_TYPES.text && (
            <AvatarTextTip person={person} />
          )}
        </>
      </Tooltip>
    </TooltipProvider>
  );
};

export enum AVATAR_TOOLTIP_TYPES {
  text,
}

const AvatarTextTip: FC<{
  person: User | string;
}> = ({ person }) => {
  return (
    <>
      <TooltipTrigger asChild>
        {typeof person === "string" ? (
          <p className="text-brand-blueRoyal underline decoration-dotted">
            {person}
          </p>
        ) : (
          <p className="text-brand-blueRoyal cursor-pointer underline decoration-dotted">
            {person.firstName} {person.lastName}
          </p>
        )}
      </TooltipTrigger>

      {typeof person !== "string" && (
        <TooltipContent>
          <div className="bg-white w-56 flex gap-2 items-top py-2">
            <Avatar
              firstName={person.firstName}
              lastName={person.lastName}
              imageUrl={person.avatar}
            />

            <div className="text-xs space-y-1">
              <BodyCopy copy={`${person.firstName} ${person.lastName}`} />
              <Lbl label={person.title} />
              <Link
                className="text-brand-blueRoyal border-t"
                href={""}
              >
                <p className="pt-2 border-t mt-2">Go to Profile</p>
              </Link>
            </div>
          </div>
        </TooltipContent>
      )}
    </>
  );
};
