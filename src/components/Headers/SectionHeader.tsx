import { FC } from "react";
export const SectionHeader: FC<{
  title: string;
  /** While there is no character limit set, there is a max-w applicable here. The content should be limited to a single line wherever possible */
  copy?: string;

  button?: JSX.Element;
}> = (props) => {
  return (
    <div className="flex-row items-center w-full py-2  border-b border-c-mid md:justify-between md:flex">
      <div className="">
        <h3 className="text-base font-semibold leading-6 text-slate-900 tracking-normal">
          {props.title}
        </h3>
        {(props.copy !== undefined || props.copy !== "") && (
          <p className="mb-2 text-xs text-slate-500 tracking-normal">
            {props.copy}
          </p>
        )}
      </div>
      <div>{props.button}</div>
    </div>
  );
};
