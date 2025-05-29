import { ForgottenPassForm } from "@/src/components/ui/forms/forgotten-password-form";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <div className="flex w-full flex-col items-center justify-center text-center">
      <ForgottenPassForm />
    </div>
  );
}
