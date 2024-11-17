import { CheckIcon } from "lucide-react";
import { FC } from "react";

// const steps = [
//   { id: "Step 1", name: "General Information", href: "#", status: "current" },
//   { id: "Step 2", name: "Finance Information", href: "#", status: "upcoming" },
//   { id: "Step 3", name: "Specifications", href: "#", status: "upcoming" },
// ];

export interface FormProgressStep {
  id: string;
  label: string;
  description: string;
  status: "current" | "upcoming" | "complete";
  action: Function;
}
export const FormProgressView: FC<{ steps: FormProgressStep[] }> = ({
  steps,
}) => {
  return (
    <nav aria-label="Progress">
      <ol role="list" className=" space-y-4 md:flex md:space-y-0">
        {steps.map((step) => (
          <li key={step.id} className="md:flex-1 ">
            {step.status === "complete" ? (
              <button className="group w-full flex flex-col border-l-4 border-brand-persianBlue py-2 pl-4 hover:border-brand-indiGlow md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                <span className="text-xs font-medium text-brand-persianBlue group-hover:text-brand-indiGlow">
                  {step.label}
                </span>
                <span className="text-sm font-medium flex items-center gap-2">
                  {step.description}{" "}
                  <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-brand-persianBlue group-hover:bg-indigo-800">
                    <CheckIcon
                      aria-hidden="true"
                      className="size-3 text-white"
                    />
                  </span>
                </span>
              </button>
            ) : step.status === "current" ? (
              <button
                aria-current="step"
                className="flex w-full flex-col border-l-4 border-brand-tan py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4"
              >
                <span className="text-xs text-gray-700 font-medium">
                  {step.label}
                </span>
                <span className="text-sm font-medium">{step.description}</span>
              </button>
            ) : (
              <button className="group w-full flex flex-col border-l-4 border-gray-200 py-2 pl-4 hover:border-gray-300 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                <span className="text-xs  text-gray-500 group-hover:text-gray-700">
                  {step.label}
                </span>
                <span className="text-sm font-medium">{step.description}</span>
              </button>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
