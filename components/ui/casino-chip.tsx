
import { cn } from "@/lib/utils";
import React from "react";

interface CasinoChipProps {
  children: React.ReactNode;
  variant?: "default" | "outline" | "secondary" | "primary";
  className?: string;
}

export function CasinoChip({
  children,
  variant = "default",
  className,
}: CasinoChipProps) {
  return (
    <span
      className={cn(
        "casino-chip inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full",
        variant === "default" && "bg-gray-100 text-gray-800",
        variant === "outline" && "border border-gray-200 bg-transparent text-gray-700",
        variant === "secondary" && "bg-blue-100 text-blue-800",
        variant === "primary" && "bg-primary/10 text-primary",
        className
      )}
    >
      {children}
    </span>
  );
}
