import { getServerSession } from "next-auth";
import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";
import { BooksTable } from "@/src/components/tables/booksTable";
import { redirect } from "next/navigation";

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
      <span className="text-2xl pb-6">Půjčovna</span>
      <div className="flex justify-center">
        <BooksTable />
      </div>
    </div>
  );
}
