import { getServerSession } from "next-auth";
import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import ArticlesMainComponent from "@/src/components/blog/articlesMainComponent";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.clearance || session.user.clearance === "visitor") {
    redirect("/rejected");
  }

  return (
    <div className="flex w-full flex-col">
      <span className="text-2xl">Články</span>
      <div className="mx-4 mt-10 flex justify-center">
        <ArticlesMainComponent />
      </div>
    </div>
  );
}
