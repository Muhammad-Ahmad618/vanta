"use client";

import { AppInputField } from "@/components/custom/appInputField";
import { Button } from "@/components/ui/button";
import { Mail, Lock } from "lucide-react";
import Link from "next/link";
import FormHeader from "@/components/shared/formHeader";
import { loginSchema } from "@/schemas/auth/loginSchema";
import { useFormik } from "formik";

export function LoginForm() {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div className="w-full">
      {/* Brand Header */}
      <FormHeader
        title="Welcome to Vanta"
        description="Enter your details to access your workspace"
      />

      {/* Main Login Form */}
      <form onSubmit={formik.handleSubmit} className="space-y-5">
        <AppInputField
          label="Email"
          type="email"
          id="email"
          placeholder="name@example.com"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email ? formik.errors.email : undefined}
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
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password ? formik.errors.password : undefined}
            leftIcon={
              <Lock className="text-zinc-400 dark:text-zinc-500 w-4 h-4" />
            }
            required
          />
        </div>

        {/* Options Row */}
        <div className="flex items-center justify-between text-xs pt-1">
          <label className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 cursor-pointer select-none">
            <input
              type="checkbox"
              className="rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900 dark:border-zinc-800 dark:bg-zinc-950 dark:focus:ring-zinc-50 w-3.5 h-3.5"
            />
            <span>Remember me</span>
          </label>
          <Link
            href="/forgotPassword"
            className="text-zinc-900 hover:underline font-medium dark:text-zinc-300"
          >
            Forgot password?
          </Link>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full h-10 rounded-md font-semibold text-sm transition-all duration-200 bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-50 dark:hover:bg-zinc-200 dark:text-zinc-900 mt-2 shadow-sm cursor-pointer"
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? "Signing In..." : "Sign In"}
        </Button>
      </form>

      {/* Bottom links */}
      <p className="text-center text-xs text-zinc-500 dark:text-zinc-400 mt-8">
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
