import { getServerSession } from "next-auth";
import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";
import UserTable from "@/src/components/tables/userTable";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.clearance || session.user.clearance !== "admin") {
    redirect("/rejected");
  }

  return (
    <div className="flex w-full flex-col">
      <h1 className="text-2xl pb-6">Uživatelské účty</h1>
      <div className="flex justify-center">
        <UserTable />
      </div>
    </div>
  );
}
