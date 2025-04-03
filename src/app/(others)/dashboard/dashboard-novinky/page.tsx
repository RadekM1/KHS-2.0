import { getServerSession } from "next-auth";
import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { NewsMainComponent } from "@/src/components/blog/newsMainComponent";

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
      <span className="text-2xl">Novinky</span>
      <div className="mx-4 mt-10 flex justify-center">
        <NewsMainComponent />
      </div>
    </div>
  );
}
