import { useEffect, useState, useCallback } from "react"; // Added useCallback
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import { Plus } from "lucide-react";
import { AddSlotDialog } from "@/components/admin/AddSlotDialog"; // Import the dialog

// Interface might need adjustment based on the final SlotForm/DB structure
interface Slot {
  id: string;
  name: string;
  // Adjust these based on your actual 'slots' table structure
  providers: string[] | null; // Assuming providers is an array now
  rtp: number | null;
  volatility: string | null;
  // min_bet: number | null; // Example: remove if not in new model
  // max_bet: number | null; // Example: remove if not in new model
  created_at: string;
  // Add other fields from SlotForm if needed for the table
  reels?: number | null;
  rows?: number | null;
  paylines?: string | null;
}

export default function AdminSlots() {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddSlotDialogOpen, setIsAddSlotDialogOpen] = useState(false); // State for dialog

  // Wrap fetch function in useCallback
  const fetchSlots = useCallback(async () => {
    try {
      setIsLoading(true);
      // Adjust select query based on your actual table columns
      const { data, error } = await supabase
        .from('slots') 
        .select('id, name, providers, rtp, volatility, reels, rows, paylines, created_at') // Select relevant columns
        .order('name');
      
      if (error) throw error;
      setSlots(data || []);
    } catch (error) {
      console.error("Error fetching slots:", error);
      // Consider adding user feedback here, e.g., using toast
    } finally {
      setIsLoading(false);
    }
  }, []); // Empty dependency array

  useEffect(() => {
    fetchSlots();
  }, [fetchSlots]); // fetchSlots is now stable

  const handleSlotCreated = () => {
    fetchSlots(); // Refresh the list after a slot is created
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Manage Slots</h2>
        {/* Add onClick handler to the button */}
        <Button onClick={() => setIsAddSlotDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Slot
        </Button>
      </div>
      
      {isLoading ? (
        <div className="text-center py-8">Loading slots...</div>
      ) : slots.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground mb-4">No slots found</p>
          {/* Add onClick handler to this button as well */}
          <Button onClick={() => setIsAddSlotDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add Your First Slot
          </Button>
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Providers</TableHead> {/* Changed from Provider */}
                <TableHead>RTP</TableHead>
                <TableHead>Volatility</TableHead>
                <TableHead>Layout</TableHead> {/* Combined Reels/Rows/Paylines */}
                {/* <TableHead>Bet Range</TableHead> */} {/* Removed */}
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {slots.map((slot) => (
                <TableRow key={slot.id}>
                  <TableCell className="font-medium">{slot.name}</TableCell>
                  {/* Display providers array */}
                  <TableCell>{slot.providers?.join(', ') || '-'}</TableCell> 
                  <TableCell>{slot.rtp ? `${slot.rtp}%` : '-'}</TableCell>
                  <TableCell className="capitalize">{slot.volatility || '-'}</TableCell>
                  {/* Display layout info */}
                  <TableCell>
                    {slot.reels || '?'}x{slot.rows || '?'} ({slot.paylines || 'N/A'})
                  </TableCell> 
                  {/* <TableCell>
                    {slot.min_bet && slot.max_bet 
                      ? `$${slot.min_bet} - $${slot.max_bet}` 
                      : '-'}
                  </TableCell> */} {/* Removed */}
                  <TableCell>
                    <div className="flex space-x-2">
                      {/* TODO: Implement Edit/Delete functionality */}
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50">Delete</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Render the dialog */}
      <AddSlotDialog 
        open={isAddSlotDialogOpen} 
        onOpenChange={setIsAddSlotDialogOpen}
        onSlotCreated={handleSlotCreated} // Pass the callback
      />
    </AdminLayout>
  );
}
