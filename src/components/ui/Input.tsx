"use client";

import React, { forwardRef, useId } from "react";
import { cn } from "@/lib/cn";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className, id, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs font-medium text-grey-700 uppercase tracking-wider"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-grey-500 pointer-events-none">
              {icon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              "h-10 w-full px-3 border rounded-sm bg-white text-base",
              "placeholder:text-grey-400",
              "transition-colors duration-150",
              "focus:outline-none focus:border-black focus:ring-1 focus:ring-black",
              "disabled:bg-grey-50 disabled:text-grey-400 disabled:cursor-not-allowed",
              error
                ? "border-danger focus:border-danger focus:ring-danger"
                : "border-grey-300",
              icon && "pl-9",
              className
            )}
            aria-invalid={error ? "true" : undefined}
            aria-describedby={error ? `${inputId}-error` : undefined}
            {...props}
          />
        </div>
        {error && (
          <p
            id={`${inputId}-error`}
            className="text-xs text-danger"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
