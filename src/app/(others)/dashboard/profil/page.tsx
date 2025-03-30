import { getServerSession } from "next-auth";
import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { Profile } from "@/src/components/dashboad/profile";

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/rejected");
  }

  return (
    <div className="flex w-full flex-col">
      <div className="flex justify-center md:mx-5">
        <Profile />
      </div>
    </div>
  );
}
