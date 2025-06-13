
import { useState } from "react";
import { Globe } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Language = {
  code: string;
  name: string;
  flag: string;
};

const languages: Language[] = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "it", name: "Italiano", flag: "🇮🇹" },
  { code: "pl", name: "Polski", flag: "🇵🇱" },
  { code: "pt-BR", name: "Português (Brasil)", flag: "🇧🇷" },
  { code: "pt-PT", name: "Português (Portugal)", flag: "🇵🇹" },
];

export function LanguageSwitcher() {
  const [currentLanguage, setCurrentLanguage] = useState<string>("en");

  const handleLanguageChange = (value: string) => {
    setCurrentLanguage(value);
    // Here you would implement actual language switching logic
    console.log(`Language changed to: ${value}`);
  };

  return (
    <Select value={currentLanguage} onValueChange={handleLanguageChange}>
      <SelectTrigger className="w-[180px] h-9 bg-background border border-input hover:bg-accent hover:text-accent-foreground">
        <SelectValue placeholder="Select language">
          <div className="flex items-center gap-2">
            <Globe className="h-3.5 w-3.5" />
            <span className="text-sm">{languages.find(l => l.code === currentLanguage)?.name}</span>
          </div>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {languages.map((language) => (
          <SelectItem key={language.code} value={language.code} className="cursor-pointer">
            <div className="flex items-center gap-2">
              <span className="text-base">{language.flag}</span>
              <span>{language.name}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
