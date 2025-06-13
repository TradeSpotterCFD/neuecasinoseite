
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingProps {
  value: number;
  max?: number;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function Rating({ value, max = 5, className, size = "md" }: RatingProps) {
  const fullStars = Math.floor(value);
  const hasHalfStar = value % 1 >= 0.5;
  
  const sizeClasses = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  };

  return (
    <div className={cn("flex items-center gap-0.5", className)}>
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            sizeClasses[size],
            "transition-colors",
            i < fullStars
              ? "text-yellow-400 fill-yellow-400"
              : i === fullStars && hasHalfStar
              ? "text-yellow-400 fill-yellow-400 opacity-50"
              : "text-gray-300"
          )}
        />
      ))}
    </div>
  );
}
