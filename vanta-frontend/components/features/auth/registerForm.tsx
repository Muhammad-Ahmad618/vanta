"use client";

import { AppInputField } from "@/components/custom/appInputField";
import { Button } from "@/components/ui/button";
import { Mail, User, Lock } from "lucide-react";
import Link from "next/link";
import FormHeader from "@/components/shared/formHeader";

export function RegisterForm() {
  return (
    <div className="w-full">
      {/* Brand Header */}
      <FormHeader
        title="Get Started"
        description="Create your account to access your workspace"
      />

      {/* Main Form */}
      <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
        <AppInputField
          label="Full Name"
          type="text"
          id="name"
          placeholder="John Doe"
          leftIcon={
            <User className="text-zinc-400 dark:text-zinc-500 w-4 h-4" />
          }
          required
        />

        <AppInputField
          label="Email"
          type="email"
          id="email"
          placeholder="name@example.com"
          leftIcon={
            <Mail className="text-zinc-400 dark:text-zinc-500 w-4 h-4" />
          }
          required
        />

        <div>
          <AppInputField
            label="Password"
            type="password"
            id="password"
            placeholder="••••••••"
            leftIcon={
              <Lock className="text-zinc-400 dark:text-zinc-500 w-4 h-4" />
            }
            required
          />
        </div>

        <div>
          <AppInputField
            label="Confirm Password"
            type="password"
            id="confirm-password"
            placeholder="••••••••"
            leftIcon={
              <Lock className="text-zinc-400 dark:text-zinc-500 w-4 h-4" />
            }
            required
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full h-10 rounded-md font-semibold text-sm transition-all duration-200 bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-50 dark:hover:bg-zinc-200 dark:text-zinc-900 mt-2 shadow-sm cursor-pointer"
        >
          Create Account
        </Button>
      </form>

      {/* Bottom links */}
      <p className="text-center text-xs text-zinc-500 dark:text-zinc-400 mt-8">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-zinc-950 font-semibold hover:underline dark:text-zinc-50"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
