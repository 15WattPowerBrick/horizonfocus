import { LoginForm } from "@/components/auth/login-form";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export default async function LoginPage() {
  const session = await auth();
  if (session) {
    redirect("/crm");
  }
  return <LoginForm />;
}
