"use client";

import { AppInputField } from "@/components/custom/appInputField";
import { Button } from "@/components/ui/button";
import { Mail, Lock } from "lucide-react";
import Link from "next/link";
import FormHeader from "@/components/shared/formHeader";
import { loginSchema } from "@/schemas/authSchema";
import { useFormik } from "formik";
import { toast } from "sonner";

export function LoginForm() {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      console.log(values);
      toast.success("Logged in Successfully");
    },
  });

  return (
    <div className="w-full p-10 border rounded-2xl">
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
          <label className="flex items-center gap-2 text-muted-foreground cursor-pointer select-none">
            <input
              type="checkbox"
              className="rounded border-border text-primary focus:ring-primary w-3.5 h-3.5"
            />
            <span>Remember me</span>
          </label>
          <Link
            href="/forgotPassword"
            className="text-secondary hover:underline font-medium"
          >
            Forgot password?
          </Link>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="default"
          className="w-full h-10 rounded-md font-semibold text-sm mt-2 shadow-sm cursor-pointer"
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? "Signing In..." : "Sign In"}
        </Button>
      </form>

      {/* Bottom links */}
      <p className="text-center text-xs text-muted-foreground mt-8">
        Don&apos;t have an account?{" "}
        <Link
          href="/register"
          className="text-primary font-semibold hover:underline"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}
