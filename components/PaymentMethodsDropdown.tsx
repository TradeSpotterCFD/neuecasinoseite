import React, { useState } from "react";
import { ChevronDown, Check, X, CreditCard } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";

interface PaymentMethod {
  id: string;
  name: string;
  category: string;
}

const paymentMethods: PaymentMethod[] = [
  // Credit and Debit Cards
  { id: "visa", name: "Visa", category: "Credit and Debit Cards" },
  { id: "mastercard", name: "MasterCard", category: "Credit and Debit Cards" },
  { id: "maestro", name: "Maestro", category: "Credit and Debit Cards" },
  { id: "amex", name: "American Express (Amex)", category: "Credit and Debit Cards" },
  { id: "diners", name: "Diners Club", category: "Credit and Debit Cards" },

  // E-Wallets
  { id: "paypal", name: "PayPal", category: "E-Wallets" },
  { id: "skrill", name: "Skrill", category: "E-Wallets" },
  { id: "neteller", name: "Neteller", category: "E-Wallets" },
  { id: "ecopayz", name: "ecoPayz", category: "E-Wallets" },
  { id: "muchbetter", name: "MuchBetter", category: "E-Wallets" },
  { id: "webmoney", name: "WebMoney", category: "E-Wallets" },
  { id: "astropay", name: "AstroPay", category: "E-Wallets" },
  { id: "jeton", name: "Jeton Wallet", category: "E-Wallets" },

  // Prepaid Cards and Vouchers
  { id: "paysafecard", name: "Paysafecard", category: "Prepaid Cards and Vouchers" },
  { id: "neosurf", name: "Neosurf", category: "Prepaid Cards and Vouchers" },
  { id: "astropaycard", name: "AstroPay Card", category: "Prepaid Cards and Vouchers" },
  { id: "flexepin", name: "Flexepin", category: "Prepaid Cards and Vouchers" },
  { id: "ecovoucher", name: "EcoVoucher", category: "Prepaid Cards and Vouchers" },

  // Bank Transfers
  { id: "direct-bank", name: "Direct Bank Transfer", category: "Bank Transfers" },
  { id: "wire", name: "Wire Transfer", category: "Bank Transfers" },
  { id: "trustly", name: "Trustly", category: "Bank Transfers" },
  { id: "sofort", name: "Sofort", category: "Bank Transfers" },
  { id: "giropay", name: "Giropay", category: "Bank Transfers" },
  { id: "interac", name: "Interac", category: "Bank Transfers" },
  { id: "ideal", name: "iDEAL", category: "Bank Transfers" },
  { id: "eps", name: "EPS (Austria)", category: "Bank Transfers" },

  // Mobile Payments
  { id: "apple-pay", name: "Apple Pay", category: "Mobile Payments" },
  { id: "google-pay", name: "Google Pay", category: "Mobile Payments" },
  { id: "pay-by-phone", name: "Pay by Phone", category: "Mobile Payments" },

  // Cryptocurrencies
  { id: "bitcoin", name: "Bitcoin (BTC)", category: "Cryptocurrencies" },
  { id: "ethereum", name: "Ethereum (ETH)", category: "Cryptocurrencies" },
  { id: "litecoin", name: "Litecoin (LTC)", category: "Cryptocurrencies" },
  { id: "bitcoin-cash", name: "Bitcoin Cash (BCH)", category: "Cryptocurrencies" },
  { id: "ripple", name: "Ripple (XRP)", category: "Cryptocurrencies" },
  { id: "tether", name: "Tether (USDT)", category: "Cryptocurrencies" },
  { id: "dogecoin", name: "Dogecoin (DOGE)", category: "Cryptocurrencies" },
  { id: "cardano", name: "Cardano (ADA)", category: "Cryptocurrencies" },
  { id: "binance", name: "Binance Coin (BNB)", category: "Cryptocurrencies" },

  // Region-Specific
  { id: "klarna", name: "Klarna (Europe)", category: "Region-Specific Payment Methods" },
  { id: "instadebit", name: "Instadebit (Canada)", category: "Region-Specific Payment Methods" },
  { id: "poli", name: "POLi (Australia/New Zealand)", category: "Region-Specific Payment Methods" },
  { id: "payu", name: "PayU (Latin America)", category: "Region-Specific Payment Methods" },
  { id: "rupay", name: "RuPay (India)", category: "Region-Specific Payment Methods" },
  // { id: "upi", name: "Unified Payments Interface (UPI, India)", category: "Region-Specific Payment Methods" }, // Entfernt
  { id: "pix", name: "Pix (Brazil)", category: "Region-Specific Payment Methods" },
];

export const PaymentMethodsDropdown = () => {
  const [open, setOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSelectPayment = (payment: PaymentMethod) => {
    setSelectedPayment(payment);
    setOpen(false);
  };

  const handleClearSelection = () => {
    setSelectedPayment(null);
    setSearchQuery("");
    setOpen(false);
  };

  // Group payment methods by category
  const paymentMethodsByCategory = paymentMethods.reduce((acc, method) => {
    if (!acc[method.category]) {
      acc[method.category] = [];
    }
    acc[method.category].push(method);
    return acc;
  }, {} as Record<string, PaymentMethod[]>);

  // Filter categories and payment methods based on search
  const filteredCategories = Object.keys(paymentMethodsByCategory).filter(category => {
    if (!searchQuery) return true;

    // Check if category matches search
    if (category.toLowerCase().includes(searchQuery.toLowerCase())) return true;

    // Check if any payment method in this category matches search
    return paymentMethodsByCategory[category].some(method =>
      method.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    // Entferne feste Breite, verwende w-full
    <div className="relative w-full">
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            // Entferne feste Breite, verwende w-full
            className="w-full justify-between h-10 min-h-[40px]"
            // Entferne style={{ width: "350px", height: "40px" }}
          >
            <span className="flex items-center gap-2 truncate max-w-[calc(100%-24px)]">
              <CreditCard className="h-4 w-4" />
              {selectedPayment ? selectedPayment.name : "Select Payment Method"}
            </span>
            {selectedPayment ? (
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
          // Entferne feste Breite, verwende w-full
          className="w-full p-0"
          // Entferne style={{ width: "350px" }}
          align="start"
          sideOffset={4}
        >
          <Command className="w-full">
            <CommandInput
              placeholder="Search payment methods..."
              value={searchQuery}
              onValueChange={setSearchQuery}
              className="h-9"
            />
            <CommandList className="max-h-[300px] overflow-auto">
              <CommandEmpty>No payment method found.</CommandEmpty>
              <CommandItem
                value="all-payments"
                onSelect={() => handleClearSelection()}
                className="flex items-center justify-between px-2 py-1.5 cursor-pointer text-primary"
              >
                <span className="font-medium">All Payment Methods</span>
                {!selectedPayment && (
                  <Check className="h-4 w-4 text-primary shrink-0" />
                )}
              </CommandItem>

              {filteredCategories.map((category) => (
                <CommandGroup key={category} heading={category}>
                  {paymentMethodsByCategory[category]
                    .filter(method =>
                      !searchQuery ||
                      method.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      category.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((method) => (
                      <CommandItem
                        key={method.id}
                        value={method.name}
                        onSelect={() => handleSelectPayment(method)}
                        className="flex items-center justify-between px-2 py-1.5 cursor-pointer"
                      >
                        <span className="truncate">{method.name}</span>
                        {selectedPayment?.id === method.id && (
                          <Check className="h-4 w-4 text-primary shrink-0" />
                        )}
                      </CommandItem>
                    ))}
                </CommandGroup>
              ))}
            </CommandList>
          </Command>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
