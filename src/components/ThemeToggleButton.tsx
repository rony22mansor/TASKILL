import * as React from "react";
import { Moon, Sun, Laptop } from "lucide-react"; // Assuming you use lucide-react for icons
import { useTheme } from "next-themes";

import { Label } from "@/components/ui/label"; // Adjust imports for your project structure
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export function ThemeToggleButton() {
  // It's good practice to make this a reusable component
  const { theme, setTheme } = useTheme();

  // This prevents hydration mismatch errors by ensuring the component only renders on the client
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex items-center justify-between">
      <Label>Theme</Label>
      <ToggleGroup
        type="single"
        value={theme} // Bind the current theme to the value
        onValueChange={(value) => {
          if (value) setTheme(value); // Call setTheme when a new value is selected
        }}
      >
        <ToggleGroupItem value="dark" aria-label="Toggle dark">
          <Moon className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="light" aria-label="Toggle light">
          <Sun className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="system" aria-label="Toggle system">
          <Laptop className="h-4 w-4" />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}
