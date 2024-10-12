"use client";
import { FC } from "react";
import { IconList } from "@/assets/IconList";
import { Icon, ICON_SIZES } from "../Icons";
import Link from "next/link";
import { ArrowUpRightIcon } from "@heroicons/react/20/solid";

export interface QL {
  id: string;
  label: string;
  url: string;
  copy?: string;
  icon?: JSX.Element;
  state?: {};
}
export const QuickLinkStack: FC<{ links: QL[]; isExternal: boolean }> = ({
  links,
  isExternal,
}) => {
  return (
    <div className="items-center gap-y-2 md:gap-x-2 md:grid-cols-2 md:grid md:gap-y-2 sm:flex lg:grid-cols-1 lg:gap-x-0 lg:gap-y-2">
      {!isExternal
        ? links.map((link) => (
            <QuickLink
              id={link.id}
              label={link.label}
              url={link.url}
              key={link.id}
            />
          ))
        : links.map((link) => (
            <ExternalQL
              id={link.id}
              label={link.label}
              url={link.url}
              key={link.id}
            />
          ))}
    </div>
  );
};

export const ExternalQL: FC<QL> = ({ url, label, id }) => {
  return (
    <a
      target="_blank"
      rel="noreferrer"
      href={url}
      id={id}
      className="flex items-center justify-between gap-2 p-4 text-sm font-medium text-primary-900 bg-gray-50 hover:text-gray-25 hover:bg-primary-900"
    >
      {label}
      <span>
        <Icon icon={<ArrowUpRightIcon />} size={ICON_SIZES.sm} />
      </span>
    </a>
  );
};

export const QuickLink: FC<QL> = ({ url, label, id, state }) => {
  return (
    <Link
      href={url}
      id={id}
      className="flex items-center justify-between gap-2 p-4 text-sm font-medium bg-gray-50 text-primary-900 hover:text-gray-25 hover:bg-primary-900"
    >
      <div className="flex items-center gap-2 ">
        {/* <span>{icon}</span> */}
        {label}
      </div>

      <span>
        <Icon icon={IconList.arrowRight} size={ICON_SIZES.sm} />
      </span>
    </Link>
  );
};
