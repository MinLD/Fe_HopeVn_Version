import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: "none" | "sm" | "md" | "lg";
  hover?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className = "",
  padding = "md",
  hover = false,
}) => {
  const paddingClasses = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  const baseClasses = "bg-white rounded-lg border border-gray-200 shadow-sm";
  const hoverClasses = hover
    ? "hover:shadow-md transition-shadow cursor-pointer"
    : "";

  return (
    <div
      className={`${baseClasses} ${hoverClasses} ${paddingClasses[padding]} ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
