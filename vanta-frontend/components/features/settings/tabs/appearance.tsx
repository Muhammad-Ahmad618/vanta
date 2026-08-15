"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Theme = "light" | "dark" | "system";
type SidebarPosition = "left" | "right";

const themes: { value: Theme; label: string }[] = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "system", label: "System" },
];

function ThemePreview({ theme }: { theme: Theme }) {
  const configs = {
    light: {
      bg: "#f4f4f5",
      sidebar: "#e4e4e7",
      bar: "#d4d4d8",
    },
    dark: {
      bg: "#18181b",
      sidebar: "#27272a",
      bar: "#3f3f46",
    },
    system: {
      bg: "linear-gradient(135deg, #f4f4f5 50%, #18181b 50%)",
      sidebar: "linear-gradient(135deg, #e4e4e7 50%, #27272a 50%)",
      bar: "linear-gradient(135deg, #d4d4d8 50%, #3f3f46 50%)",
    },
  };

  const c = configs[theme];

  return (
    <div
      className="h-20 flex gap-1.5 p-2 rounded-[6px]"
      style={{ background: c.bg }}
    >
      <div className="w-7 rounded" style={{ background: c.sidebar }} />
      <div className="flex-1 flex flex-col gap-1.5 justify-center">
        {[100, 60, 40].map((w, i) => (
          <div
            key={i}
            className="h-2 rounded"
            style={{ background: c.bar, width: `${w}%` }}
          />
        ))}
      </div>
    </div>
  );
}

export function Appearance() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [sidebar, setSidebar] = useState<SidebarPosition>("left");

  const handleSave = () => {
    localStorage.setItem("vanta-theme", theme);
    localStorage.setItem("vanta-sidebar", sidebar);
    // apply theme to document here if using next-themes:
    // setTheme(theme)
  };

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="px-6 py-5 border-b border-border">
        <h3 className="text-base font-semibold text-foreground">Appearance</h3>
        <p className="text-sm text-muted-foreground mt-0.5">
          Customize how Vanta looks for you.
        </p>
      </div>

      <div className="px-6 py-6 space-y-6">
        {/* Theme */}
        <div className="space-y-3">
          <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground/60">
            Theme
          </p>
          <div className="grid grid-cols-3 gap-3">
            {themes.map(({ value, label }) => (
              <button
                key={value}
                type="button"
                onClick={() => setTheme(value)}
                className={cn(
                  "text-left rounded-lg border-[1.5px] overflow-hidden transition-colors",
                  theme === value
                    ? "border-primary"
                    : "border-border hover:border-border/80",
                )}
              >
                <ThemePreview theme={value} />
                <div className="flex items-center gap-2 px-2 py-2">
                  <div
                    className={cn(
                      "w-2 h-2 rounded-full border-[1.5px] transition-colors flex-shrink-0",
                      theme === value
                        ? "bg-primary border-primary"
                        : "border-muted-foreground/40",
                    )}
                  />
                  <span className="text-[13px] font-medium text-foreground">
                    {label}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2.5 px-6 py-4 border-t border-border bg-muted/30">
        <Button
          type="button"
          variant="outline"
          className="rounded-md cursor-pointer"
          onClick={() => {
            setTheme("dark");
            setSidebar("left");
          }}
        >
          Cancel
        </Button>
        <Button
          type="button"
          className="rounded-md cursor-pointer"
          onClick={handleSave}
        >
          Save changes
        </Button>
      </div>
    </div>
  );
}
