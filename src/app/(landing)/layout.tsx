import { ReactNode } from "react";

export default function LandingLayout({ children }: { children: ReactNode }) {
  return <div className="selection:bg-[hsl(320,65%,52%,,20%)]">{children}</div>;
}
