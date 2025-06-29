import { title } from "process";
import { FC } from "react";
export const SectionHeader: FC<{
  title: string | JSX.Element;
  /** While there is no character limit set, there is a max-w applicable here. The content should be limited to a single line wherever possible */
  copy?: string;

  button?: JSX.Element;
}> = (props) => {
  return (
    <div className="flex-row items-center w-full py-2  border-b border-c-mid md:justify-between md:flex">
      <div className="">
        {typeof title === "string" ? (
          <h3 className="text-base font-semibold leading-6 text-slate-900 tracking-normal">
            {props.title}
          </h3>
        ) : (
          title
        )}

        {props.copy && (
          <p className="mb-2 text-xs text-slate-500 tracking-normal">
            {props.copy}
          </p>
        )}
      </div>

      <div className="">{props.button}</div>
    </div>
  );
};

export const ModalHeader: FC<{
  title: string;
  /** While there is no character limit set, there is a max-w applicable here. The content should be limited to a single line wherever possible */
  copy?: string;

  button?: JSX.Element;
}> = (props) => {
  return (
    <div className="flex-row items-center sticky top-0 w-full py-2  border-b border-c-mid md:justify-between md:flex bg-gradient-to-r from-brand-black via-brand-black to-brand-oceanicNoir">
      <div className="px-4 py-2">
        <h3 className="text-base font-semibold leading-6 text-brand-speedOfLight tracking-normal">
          {props.title}
        </h3>
        {(props.copy !== undefined || props.copy !== "") && (
          <p className="text-xs text-brand-speedOfLight tracking-normal">
            {props.copy}
          </p>
        )}
      </div>
      <div>{props.button}</div>
    </div>
  );
};
