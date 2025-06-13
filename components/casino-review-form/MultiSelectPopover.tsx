import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { FormControl } from "@/components/ui/form";
import { ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface MultiSelectPopoverProps {
  formField: any; // Replace 'any' with a more specific type if possible
  isPopoverOpen: boolean;
  setPopoverOpenState: (open: boolean) => void;
  searchValue: string;
  setSearchValue: (search: string) => void;
  allItemsList: string[];
  filteredItemsList: string[];
  buttonTextSingular: string;
  buttonTextPlural: string;
  placeholder: string;
  searchPlaceholder: string;
  form: any; // Pass the form instance to setValue
}

export function MultiSelectPopover({
  formField,
  isPopoverOpen,
  setPopoverOpenState,
  searchValue,
  setSearchValue,
  allItemsList,
  filteredItemsList,
  buttonTextSingular,
  buttonTextPlural,
  placeholder,
  searchPlaceholder,
  form,
}: MultiSelectPopoverProps) {
  return (
    <Popover open={isPopoverOpen} onOpenChange={setPopoverOpenState} modal={true}>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={isPopoverOpen}
            className={cn(
              "w-full justify-between",
              !formField.value || formField.value.length === 0 && "text-muted-foreground"
            )}
          >
            {formField.value && formField.value.length > 0
              ? `${formField.value.length} ${formField.value.length === 1 ? buttonTextSingular : buttonTextPlural} ausgewählt`
              : placeholder}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-[--radix-popover-trigger-width] max-h-[--radix-popover-content-available-height] p-0">
        <Command>
          <CommandInput
            placeholder={searchPlaceholder}
            value={searchValue}
            onValueChange={setSearchValue}
          />
          <CommandList>
            <CommandEmpty>Keine Einträge gefunden.</CommandEmpty>
            <CommandGroup>
              <ScrollArea className="h-72">
                {filteredItemsList.map((item) => (
                  <CommandItem
                    key={item}
                    value={item}
                    onSelect={() => {
                      const isSelected = formField.value?.includes(item);
                      const newValue = isSelected
                        ? formField.value?.filter((v: string) => v !== item)
                        : [...(formField.value || []), item];
                      form.setValue(formField.name, newValue); // Use form.setValue with field.name
                    }}
                  >
                    <Checkbox
                      className="mr-2"
                      checked={formField.value?.includes(item)}
                    />
                    {item}
                  </CommandItem>
                ))}
              </ScrollArea>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
