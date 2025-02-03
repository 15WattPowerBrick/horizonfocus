import { ModeToggle } from "@/components/ui/mode-toggle";
import { Footer, FooterBottom } from "@/components/ui/footer";
import Link from "next/link";

export default function FooterSection() {
  return (
    <footer className="w-full bg-background px-4">
      <div className="mx-auto max-w-container">
        <Footer className="pt-0">
          <FooterBottom className="mt-0 flex flex-col items-center gap-4 sm:flex-col md:flex-row">
            <div>© 2025 Horizonfocus.cloud All rights reserved</div>
            <div className="flex items-center gap-4">
              <Link href="#">Privacy Policy</Link>
              <Link href="#">Terms of Service</Link>
              <ModeToggle />
            </div>
          </FooterBottom>
        </Footer>
      </div>
    </footer>
  );
}
