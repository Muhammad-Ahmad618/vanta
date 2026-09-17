import ResetPasswordFrom from "@/components/features/auth/resetPasswordForm";

function ResetPasswordpage() {
  return (
    <div className="flex h-screen justify-center items-center p-4">
      <div className="max-w-[500px] w-full">
        <ResetPasswordFrom />
      </div>
    </div>
  );
}

export default ResetPasswordpage;
