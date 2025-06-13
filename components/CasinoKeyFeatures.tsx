
import { Check } from "lucide-react";
import { FEATURE_CATEGORIES } from "./admin/FeatureCategoriesCheckboxes";

interface CasinoKeyFeaturesProps {
  features?: string[];
  featureCategories?: string[];
  hidden?: boolean;
}

const CasinoKeyFeatures = ({ features, featureCategories, hidden = false }: CasinoKeyFeaturesProps) => {
  if (hidden) {
    return null;
  }

  // Use featureCategories if available, otherwise fall back to features
  const displayFeatures = featureCategories && featureCategories.length > 0
    ? featureCategories.map(id => {
        const category = FEATURE_CATEGORIES.find(cat => cat.id === id);
        return category ? category.name : id;
      })
    : features || [];

  return (
    <div className="mb-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {displayFeatures.map((feature, index) => (
        <div 
          key={index} 
          className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 flex items-start gap-3"
        >
          <div className="mt-1 bg-green-100 rounded-full p-1 flex-shrink-0">
            <Check className="h-4 w-4 text-green-600" />
          </div>
          <span className="text-gray-800">{feature}</span>
        </div>
      ))}
    </div>
  );
};

export default CasinoKeyFeatures;
