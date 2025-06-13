import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { supabase } from '@/integrations/supabase/client';
import bcrypt from "bcryptjs";

import { useForm } from "react-hook-form";
import { toast } from "@/components/ui/use-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const loginSchema = z.object({
  email: z.string().email({ message: "Bitte geben Sie eine gültige E-Mail-Adresse ein" }),
  password: z.string().min(1, { message: "Passwort ist erforderlich" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function AdminLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      setIsLoading(true);

      const { data: admin, error } = await supabase
        .from('admins')
        .select('*')
        .eq('email', data.email)
        .maybeSingle();

      if (error) throw new Error("Fehler beim Laden des Admins.");
      if (!admin) throw new Error("Admin nicht gefunden.");

      const isPasswordCorrect = await bcrypt.compare(data.password, admin.password_hash);

      if (!isPasswordCorrect) {
        throw new Error("Falsches Passwort.");
      }

      // Nach erfolgreicher Passwortprüfung, starte die Supabase Auth Session
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (signInError) {
        // Hier könnte ein spezifischerer Fehler sinnvoll sein, z.B. wenn das Passwort
        // in Supabase Auth anders ist als das, was wir gerade mit bcrypt geprüft haben.
        console.error("Supabase Auth signIn Error:", signInError);
        throw new Error("Fehler beim Starten der Admin-Session.");
      }

      if (!signInData.session) {
        throw new Error("Konnte keine Admin-Session starten.");
      }


      toast({ title: "Login erfolgreich" });
      navigate("/admin/dashboard");
    } catch (error: any) {
      toast({ title: error.message || "Login fehlgeschlagen", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-casino p-4">
      <Card className="w-full max-w-md shadow-casino-card">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold text-casino-blue">Admin Login</CardTitle>
          <CardDescription>
            Geben Sie Ihre Anmeldedaten ein, um auf das Admin-Dashboard zuzugreifen
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Ihre E-Mail-Adresse" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Passwort</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Ihr Passwort" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Anmelden..." : "Anmelden"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

