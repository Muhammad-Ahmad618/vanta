import { LoginForm } from "@/components/features/auth/loginForm";

function LoginPage() {
  return (
    <div className="flex h-screen justify-center items-center p-4">
      <div className="max-w-[500px] w-full">
        <LoginForm />
      </div>
    </div>
  );
}

export default LoginPage;
