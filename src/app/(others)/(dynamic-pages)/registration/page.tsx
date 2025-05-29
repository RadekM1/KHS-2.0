import { SensitiveInfoProtect } from "@/src/components/sensitiveInfoProtect";
import { RegisterForm } from "@/src/components/ui/forms/register-form";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <div className="flex w-full flex-col items-center justify-center text-center">
      <RegisterForm />
      <div className="min-h-[300px] flex flex-col w-full">
        <SensitiveInfoProtect />
      </div>
    </div>
  );
}
