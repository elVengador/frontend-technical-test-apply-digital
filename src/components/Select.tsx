import React, { useState } from "react";
import { DownArrowIcon } from "./icons/DownArrowIcon";

type SelectProps = {
  label: string;
  options: { label: string; value: string }[];
  fnChange: (newValue: string) => void;
};

export const Select = ({ label, options, fnChange }: SelectProps) => {
  const [displayMenu, setDisplayMenu] = useState(false);

  const onChange = (newValue: string) => {
    try {
      fnChange(newValue);
      setDisplayMenu(false);
    } catch (error) {
      console.error();
    }
  };

  return (
    <div className="relative w-full">
      <button
        onClick={() => setDisplayMenu((p) => !p)}
        className="w-full px-[0px] py-4 flex justify-between items-center text-ad-gray-medium hover:bg-neutral-200"
      >
        {label || "All"}
        <DownArrowIcon />
      </button>
      {displayMenu && (
        <ul className="absolute w-full max-h-[300px] z-10 bg-neutral-100  overflow-y-auto">
          {label && (
            <button
              onClick={() => onChange("")}
              className="w-full text-left p-2 hover:bg-neutral-200"
            >
              All
            </button>
          )}
          {options.map((c) => (
            <li key={c.value}>
              <button
                onClick={() => onChange(c.value)}
                className="w-full text-left p-2 hover:bg-neutral-200"
              >
                {c.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
