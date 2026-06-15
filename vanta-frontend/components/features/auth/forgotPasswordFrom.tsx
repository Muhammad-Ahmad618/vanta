"use client";

import { useState } from "react";
import { AppInputField } from "@/components/custom/appInputField";
import { Button } from "@/components/ui/button";
import { Mail, ArrowLeft } from "lucide-react";
import Link from "next/link";
import FormHeader from "@/components/shared/formHeader";
import { useFormik } from "formik";
import { forgotPassword } from "@/schemas/authSchema";
import { toast } from "sonner";

function ForgotPasswordFrom() {
  const [resetlink, setResetLink] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: forgotPassword,
    onSubmit: (values) => {
      console.log(values);
      toast.success("Reset Link sent Successfully !");
      setResetLink(true);
    },
  });

  return (
    <div className="w-full p-10 border rounded-2xl ">
      {/* Brand Header */}
      <FormHeader
        title="Forgot Password"
        description={
          !resetlink
            ? "Enter your Email to Receive Reset Link"
            : " A Reset link has been sent to your email address"
        }
      />

      {/* Forgot Password Form */}

      {!resetlink ? (
        <form onSubmit={formik.handleSubmit} className="space-y-5">
          <AppInputField
            type="email"
            id="email"
            placeholder="name@example.com"
            leftIcon={
              <Mail className="text-zinc-400 dark:text-zinc-500 w-4 h-4" />
            }
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email ? formik.errors.email : undefined}
            required
          />

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full h-10 rounded-md font-semibold text-sm transition-all duration-200 bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-50 dark:hover:bg-zinc-200 dark:text-zinc-900 mt-2 shadow-sm cursor-pointer"
          >
            Send Reset Link
          </Button>
        </form>
      ) : (
        <>
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            Please check your inbox and follow the instructions to reset your
            password
          </p>
        </>
      )}

      <div className="border-t border-gray-200 my-5"></div>

      {/* Bottom links */}
      <p className="text-center text-xs text-zinc-500 dark:text-zinc-400 mt-4">
        <Link
          href="/login"
          className="group flex items-center justify-center gap-1 font-medium dark:text-zinc-50 hover:text-zinc-900"
        >
          <ArrowLeft className="text-zinc-400 transition-all duration-200 group-hover:translate-x-[-4px] dark:text-zinc-500 w-4 h-4 group-hover:text-zinc-900 dark:group-hover:text-zinc-50" />
          Return to Sign In
        </Link>
      </p>
    </div>
  );
}

export default ForgotPasswordFrom;
