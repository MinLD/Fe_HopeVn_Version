"use client";

import React from "react";
import clsx from "clsx";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "danger" | "info";
  size?: "sm" | "md";
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "default",
  size = "md",
  className,
}) => {
  const variantClasses = {
    default: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
    success:
      "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100",
    warning:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100",
    danger: "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100",
    info: "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100",
  };

  const sizeClasses = {
    sm: "px-2 py-1 text-xs",
    md: "px-2.5 py-0.5 text-sm",
  };

  const classes = clsx(
    "inline-flex items-center font-medium rounded-full",
    variantClasses[variant],
    sizeClasses[size],
    className
  );

  return <span className={classes}>{children}</span>;
};

export default React.memo(Badge);
