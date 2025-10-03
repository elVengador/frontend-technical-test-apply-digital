import { twMerge } from "tailwind-merge";
import React, { ComponentPropsWithoutRef } from "react";

type ButtonVariant = "outline" | "solid";

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: ButtonVariant;
};

const styles: { [key in ButtonVariant]: string } = {
  outline:
    "border border-ad-gray-medium text-ad-gray-medium hover:bg-ad-cta-fill-primary hover:text-white",
  solid: "bg-ad-cta-fill-primary text-white hover:bg-neutral-700",
};

export const Button = ({
  children,
  className,
  variant = "outline",
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      className={twMerge(
        `p-5 rounded font-bold ${styles[variant]} ${className}`
      )}
    >
      {children}
    </button>
  );
};
