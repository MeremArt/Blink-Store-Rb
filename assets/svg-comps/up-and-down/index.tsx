import React from "react";

export default function UpDown() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="0.5" y="0.5" width="39" height="39" rx="7.5" fill="#EDE5FB" />
      <rect x="0.5" y="0.5" width="39" height="39" rx="7.5" stroke="#7839EE" />
      <path
        d="M25 12V28M25 28L21 24M25 28L29 24M15 28V12M15 12L11 16M15 12L19 16"
        stroke="#7839EE"
        strokeWidth="2"
        strokeLinecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
