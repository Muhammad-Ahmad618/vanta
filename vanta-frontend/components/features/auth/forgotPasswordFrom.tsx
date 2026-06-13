"use client";

import { AppInputField } from "@/components/custom/appInputField";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import Link from "next/link";
import FormHeader from "@/components/shared/formHeader";

function ForgotPasswordFrom() {
  return (
    <div className="w-full">
      {/* Brand Header */}
      <FormHeader
        title="Forgot Password"
        description="Enter your Email to Receive Reset Link"
      />

      {/* Forgot Password Form */}
      <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
        <AppInputField
          type="email"
          id="email"
          placeholder="name@example.com"
          leftIcon={
            <Mail className="text-zinc-400 dark:text-zinc-500 w-4 h-4" />
          }
          required
        />

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full h-10 rounded-md font-semibold text-sm transition-all duration-200 bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-50 dark:hover:bg-zinc-200 dark:text-zinc-900 mt-2 shadow-sm cursor-pointer"
        >
          Sign In
        </Button>
      </form>

      <div className="border-t border-gray-200 my-5"></div>

      {/* Bottom links */}
      <p className="text-center text-xs text-zinc-500 dark:text-zinc-400 mt-4">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="text-zinc-950 font-semibold hover:underline dark:text-zinc-50"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}

export default ForgotPasswordFrom;
