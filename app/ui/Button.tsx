"use client";

import React from "react";
import { LucideIcon } from "lucide-react";
import clsx from "clsx";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  disabled = false,
  icon: Icon,
  iconPosition = "left",
  className,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        "inline-flex items-center justify-center font-medium rounded-md transition-colors",
        "focus:outline-none focus:ring-2 focus:ring-offset-2",
        {
          // Primary variant
          "bg-green-500 text-white hover:bg-green-600 focus:ring-green-500 disabled:bg-gray-300 disabled:text-gray-600 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-600":
            variant === "primary",
          // Secondary variant
          "bg-green-50 text-green-600 hover:bg-green-100 focus:ring-green-500 disabled:bg-gray-100 disabled:text-gray-400 dark:bg-green-900 dark:text-green-200 dark:hover:bg-green-800 dark:focus:ring-green-600":
            variant === "secondary",
          // Outline variant
          "border border-green-500 text-green-600 hover:bg-green-50 focus:ring-green-500 disabled:border-gray-300 disabled:text-gray-300 dark:border-green-400 dark:text-green-400 dark:hover:bg-green-900 dark:focus:ring-green-400":
            variant === "outline",
          // Ghost variant
          "text-green-600 hover:bg-green-50 focus:ring-green-500 disabled:text-gray-300 dark:text-green-400 dark:hover:bg-green-900 dark:focus:ring-green-400":
            variant === "ghost",
          // Danger variant
          "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500 disabled:bg-gray-300 disabled:text-gray-600 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-600":
            variant === "danger",
        },
        {
          "px-3 py-1.5 text-sm": size === "sm",
          "px-4 py-2 text-sm": size === "md",
          "px-6 py-3 text-base": size === "lg",
        },
        className
      )}
    >
      {Icon && iconPosition === "left" && (
        <Icon className={clsx("h-4 w-4", { "mr-2": children })} />
      )}
      {children}
      {Icon && iconPosition === "right" && (
        <Icon className={clsx("h-4 w-4", { "ml-2": children })} />
      )}
    </button>
  );
};

export default React.memo(Button);
