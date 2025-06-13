import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { supabase } from '@/integrations/supabase/client'
import bcrypt from "bcryptjs"; // Import bcryptjs

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";


export default function AdminSetup() {
  const [isLoading, setIsLoading] = useState(false);
  const [isCreated, setIsCreated] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const navigate = useNavigate();

  // Admin-Zugangsdaten
  const adminEmail = "sportwettenprofi@gmail.com";
  const adminPassword = "wert818181+++@@@";

  const handleCreateAdmin = async () => {

    try {

      setIsLoading(true);
      setError(null);
      console.log("Erstelle Admin-Benutzer:", adminEmail);

      // Schritt 1: Aktuelle Session beenden
      await supabase.auth.signOut();
      console.log("Bestehende Sessions abgemeldet");

      // Schritt 2: Bestehende Einträge in admins Tabelle löschen
      console.log("Lösche bestehende Admin-Einträge aus der Datenbank");
      const { error: deleteError } = await supabase
        .from('admins') // Korrigierte Tabelle
        .delete()
        .eq('email', adminEmail);

      if (deleteError) {
        console.error("Fehler beim Löschen des bestehenden Admins:", deleteError);
        throw new Error("Fehler beim Löschen des bestehenden Admin-Datenbankeintrags: " + deleteError.message);
      }

      // Versuche eine neue Anmeldung (optional, je nach Setup-Logik)
      // Dieser Teil kann bleiben, wenn Supabase Auth für die Sitzungsverwaltung genutzt wird,
      // aber der eigentliche Passwort-Check erfolgt über die 'admins'-Tabelle.
      console.log("Versuche Registrierung mit neuem Benutzer (Supabase Auth)");
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: adminEmail,
        password: adminPassword,
        options: {
          data: {
            is_admin: true // Beispiel für zusätzliche Metadaten
          }
        }
      });

      if (signUpError && signUpError.message !== "User already registered") {
        console.error("Fehler bei der Registrierung:", signUpError);
        // Entscheiden, ob dies ein harter Fehler sein soll oder ob wir trotzdem versuchen,
        // den Eintrag in 'admins' zu erstellen/aktualisieren.
        // Hier werfen wir den Fehler, um den Prozess zu stoppen.
        throw signUpError;
      }

      // Wenn der User existiert, versuchen wir eine Anmeldung (optional)
      if (signUpError && signUpError.message === "User already registered") {
        console.log("Benutzer existiert bereits in Supabase Auth, versuche Anmeldung");

        const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
          email: adminEmail,
          password: adminPassword,
        });

        if (signInError) {
          // Wenn die Anmeldung hier fehlschlägt, könnte das Passwort in Supabase Auth falsch sein.
          // Das ist ein separates Problem von unserem bcrypt-Login.
          console.error("Anmeldung bei Supabase Auth fehlgeschlagen:", signInError);
          // Wir könnten hier den Dialog anzeigen oder einfach weitermachen,
          // da der Login über die 'admins'-Tabelle erfolgt.
          // setDialogOpen(true);
          // setIsLoading(false);
          // return;
        } else {
          console.log("Anmeldung bei Supabase Auth erfolgreich, User ID:", signInData.user?.id);
          // Abmelden nach der Überprüfung, da wir die Session nicht benötigen
          await supabase.auth.signOut();
        }
      }


      // Passwort hashen
      console.log("Hashe das Passwort");
      const saltRounds = 10; // Empfohlener Wert für bcrypt
      const hashedPassword = await bcrypt.hash(adminPassword, saltRounds);
      console.log("Passwort gehasht");


      // Admin in die Datenbank einfügen (korrigierte Tabelle und mit Hash)
      console.log("Füge Admin zur 'admins'-Datenbank hinzu");
      const { error: insertError } = await supabase
        .from('admins') // Korrigierte Tabelle
        .insert([
          { email: adminEmail, password_hash: hashedPassword } // Korrigierte Spalte und gehashtes Passwort
        ]);

      if (insertError) {
        console.error("Fehler beim Einfügen des Admins in die Datenbank:", insertError);
        throw new Error("Fehler beim Erstellen des Admin-Datenbankeintrags: " + insertError.message);
      } else {
        console.log("Admin erfolgreich zur 'admins'-Datenbank hinzugefügt");
      }

      setIsCreated(true);

      toast({
        title: "Admin-Benutzer eingerichtet",
        description: `Admin-Benutzer wurde erfolgreich eingerichtet.`,
      });

    } catch (err: any) {
      console.error("Fehler beim Admin-Setup:", err);
      setError(err.message);
      toast({
        title: "Fehler beim Einrichten des Admin-Benutzers",
        description: err.message || "Ein Fehler ist beim Einrichten des Admin-Benutzers aufgetreten.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-casino p-4">
      <Card className="w-full max-w-md shadow-casino-card">
        <CardHeader>
          <CardTitle>Admin-Setup</CardTitle>
          <CardDescription>
            {isCreated
              ? "Der Admin-Benutzer wurde eingerichtet und ist einsatzbereit."
              : "Richten Sie den Admin-Benutzer ein, um fortzufahren."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isCreated ? (
            <div className="text-center space-y-4">
              <p className="text-green-600 font-medium">✅ Admin-Benutzer ist eingerichtet!</p>
              <div className="bg-gray-100 p-3 rounded text-left">
                <p><strong>E-Mail:</strong> {adminEmail}</p>
                <p><strong>Passwort:</strong> {adminPassword}</p>
              </div>
              <p className="text-sm text-muted-foreground">
                Sie können diese Anmeldedaten verwenden, um sich am Admin-Panel anzumelden.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <p>
                Klicken Sie auf die Schaltfläche unten, um einen Admin-Benutzer einzurichten.
              </p>
              <div className="bg-gray-100 p-3 rounded">
                <p><strong>E-Mail:</strong> {adminEmail}</p>
                <p><strong>Passwort:</strong> {adminPassword}</p>
              </div>
              {error && (
                <p className="text-sm text-red-500">{error}</p>
              )}
              <Button
                onClick={handleCreateAdmin}
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "Richte ein..." : "Admin-Benutzer einrichten"}
              </Button>

              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Admin-Benutzerreset erforderlich (Supabase Auth)</DialogTitle>
                    <DialogDescription>
                      <p className="mb-4">
                        Der Benutzer existiert bereits in Supabase Auth, aber das Passwort stimmt nicht überein
                        oder der Benutzer wurde nicht bestätigt. Dies betrifft nur die Supabase Auth-Anmeldung,
                        nicht den Login über die 'admins'-Tabelle.
                      </p>

                      <div className="space-y-4">
                        <p className="font-medium">Wenn Sie Supabase Auth verwenden möchten, führen Sie einen der folgenden Schritte aus:</p>

                        <div className="border p-3 rounded-md bg-yellow-50">
                          <p className="font-semibold mb-2">Option 1: Supabase Dashboard</p>
                          <ol className="list-decimal pl-5 space-y-1">
                            <li>Gehen Sie zum Supabase Dashboard</li>
                            <li>Wählen Sie {"\"Authentication\" > \"Users\""}</li>
                            <li>Suchen Sie den Benutzer: {adminEmail}</li>
                            <li>Löschen Sie diesen Benutzer manuell</li>
                            <li>Kehren Sie hierher zurück und klicken Sie erneut auf "Admin-Benutzer einrichten"</li>
                          </ol>
                        </div>

                        <div className="border p-3 rounded-md bg-blue-50">
                          <p className="font-semibold mb-2">Option 2: E-Mail-Bestätigung deaktivieren</p>
                          <ol className="list-decimal pl-5 space-y-1">
                            <li>Supabase Dashboard öffnen</li>
                            <li>Wählen Sie {"\"Authentication\" > \"Providers\""}</li>
                            <li>Bei Email, setzen Sie "Confirm email" auf "No"</li>
                            <li>Versuchen Sie es mit dem Admin-Login</li>
                          </ol>
                        </div>
                      </div>
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex justify-end">
                    <Button onClick={() => setDialogOpen(false)}>Schließen</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button
            variant="outline"
            onClick={() => navigate('/admin/login')}
            className="mt-2"
          >
            Zum Admin-Login
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
