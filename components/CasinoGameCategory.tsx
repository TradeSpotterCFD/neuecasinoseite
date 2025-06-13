
import React from 'react';
import { GAME_CATEGORIES } from './GameCategoriesModal';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface CasinoGameCategoryProps {
  categoryId: string;
  isAvailable?: boolean;
  className?: string;
}

export function CasinoGameCategory({ categoryId, isAvailable = true, className }: CasinoGameCategoryProps) {
  const category = GAME_CATEGORIES.find(cat => cat.id === categoryId);
  
  if (!category) return null;
  
  const content = (
    <div 
      className={cn(
        "flex flex-col items-center justify-center p-3 bg-white rounded-lg transition-all",
        isAvailable ? 
          "border border-gray-200 hover:shadow-md cursor-pointer" : 
          "opacity-40 grayscale cursor-not-allowed",
        className
      )}
    >
      <div className="w-10 h-10 flex items-center justify-center mb-2">
        {category.icon}
      </div>
      <span className={cn(
        "text-sm font-medium",
        !isAvailable && "text-gray-500"
      )}>
        {category.name}
      </span>
    </div>
  );
  
  if (isAvailable) {
    return (
      <Link to={`/games/${categoryId}`}>
        {content}
      </Link>
    );
  }
  
  return content;
}

export function CasinoGameCategories({ 
  availableCategories = [], 
  className 
}: {
  availableCategories: string[];
  className?: string;
}) {
  return (
    <div className={cn("grid grid-cols-3 sm:grid-cols-5 gap-2", className)}>
      {GAME_CATEGORIES.map(category => (
        <CasinoGameCategory
          key={category.id}
          categoryId={category.id}
          isAvailable={availableCategories.includes(category.id)}
        />
      ))}
    </div>
  );
}
