import { FC } from "react";
import { Accordion, SectionHeader } from "..";
import clsx from "clsx";

export const FormLayout: FC<{
  title: string;
  copy?: string;
  children?: React.ReactNode;
  defaultOpen?: boolean;
}> = (props) => {
  return (
    <>
      <div className="tracking-tight gap-y-10 gap-x-8 border-gray-900/10">
        <Accordion
          title={props.title}
          copy={props.copy}
          id=""
          style="section"
          defaultOpen={props.defaultOpen}
          body={
            <div className=" ml-2 mr-2 mt-2 mx-auto rounded border-c-mid border space-y-8 gap-x-6 p-4">
              {props.children}
            </div>
          }
        ></Accordion>
        {/* <SectionHeader title={props.title} copy={props.copy} /> */}

        {/* <div className=" w-full  gap-y-8 gap-x-6 py-4">{props.children}</div> */}
      </div>
    </>
  );
};

export const FormSectionLayout: FC<{ children: JSX.Element }> = ({
  children,
}) => {
  return <dl className="divide-y divide-gray-100">{children}</dl>;
};

export const FormSection: FC<{
  /** Insert Form Cell(s) */
  children: JSX.Element;
  label: string;
  copy?: string;
  hasBottomBorder?: boolean;
}> = ({ children, copy, label, hasBottomBorder = false }) => {
  return (
    <div
      className={clsx(
        "px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0",
        hasBottomBorder === true && "border-b"
      )}
    >
      <dt className="text-sm/6 font-medium text-gray-900">{label}</dt>
      <div className="grid grid-cols-2 sm:col-span-2 gap-4">{children}</div>
    </div>
  );
};
