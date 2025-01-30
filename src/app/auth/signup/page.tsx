import { SignUpForm } from "@/components/auth/signup-form";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export default async function SignUpPage() {
  const session = await auth();
  if (session) {
    redirect("/crm");
  }
  return <SignUpForm />;
}
