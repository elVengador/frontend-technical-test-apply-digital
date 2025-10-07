import React, { ReactNode } from "react";

type CardProps = { children: ReactNode };
export const Card = ({ children }: CardProps) => {
  return (
    <article className="w-full p-6 flex flex-col gap-5 rounded-2xl border-[0.5px] border-ad-stoke-secondary">
      {children}
    </article>
  );
};
