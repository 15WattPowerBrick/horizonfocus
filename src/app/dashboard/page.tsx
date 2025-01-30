import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await auth();
  if (!session) {
    redirect("/auth/signin");
  }
  return <div></div>;
};

export default Page;
