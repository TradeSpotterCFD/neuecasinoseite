
import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import { Plus } from "lucide-react";

interface DepositOption {
  id: string;
  name: string;
  min_deposit: number | null;
  max_deposit: number | null;
  processing_time: string | null;
  created_at: string;
}

export default function AdminDepositOptions() {
  const [depositOptions, setDepositOptions] = useState<DepositOption[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDepositOptions = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('deposit_options')
          .select('*')
          .order('name');
        
        if (error) throw error;
        setDepositOptions(data || []);
      } catch (error) {
        console.error("Error fetching deposit options:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDepositOptions();
  }, []);

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Manage Deposit Options</h2>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add Deposit Option
        </Button>
      </div>
      
      {isLoading ? (
        <div className="text-center py-8">Loading deposit options...</div>
      ) : depositOptions.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground mb-4">No deposit options found</p>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Your First Deposit Option
          </Button>
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Min. Deposit</TableHead>
                <TableHead>Max. Deposit</TableHead>
                <TableHead>Processing Time</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {depositOptions.map((option) => (
                <TableRow key={option.id}>
                  <TableCell className="font-medium">{option.name}</TableCell>
                  <TableCell>{option.min_deposit ? `$${option.min_deposit}` : '-'}</TableCell>
                  <TableCell>{option.max_deposit ? `$${option.max_deposit}` : '-'}</TableCell>
                  <TableCell>{option.processing_time || '-'}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
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
    </AdminLayout>
  );
}
