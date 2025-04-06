import { LoginForm } from "@/src/components/ui/forms/login-form";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <div className="flex w-full flex-col items-center justify-center text-center">
      <LoginForm />
    </div>
  );
}
