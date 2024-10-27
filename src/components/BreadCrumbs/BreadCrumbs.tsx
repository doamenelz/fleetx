import { classNames } from "@/lib/utilities/helperFunctions";
import Link from "next/link";
import { FC } from "react";

export interface BreadCrumb {
  id: string;
  name: string;
  href: string;
}

export const BreadCrumbs: FC<{ data: BreadCrumb[]; mainPage: BreadCrumb }> = ({
  data,
  mainPage,
}) => {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex"
    >
      <ol
        role="list"
        className="flex items-center text-xs"
      >
        <li>
          <div>
            <Link
              href={mainPage.href}
              className="text-gray-500  hover:text-brand-indiGlow "
            >
              {mainPage.name}
            </Link>
          </div>
        </li>
        {data.map((page, index) => (
          <li key={page.id}>
            <div className="flex items-center">
              <svg
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
                className="h-5 w-5 flex-shrink-0 text-gray-300"
              >
                <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
              </svg>
              {page.href === "" ? (
                <p
                  // aria-current={page.current ? "page" : undefined}
                  className={classNames(
                    " text-xs ",
                    page.id === data[data.length - 1].id
                      ? "text-brand-indiGlow font-medium py-1 px-2 bg-indigo-50 rounded-sm"
                      : "text-gray-500 "
                  )}
                >
                  {page.name}
                </p>
              ) : (
                <Link
                  href={page.href}
                  // aria-current={page.current ? "page" : undefined}
                  className={classNames(
                    " text-xs hover:text-gray-700",
                    page.id === data[data.length - 1].id
                      ? "text-brand-indiGlow font-medium py-1 px-2 bg-indigo-50 rounded-sm"
                      : "text-gray-500 "
                  )}
                >
                  {page.name}
                </Link>
              )}
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
};
