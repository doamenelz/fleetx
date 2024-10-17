import { Disclosure } from "@headlessui/react";
import React, { FC } from "react";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { AccordionProps } from "./Accordion.types";
import { SectionHeader } from "..";
import { classNames } from "@/lib/utilities/helperFunctions";
import { MinusIcon, PlusIcon } from "@heroicons/react/20/solid";

export const Accordion: FC<AccordionProps> = ({
  id,
  title,
  copy,
  tags,
  body,
  defaultOpen,
  style,
}) => {
  return (
    <Disclosure defaultOpen={defaultOpen}>
      {({ open }) => (
        /* Use the `open` state to conditionally change the direction of an icon. */
        <div className={classNames(open ? "border-c-mid border-b" : "")}>
          {style === "section" && (
            <Disclosure.Button
              className={classNames(
                "flex group items-center justify-between w-full px-2 py-6 text-sm font-semibold text-left text-zinc-700 border-b",
                open ? "border-c-mid" : ""
              )}
            >
              <div>
                <p
                  className={classNames(
                    "group-hover:text-brand-indiGlow",
                    open ? "text-brand-oceanicNoir" : ""
                  )}
                >
                  {title}
                </p>
                <p className="text-xs font-light">{copy}</p>
              </div>
              {!open && (
                <PlusIcon className={`w-4 h-4 group-hover:text-indigo-700`} />
              )}

              {open && (
                <MinusIcon className={`w-4 h-4 group-hover:text-indigo-700`} />
              )}
            </Disclosure.Button>
          )}

          {!style && (
            <Disclosure.Button className="flex items-center justify-between w-full p-4 text-sm font-medium text-left rounded-md text-primary-900 bg-primary-50">
              {title}
              <ChevronRightIcon
                className={`${open ? "rotate-90 transform" : ""} w-4 h-4`}
              />
            </Disclosure.Button>
          )}

          {copy !== undefined && !style && (
            <Disclosure.Panel
              className={"p-4 text-xs text-slate-700 leading-6"}
            >
              {copy}
            </Disclosure.Panel>
          )}

          {body !== undefined && <Disclosure.Panel>{body}</Disclosure.Panel>}
        </div>
      )}
    </Disclosure>
  );
};
