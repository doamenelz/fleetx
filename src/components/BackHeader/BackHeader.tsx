"use client";
import { FC } from "react";
import { useRouter } from "next/navigation";
export const BackHeader: FC<{ previousPathName: string }> = (props) => {
  // const navigate = useNavigate();
  const goBack = () => {
    // navigate(-1);
  };

  const router = useRouter();
  return (
    <div className="flex items-center gap-2 py-4">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 px-3 py-2 text-xs tracking-tight text-slate-700 rounded hover:bg-slate-50 hover:text-indigo-800"
      >
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
            />
          </svg>
        </span>
        {props.previousPathName}
      </button>
    </div>
  );
};
