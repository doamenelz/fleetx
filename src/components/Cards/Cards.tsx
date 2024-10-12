import { FC } from "react";
import { CARD_SPAN, CardProps } from "./Cards.types";
import { BodyCopy, Lbl, SectionHeader, TextLabel } from "..";
import { classNames } from "@/lib/utilities/helperFunctions";

/**
 * This component accepts other components as children but will always be used with a title
 */
export const CardWithTitle: FC<CardProps> = ({
  children,
  title,
  bottomPadding,
  button,
}) => {
  var _bottomPadding = bottomPadding ? bottomPadding : "md";
  return (
    <div
      className={`${_bottomPadding === "sm" && ""} ${
        _bottomPadding === "md" && "pb-5"
      } ${"px-4 pt-2 bg-white border rounded-md lg:col-span-1 sm:px-6"}`}
    >
      <div className="flex justify-between  items-center">
        <p className="font-medium leading-6 text-gray-900 text-sm">{title}</p>
        {button}
      </div>

      {children}
    </div>
  );
};

export const CardWithSectionHeader: FC<CardProps> = ({
  children,
  title,
  button,
  copy,
}) => {
  return (
    <div className="px-4 py-2 border text-sm rounded-md bg-gray-25 md:px-6 md:border-gray-200">
      <CardHeader
        title={title!}
        button={button}
        copy={copy}
      />
      {children}
    </div>
  );
};

export const PlainCard: FC<CardProps> = ({ children }) => {
  return (
    <div className="px-4 py-4 border rounded-md bg-gray-25 md:px-6 md:border-gray-200">
      {children}
    </div>
  );
};

const CardHeader: FC<{
  title: string;
  /** While there is no character limit set, there is a max-w applicable here. The content should be limited to a single line wherever possible */
  copy?: string;

  button?: JSX.Element;
}> = (props) => {
  return (
    <div className="flex-row items-center w-full py-2  border-b border-c-mid md:justify-between md:flex">
      <div className="">
        <h3 className="text-sm font-semibold leading-6 text-slate-900 tracking-normal">
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

export const AnalyticsCard: FC<CardProps> = ({
  children,
  title,
  copy,
  button,
  span,
}) => {
  const _cardSpan = span ? span : CARD_SPAN.one;
  const getSpan = () => {
    switch (_cardSpan) {
      case CARD_SPAN.one:
        return "col-span-1";
      case CARD_SPAN.two:
        return "col-span-2";
      case CARD_SPAN.three:
        return "lg:col-span-3 col-span-2";
      case CARD_SPAN.full:
        return "col-span-full";
      case CARD_SPAN.oneFullOnSmall:
        return "col-span-full lg:col-span-1";

      default:
        return "lg:col-span-1";
    }
  };

  return (
    <div
      className={classNames(
        "px-4 py-4 bg-white border rounded-md sm:px-6 space-y-2",
        getSpan()
      )}
    >
      <div className="flex justify-between">
        {copy == undefined ? (
          <BodyCopy text={title ?? ""} />
        ) : (
          <TextLabel
            label={copy}
            copy={title}
          />
        )}
        <div className="flex justify-between  items-center">{button}</div>
      </div>

      {children}
    </div>
  );
};

export const AnalyticsMainCopy: FC<{ text: string }> = ({ text }) => {
  return <p className="text-3xl font-medium text-slate-700">{text}</p>;
};

export const BasicCell: FC<{
  title: string;
  main: string;
  copy: string | JSX.Element;
}> = ({ title, main, copy }) => {
  return (
    <div className=" space-y-1 py-4">
      <Lbl label={title} />
      <div className="justify-between flex-col">
        <AnalyticsMainCopy text={main} />
        {typeof copy === "string" ? <Lbl label={copy} /> : copy}
      </div>
    </div>
  );
};

export const SBSCell: FC<{
  title: string;
  lhs: string | JSX.Element;
  rhs: string | JSX.Element;
  copy?: string;
  isEqual?: boolean;
}> = ({ title, lhs, rhs, copy, isEqual }) => {
  return (
    <div className="space-y-1 py-4">
      <Lbl label={title} />

      {typeof lhs === "string" ? (
        <div
          className={classNames(
            isEqual ? "grid grid-cols-2" : "flex items-center divide-x",
            ""
          )}
        >
          <AnalyticsMainCopy text={lhs} />
          <p className="pl-4 text-3xl font-medium">{rhs}</p>
        </div>
      ) : (
        <div
          className={classNames(
            isEqual
              ? "grid grid-cols-2 divide-x"
              : "flex items-center divide-x-2",
            ""
          )}
        >
          {lhs}
          {rhs}
        </div>
      )}
      {copy && (
        <p className="bottom-4 text-xs font-light  text-slate-700">{copy}</p>
      )}
    </div>
  );
};
