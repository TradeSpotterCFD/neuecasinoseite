import { useEffect, useState, useCallback } from "react"; // Added useCallback
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Hotel, CreditCard, Gamepad2, Plus, FileText, Globe, Tag, BarChart2, TrendingUp, DollarSign, Percent } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { AddSlotDialog } from "@/components/admin/AddSlotDialog"; // Import the new dialog

export default function AdminDashboard() {
  const [casinoCount, setCasinoCount] = useState<number>(0);
  const [depositOptionsCount, setDepositOptionsCount] = useState<number>(0);
  const [slotsCount, setSlotsCount] = useState<number>(0);
  const [countriesCount, setCountriesCount] = useState<number>(0);
  const [casinoTypesCount, setCasinoTypesCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddSlotDialogOpen, setIsAddSlotDialogOpen] = useState(false); // State for the dialog
  const navigate = useNavigate();

  // Function to fetch counts, wrapped in useCallback
  const fetchCounts = useCallback(async () => {
    try {
      setIsLoading(true);
      
      const { count: casinos } = await supabase.from('casinos').select('*', { count: 'exact', head: true });
      setCasinoCount(casinos || 0);

      const { count: depositOptions } = await supabase.from('deposit_options').select('*', { count: 'exact', head: true });
      setDepositOptionsCount(depositOptions || 0);

      // Ensure 'slots' table exists before querying
      const { count: slots, error: slotsError } = await supabase.from('slots').select('*', { count: 'exact', head: true });
      if (slotsError) {
         console.warn("Could not fetch slots count, table might not exist yet:", slotsError.message);
         setSlotsCount(0);
      } else {
         setSlotsCount(slots || 0);
      }


      // const { count: countries } = await supabase.from('countries').select('*', { count: 'exact', head: true });
      // setCountriesCount(countries || 0);
      setCountriesCount(0); // Dummy-Wert

      // const { count: casinoTypes } = await supabase.from('casino_types').select('*', { count: 'exact', head: true });
      // setCasinoTypesCount(casinoTypes || 0);
      setCasinoTypesCount(0); // Dummy-Wert

    } catch (error) {
      console.error("Error fetching counts:", error);
    } finally {
      setIsLoading(false);
    }
  }, []); // Empty dependency array means this function is created once

  useEffect(() => {
    fetchCounts();
  }, [fetchCounts]); // fetchCounts is now stable

  // Callback function to refresh counts after slot creation
  const handleSlotCreated = () => {
    fetchCounts(); // Re-fetch counts
  };

  return (
    <AdminLayout>
      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-5">
         <Card>
           <CardHeader className="flex flex-row items-center justify-between pb-2">
             <CardTitle className="text-sm font-medium">Total Casinos</CardTitle>
             <Hotel className="h-4 w-4 text-muted-foreground" />
           </CardHeader>
           <CardContent>
             <div className="text-2xl font-bold">{casinoCount}</div>
           </CardContent>
         </Card>
         <Card>
           <CardHeader className="flex flex-row items-center justify-between pb-2">
             <CardTitle className="text-sm font-medium">Countries</CardTitle>
             <Globe className="h-4 w-4 text-green-500" />
           </CardHeader>
           <CardContent>
             <div className="text-2xl font-bold">{countriesCount}</div>
           </CardContent>
         </Card>
         <Card>
           <CardHeader className="flex flex-row items-center justify-between pb-2">
             <CardTitle className="text-sm font-medium">Payment Methods</CardTitle>
             <CreditCard className="h-4 w-4 text-purple-500" />
           </CardHeader>
           <CardContent>
             <div className="text-2xl font-bold">{depositOptionsCount}</div>
           </CardContent>
         </Card>
         <Card>
           <CardHeader className="flex flex-row items-center justify-between pb-2">
             <CardTitle className="text-sm font-medium">Casino Types</CardTitle>
             <Tag className="h-4 w-4 text-orange-500" />
           </CardHeader>
           <CardContent>
             <div className="text-2xl font-bold">{casinoTypesCount}</div>
           </CardContent>
         </Card>
         <Card>
           <CardHeader className="flex flex-row items-center justify-between pb-2">
             <CardTitle className="text-sm font-medium">Slots</CardTitle>
             <Gamepad2 className="h-4 w-4 text-muted-foreground" />
           </CardHeader>
           <CardContent>
             <div className="text-2xl font-bold">{slotsCount}</div>
           </CardContent>
         </Card>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex gap-4">
         <Button onClick={() => navigate("/admin/casinos/new")}> {/* Assuming a route for adding casinos */}
            <Plus className="mr-2 h-4 w-4" /> Add New Casino
         </Button>
         <Button onClick={() => setIsAddSlotDialogOpen(true)}> {/* Button to open the dialog */}
            <Plus className="mr-2 h-4 w-4" /> Add New Slot
         </Button>
         {/* Add other action buttons here if needed */}
      </div>


      {/* Performance / Activity Cards */}
      <div className="grid gap-4 md:grid-cols-4 mt-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Visits Today</CardTitle>
            <BarChart2 className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,245</div>
            <p className="text-xs text-green-600">+12.5% vs last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Casino Clicks</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">342</div>
            <p className="text-xs text-green-600">+8.2% vs last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,432</div>
            <p className="text-xs text-green-600">+15.3% vs last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <Percent className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.2%</div>
            <p className="text-xs text-red-600">-0.4% vs last week</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>New casino added: Casino Royale</div>
              <span className="text-xs text-muted-foreground">5 minutes ago</span>
            </div>
            <div className="flex items-center justify-between">
              <div>New payment method: CryptoPay</div>
              <span className="text-xs text-muted-foreground">2 hours ago</span>
            </div>
            <div className="flex items-center justify-between">
              <div>Casino updated: Lucky Star</div>
              <span className="text-xs text-muted-foreground">Yesterday</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Casinos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>Alpha Casino</div>
              <div className="flex items-center gap-2">
                <span className="text-xs">Clicks: 342</span>
                <span className="text-xs">Conv: 4.8%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>Beta Casino</div>
              <div className="flex items-center gap-2">
                <span className="text-xs">Clicks: 287</span>
                <span className="text-xs">Conv: 3.9%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>Gamma Casino</div>
              <div className="flex items-center gap-2">
                <span className="text-xs">Clicks: 245</span>
                <span className="text-xs">Conv: 3.5%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Render the Add Slot Dialog */}
      <AddSlotDialog 
        open={isAddSlotDialogOpen} 
        onOpenChange={setIsAddSlotDialogOpen}
        onSlotCreated={handleSlotCreated} // Pass the callback
      />
    </AdminLayout>
  );
}
