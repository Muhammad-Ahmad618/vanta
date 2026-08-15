"use client";

import { Button } from "@/components/ui/button";

export function DangerZone() {
  const handleDelete = () => {
    // open confirmation dialog before calling DELETE /api/users/me
  };

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="px-6 py-5 border-b border-destructive/20">
        <h3 className="text-base font-semibold text-destructive">
          Danger zone
        </h3>
        <p className="text-sm text-muted-foreground mt-0.5">
          These actions are permanent and cannot be undone.
        </p>
      </div>

      <div className="flex items-center justify-between gap-6 px-6 py-5">
        <div>
          <p className="text-sm font-medium text-foreground">Delete account</p>
          <p className="text-sm text-muted-foreground mt-0.5">
            Permanently delete your account and all associated data including
            tasks, workspaces, and settings.
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          className="rounded-md cursor-pointer shrink-0 text-destructive border-destructive/40 hover:bg-destructive hover:text-white"
          onClick={handleDelete}
        >
          Delete account
        </Button>
      </div>
    </div>
  );
}
