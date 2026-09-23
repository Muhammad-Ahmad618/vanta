import ResetPasswordFrom from "@/components/features/auth/resetPasswordForm";
import { Suspense } from "react";

function ResetPasswordpage() {
  return (
    <div className="flex h-screen justify-center items-center p-4">
      <div className="max-w-[500px] w-full">
        <Suspense fallback={<div>Loading...</div>}>
          <ResetPasswordFrom />
        </Suspense>
      </div>
    </div>
  );
}

export default ResetPasswordpage;
