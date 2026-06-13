"use client";
import { RegisterForm } from "@/components/features/auth/registerForm";

function register() {
  return (
    <div className="flex h-screen justify-center items-center p-4">
      <div className="p-10 border rounded-2xl max-w-[500px] w-full">
        <RegisterForm />
      </div>
    </div>
  );
}

export default register;
