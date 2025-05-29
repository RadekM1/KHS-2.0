import { RestorePassForm } from "@/src/components/ui/forms/restore-password-form";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <div className="flex w-full flex-col items-center justify-center text-center">
      <RestorePassForm />
    </div>
  );
}
