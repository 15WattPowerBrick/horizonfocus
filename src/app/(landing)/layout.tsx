import { ReactNode } from "react";
import Navbar from "./_components/Navbar";
import FooterSection from "./_components/Footer";

export default function LandingLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="selection:bg-[hsl(320,65%,52%,,20%)]">{children}</div>
      <FooterSection />
    </>
  );
}
