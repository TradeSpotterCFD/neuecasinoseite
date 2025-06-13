import React, { useState } from "react";
import { ChevronDown, Check, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";
import { CasinoBrand } from "@/types";

const casinoBrands: CasinoBrand[] = [
  { id: "1", name: "888 Holdings" },
  { id: "2", name: "Ainsworth Game Technology" }, 
  { id: "3", name: "Amatic Industries" },
  { id: "4", name: "Amaya Gaming" },
  { id: "5", name: "Amusnet " }, 
  { id: "6", name: "Aristocrat Leisure Limited" }, 
  { id: "8", name: "Bally Technologies" },
  { id: "9", name: "Bally Wulff" }, 
  { id: "10", name: "Barcrest" }, 
  { id: "11", name: "Betsoft" },
  { id: "12", name: "Big Time Gaming" },
  { id: "13", name: "Blueprint Gaming" },
  { id: "14", name: "Cryptologic" }, 
  { id: "15", name: "EGT Interactive" }, 
  { id: "16", name: "Elk Studios" },
  { id: "17", name: "Endorphina" },
  { id: "18", name: "Evolution Gaming" }, 
  { id: "19", name: "Evoplay Entertainment" },
  { id: "20", name: "GameArt" },
  { id: "21", name: "Gamesys" },
  { id: "22", name: "Habanero" },
  { id: "23", name: "High 5 Games" }, 
  { id: "24", name: "IGT " }, 
  { id: "25", name: "iSoftBet" },
  { id: "26", name: "Konami Gaming" },
  { id: "27", name: "Leander Games" },
  { id: "28", name: "Lightning Box Games" },
  { id: "29", name: "Merkur Gaming" },
  { id: "30", name: "Microgaming" },
  { id: "31", name: "NetEnt" }, 
  { id: "32", name: "NextGen Gaming" }, 
  { id: "33", name: "Novomatic" },
  { id: "34", name: "Play'n GO" }, 
  { id: "35", name: "Playson" },
  { id: "36", name: "Playtech" },
  { id: "37", name: "Pragmatic Play" }, 
  { id: "39", name: "Quickspin" },
  { id: "40", name: "Red Tiger Gaming" },
  { id: "41", name: "Reel Time Gaming" }, 
  { id: "42", name: "Relax Gaming" },
  { id: "43", name: "Rival Gaming" },
  { id: "44", name: "Scientific Games" },
  { id: "45", name: "Spinomenal" },
  { id: "46", name: "StakeLogic" }, 
  { id: "47", name: "Thunderkick" },
  { id: "48", name: "Wazdan" },
  { id: "49", name: "WGS Technology" }, 
  { id: "50", name: "WMS Gaming" }, 
  { id: "51", name: "Yggdrasil Gaming" },
];

export const CasinoBrandsDropdown = () => {
  const [open, setOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<CasinoBrand | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSelectBrand = (brand: CasinoBrand) => {
    setSelectedBrand(brand);
    setOpen(false);
  };

  const handleClearSelection = () => {
    setSelectedBrand(null);
    setSearchQuery("");
    setOpen(false);
  };

  const filteredBrands = searchQuery
    ? casinoBrands.filter((brand) =>
        brand.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : casinoBrands;

  return (
    <div className="relative w-[350px]">
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between h-10 min-h-[40px]"
            style={{ width: "350px", height: "40px" }}
          >
            <span className="truncate max-w-[calc(100%-24px)]">{selectedBrand ? selectedBrand.name : "Select Casino Brand"}</span>
            {selectedBrand ? (
              <X
                className="ml-2 h-4 w-4 shrink-0 opacity-50 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClearSelection();
                }}
              />
            ) : (
              <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-[350px] p-0"
          style={{ width: "350px" }}
          align="start"
          sideOffset={4}
        >
          <Command className="w-full">
            <CommandInput
              placeholder="Search casino brands..."
              value={searchQuery}
              onValueChange={setSearchQuery}
              className="h-9"
            />
            <CommandList className="max-h-[300px] overflow-auto">
              <CommandEmpty>No casino brand found.</CommandEmpty>
              <CommandGroup>
                <CommandItem
                  value="all-casinos"
                  onSelect={() => handleClearSelection()}
                  className="flex items-center justify-between px-2 py-1.5 cursor-pointer text-primary"
                >
                  <span className="font-medium">All Casinos</span>
                  {!selectedBrand && (
                    <Check className="h-4 w-4 text-primary shrink-0" />
                  )}
                </CommandItem>
                {filteredBrands.map((brand) => (
                  <CommandItem
                    key={brand.id}
                    value={brand.name}
                    onSelect={() => handleSelectBrand(brand)}
                    className="flex items-center justify-between px-2 py-1.5 cursor-pointer"
                  >
                    <div className="flex flex-col overflow-hidden">
                      <span className="truncate">{brand.name}</span>
                      {brand.source && ( // This part still exists, but will only show for sources other than VegasSlotsOnline
                        <span className="text-xs text-muted-foreground truncate">
                          {brand.source}
                        </span>
                      )}
                    </div>
                    {selectedBrand?.id === brand.id && (
                      <Check className="h-4 w-4 text-primary shrink-0" />
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
