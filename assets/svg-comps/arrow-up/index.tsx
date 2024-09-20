import React from "react";

type arrowUpProps = {
    onClick : () => void;
}
export default function ArrowUp({onClick}:arrowUpProps) {

  return (
    <div onClick={onClick} className="cursor-pointer">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          stroke="#555555"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-miterlimit="10"
          stroke-width="1.5"
          d="M19.92 15.05L13.4 8.53c-.77-.77-2.03-.77-2.8 0l-6.52 6.52"
        ></path>
      </svg>
    </div>
  );
}
