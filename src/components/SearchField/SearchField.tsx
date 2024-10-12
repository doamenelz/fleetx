import { FC } from "react";
export const SearchField: FC<{ placeholder: string; setQuery: Function }> = (
  props
) => {
  return (
    <div className="relative tracking-tight rounded-sm">
      <div className="absolute  inset-y-0 left-0 flex items-center pl-3 pointer-events-none ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-3 h-3"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </div>
      <input
        onChange={(event) => props.setQuery(event.target.value.toLowerCase())}
        type="search"
        name="search"
        id="search"
        className={
          "block peer w-full min-w-input pl-8 border-0  py-1.5 text-gray-900 focus:outline-none sm:text-xs sm:leading-6 bg-slate-50"
        }
        placeholder={props.placeholder}
      />
      <div
        className="absolute inset-x-0 bottom-0 border-t border-gray-300 peer-focus:border-t-2 peer-focus:border-brand-blueRoyal "
        aria-hidden="true"
      />
    </div>
  );
};
