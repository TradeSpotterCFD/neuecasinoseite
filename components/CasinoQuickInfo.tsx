
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Rating } from "@/components/ui/rating";

interface CasinoQuickInfoProps {
  casino: {
    name: string;
    logo: string;
    rating: number;
    bonus: string;
    url: string;
  };
}

const CasinoQuickInfo = ({ casino }: CasinoQuickInfoProps) => {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-6">
      <div className="text-center mb-4">
        <h3 className="text-2xl font-bold">{casino.name}</h3>
        <div className="flex items-center justify-center gap-2 mt-2">
          <Rating value={casino.rating} />
          <span className="font-semibold">{casino.rating}/5</span>
        </div>
      </div>
      
      <div className="border-t border-gray-200 pt-4 mb-4">
        <div className="text-center mb-2">
          <span className="text-sm text-gray-500">Willkommensbonus:</span>
          <p className="font-bold text-lg">{casino.bonus}</p>
        </div>
      </div>
      
      <Button className="w-full bg-[#703d98] hover:bg-[#5c3180]" asChild>
        <a href={casino.url} target="_blank" rel="noopener noreferrer">
          Zum Casino
          <ArrowRight className="ml-2 h-4 w-4" />
        </a>
      </Button>
      
      <p className="text-xs text-gray-500 text-center mt-3">
        *18+. Es gelten die AGB. Spiele verantwortungsbewusst.
      </p>
    </div>
  );
};

export default CasinoQuickInfo;
