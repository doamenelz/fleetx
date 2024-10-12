import { FC } from "react";
import { Accordion, SectionHeader } from "..";

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
