import { createContext, useContext, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";

type Preferences = { language: string; dark: boolean; large: boolean; reduced: boolean; notifications: boolean; privateProfile: boolean };
export const initialPreferences: Preferences = { language: "English", dark: false, large: false, reduced: true, notifications: true, privateProfile: true };
const PrototypeContext = createContext({
  feedback: (_title: string) => {},
  preferences: initialPreferences,
  update: (_patch: Partial<Preferences>) => {},
});
export const usePrototype = () => useContext(PrototypeContext);

export function PrototypeProvider({ children }: { children: ReactNode }) {
  const [title, setTitle] = useState("");
  const [preferences, setPreferences] = useState(initialPreferences);
  return <PrototypeContext.Provider value={{ feedback: setTitle, preferences, update: patch => setPreferences(old => ({ ...old, ...patch })) }}>
    {children}
    <Dialog open={Boolean(title)} onOpenChange={open => { if (!open) setTitle(""); }}>
      <DialogContent className="max-h-[85dvh] w-[calc(100%-2rem)] overflow-auto">
        <DialogTitle>{title} · prototype</DialogTitle>
        <DialogDescription>This action is a design simulation. No account, payment, invitation, permission, database or production system was changed.</DialogDescription>
        <Button onClick={() => setTitle("")}>Return to preview</Button>
      </DialogContent>
    </Dialog>
  </PrototypeContext.Provider>;
}