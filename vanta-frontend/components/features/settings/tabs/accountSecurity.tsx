"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AppInputField } from "@/components/custom/appInputField";
import { useFormik } from "formik";
import { resetPasswordSchema } from "@/schemas/resetPasswordSchema";
import { toast } from "sonner";

function PasswordStrength({ password }: { password: string }) {
  const getScore = () => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  };

  const score = getScore();
  const labels = ["", "Weak", "Fair", "Good", "Strong"];
  const colors = [
    "",
    "text-destructive",
    "text-amber-500",
    "text-green-500",
    "text-green-500",
  ];
  const segColors = [
    "",
    "bg-destructive",
    "bg-amber-500",
    "bg-green-500",
    "bg-green-500",
  ];

  if (!password) return null;

  return (
    <div className="space-y-1.5 mt-1">
      <div className="flex gap-1">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`h-0.5 flex-1 rounded-full transition-colors ${
              i <= score ? segColors[score] : "bg-border"
            }`}
          />
        ))}
      </div>
      <span className={`text-xs ${colors[score]}`}>{labels[score]}</span>
    </div>
  );
}

export function AccountSecurity() {
  const formik = useFormik({
    initialValues: {
      current: "",
      newPwd: "",
      confirm: "",
    },
    validationSchema: resetPasswordSchema,
    onSubmit: (values) => {
      console.log(values);
      toast.success("Password reset successfully");
    },
  });

  return (
    <div className="space-y-4">
      {/* Change Password */}
      <div className="overflow-hidden rounded-xl border border-border bg-card">
        <div className="px-6 py-5 border-b border-border">
          <h3 className="text-base font-semibold text-foreground">
            Change password
          </h3>
          <p className="text-sm text-muted-foreground mt-0.5">
            Make sure your new password is at least 8 characters long.
          </p>
        </div>

        <form onSubmit={formik.handleSubmit}>
          <div className="px-6 py-6 space-y-5">
            <div className="space-y-2">
              <AppInputField
                label="Current Password"
                type="password"
                id="current"
                placeholder="••••••••"
                value={formik.values.current}
                labelClassName="text-sm"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.current ? formik.errors.current : undefined
                }
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-4">
                <AppInputField
                  label="New Password"
                  type="password"
                  id="newPwd"
                  placeholder="••••••••"
                  value={formik.values.newPwd}
                  labelClassName="text-sm"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.newPwd ? formik.errors.newPwd : undefined
                  }
                  required
                />
                <PasswordStrength password={formik.values.newPwd} />
              </div>

              <div className="space-y-2">
                <AppInputField
                  label="Confirm New Password"
                  type="password"
                  id="confirm"
                  placeholder="••••••••"
                  value={formik.values.confirm}
                  labelClassName="text-sm"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.confirm ? formik.errors.confirm : undefined
                  }
                  required
                />
                {formik.values.confirm &&
                  formik.values.newPwd !== formik.values.confirm && (
                    <p className="text-xs text-destructive">
                      Passwords do not match
                    </p>
                  )}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2.5 px-6 py-4 border-t border-border bg-muted/30">
            <Button
              type="button"
              variant="outline"
              className="rounded-md cursor-pointer"
              onClick={() => formik.resetForm()}
            >
              Cancel
            </Button>
            <Button type="submit" className="rounded-md cursor-pointer">
              Update password
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
