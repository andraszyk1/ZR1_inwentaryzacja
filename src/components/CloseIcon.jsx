import React from "react";

function CloseIcon({onClick}) {
  return (
    <div onClick={onClick} title="Zamknij" className="hover:cursor-pointer">
      <svg
        className="w-8 h-8 text-gray-800 dark:text-white hover:text-slate-200"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
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
          d="M6 18 17.94 6M18 18 6.06 6"
        />
      </svg>
    </div>
  );
}

export default CloseIcon;
