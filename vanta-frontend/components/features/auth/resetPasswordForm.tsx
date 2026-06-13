"use client";

import { Button } from "@/components/ui/button";
import FormHeader from "@/components/shared/formHeader";
import { AppInputField } from "@/components/custom/appInputField";

function ResetPasswordForm() {
  return (
    <div className="w-full">
      {/* Brand Header */}
      <FormHeader
        title="Reset Password"
        description="Enter a new password to reset your old one"
      />

      {/* Reset Password Form */}
      <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
        <AppInputField
          type="password"
          id="password"
          placeholder="Password"
          required
        />
        <AppInputField
          type="password"
          id="confirmPassword"
          placeholder="Confirm Password"
          required
        />

        <Button
          type="submit"
          className="w-full h-10 rounded-md font-semibold text-sm transition-all duration-200 bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-50 dark:hover:bg-zinc-200 dark:text-zinc-900 mt-2 shadow-sm cursor-pointer"
        >
          Reset Password
        </Button>
      </form>
    </div>
  );
}

export default ResetPasswordForm;
