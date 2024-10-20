import React from "react";

function ArrowLeftIcon({onClick,disabled}) {
  return (
    <button onClick={onClick} disabled={disabled} className="hover:cursor-pointer hover:bg-slate-400">
      <svg
        className="w-6 h-6 text-gray-800 dark:text-white disabled:text-slate-400"
        aria-hidden="true"
        xmlnsXlink="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M5 12h14M5 12l4-4m-4 4 4 4"
        />
      </svg>
    </button>
  );
}

export default ArrowLeftIcon;
