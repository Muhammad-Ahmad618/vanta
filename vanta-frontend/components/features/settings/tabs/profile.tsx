"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AppTextareaField } from "@/components/custom/appTextareaField";
import { AppImageupload } from "@/components/custom/app-imageupload";

export function Profile() {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      {/* Header */}
      <div className="border-b border-border px-6 py-5">
        <h3 className="font-semibold text-lg text-foreground">
          Profile Information
        </h3>
        <p className="text-sm text-muted-foreground/70">
          Manage your profile information here
        </p>
      </div>

      <form action="" className="px-6 py-6">
        {/* Identity row: avatar top-left + name/email context */}

        <AppImageupload />

        <div className="h-px w-full bg-border" />

        {/* Fields */}
        <div className="grid gap-x-6 gap-y-5 pt-6 sm:grid-cols-2">
          <div className="flex flex-col gap-y-2">
            <Label htmlFor="username" className="text-sm">
              Username
            </Label>
            <Input
              type="text"
              id="username"
              placeholder="Enter your name"
              className="h-10 rounded-md"
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <Label htmlFor="email" className="text-sm">
              Email Address
            </Label>
            <Input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="h-10 rounded-md"
            />
          </div>
          <div className="flex flex-col gap-y-2 sm:col-span-2">
            <Label htmlFor="bio" className="text-sm">
              Bio
            </Label>
            <AppTextareaField
              id="bio"
              placeholder="Tell us about yourself"
              className="min-h-28 resize-none"
            />
            <span className="text-xs text-muted-foreground/70">
              Brief description for your profile. URLs are hyperlinked.
            </span>
          </div>
        </div>
      </form>

      {/* Footer */}
      <div className="flex justify-end gap-x-3 border-t border-border bg-muted/30 px-6 py-4">
        <Button variant="outline" className="rounded-md cursor-pointer">
          Cancel
        </Button>
        <Button className="rounded-md cursor-pointer">Save Changes</Button>
      </div>
    </div>
  );
}
