import { CheckIcon } from "lucide-react";
import { FC } from "react";

const steps = [
  { id: "Step 1", name: "General Information", href: "#", status: "current" },
  { id: "Step 2", name: "Finance Information", href: "#", status: "upcoming" },
  { id: "Step 3", name: "Specifications", href: "#", status: "upcoming" },
];

export const FormProgressView: FC<{}> = ({}) => {
  return (
    <nav aria-label="Progress">
      <ol
        role="list"
        className=" space-y-4 md:flex md:space-x-8 md:space-y-0"
      >
        {steps.map((step) => (
          <li
            key={step.name}
            className="md:flex-1"
          >
            {step.status === "complete" ? (
              <a
                href={step.href}
                className="group flex flex-col border-l-4 border-indigo-600 py-2 pl-4 hover:border-indigo-800 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4"
              >
                <span className="text-xs text-indigo-600 group-hover:text-indigo-800">
                  {step.id}
                </span>
                <span className="text-sm font-medium flex items-center gap-2">
                  {step.name}{" "}
                  <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-indigo-600 group-hover:bg-indigo-800">
                    <CheckIcon
                      aria-hidden="true"
                      className="size-3 text-white"
                    />
                  </span>
                </span>
              </a>
            ) : step.status === "current" ? (
              <a
                href={step.href}
                aria-current="step"
                className="flex flex-col border-l-4 border-indigo-600 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4"
              >
                <span className="text-xs text-indigo-600">{step.id}</span>
                <span className="text-sm font-medium">{step.name}</span>
              </a>
            ) : (
              <a
                href={step.href}
                className="group flex flex-col border-l-4 border-gray-200 py-2 pl-4 hover:border-gray-300 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4"
              >
                <span className="text-xs  text-gray-500 group-hover:text-gray-700">
                  {step.id}
                </span>
                <span className="text-sm font-medium">{step.name}</span>
              </a>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
