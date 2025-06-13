
import { Casino } from "@/types";
import { Button } from "@/components/ui/button";
import { Rating } from "@/components/ui/rating";
import { CasinoChip } from "@/components/ui/casino-chip";
import { ArrowRight, ChevronRight, Trophy, Award, Shield, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface CasinoCardProps {
  casino: Casino;
  rank?: number;
  className?: string;
  compact?: boolean;
}

export function CasinoCard({ casino, rank, className, compact = false }: CasinoCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={cn(
        "casino-card group",
        isHovered && "scale-[1.02]",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badge for ranking if provided */}
      {rank && (
        <div className="absolute -top-3 -left-3 w-10 h-10 rounded-full bg-casino-purple text-white flex items-center justify-center font-bold shadow-md z-10">
          #{rank}
        </div>
      )}
      
      {casino.isFeatured && !rank && (
        <div className="absolute -top-3 -left-3 flex items-center gap-1 bg-gradient-to-r from-yellow-500 to-amber-500 text-white text-xs font-medium px-3 py-1 rounded-full shadow-md z-10">
          <Trophy className="h-3.5 w-3.5" />
          <span>Featured</span>
        </div>
      )}

      <div className={cn("flex", compact ? "flex-row" : "flex-col")}>
        {/* Casino Logo & Basic Info */}
        <div className={cn(
          "flex flex-col items-center justify-center p-6 border-b",
          compact ? "border-r border-b-0 w-1/4" : ""
        )}>
          <img 
            src={casino.logo} 
            alt={`${casino.name} logo`} 
            className={cn(
              "object-contain transition-transform", 
              isHovered && "scale-105",
              compact ? "h-14" : "h-20"
            )} 
          />
          <div className="mt-3 text-center">
            <h3 className={cn("font-display font-bold tracking-tight", compact ? "text-lg" : "text-2xl")}>
              {casino.name}
            </h3>
            <div className="mt-2 flex items-center justify-center gap-2">
              <Rating value={casino.rating} />
              <span className="text-gray-700 font-medium">{casino.rating}</span>
            </div>
          </div>
        </div>

        {/* Casino Details */}
        <div className={cn(
          "flex-1 p-6",
          compact ? "" : "border-b"
        )}>
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-casino-purple font-semibold">
              <Award className="h-5 w-5" />
              <span>{casino.bonus}</span>
            </div>
            
            {!compact && (
              <p className="text-gray-600 line-clamp-2">{casino.description}</p>
            )}

            <div className="flex flex-wrap gap-2">
              {casino.features.slice(0, compact ? 2 : 4).map((feature, index) => (
                <CasinoChip key={index} variant="outline">
                  <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                  {feature}
                </CasinoChip>
              ))}
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className={cn(
          "p-6 flex flex-col justify-between gap-3",
          compact ? "w-1/4" : ""
        )}>
          {!compact && (
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Shield className="h-4 w-4 text-green-600" />
              <span>Licensed by {casino.licenseInfo}</span>
            </div>
          )}

          <Button className="w-full group-hover:bg-casino-blue transition-colors">
            Visit Casino
            <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
          
          <a 
            href="#" 
            className="text-sm text-center text-blue-600 hover:text-blue-700 hover:underline flex items-center justify-center gap-1"
          >
            Read Review
            <ChevronRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
