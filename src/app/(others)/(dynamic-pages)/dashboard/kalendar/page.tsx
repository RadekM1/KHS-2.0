import { getServerSession } from "next-auth";
import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { AdminCalendar } from "@/src/components/dashboad/calendar/admin-calendar";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (
    !session?.user?.clearance ||
    session.user.clearance === "member" ||
    session.user.clearance === "visitor"
  ) {
    redirect("/rejected");
  }

  return (
    <div className="flex w-full flex-col">
      <span className="text-2xl">Kalendář akcí</span>
      <div className="mx-2 flex justify-center">
        <AdminCalendar />
      </div>
    </div>
  );
}
