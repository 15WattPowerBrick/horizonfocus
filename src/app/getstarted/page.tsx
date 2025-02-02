"use client";

import CreateOrganisation from "./_components/CreateOrganisation";
import { JoinOrganisation } from "./_components/JoinOrganisation";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { GalleryVerticalEnd } from "lucide-react";

const Page = () => {
  return (
    <>
      <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
        <div className="w-full max-w-sm md:max-w-3xl">
          <div className="flex flex-col gap-6">
            <Link
              href="/"
              className="flex items-center gap-2 self-center font-medium"
            >
              <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <GalleryVerticalEnd className="size-4" />
              </div>
              Horizonfocus CRM
            </Link>
            <Card className="overflow-hidden">
              <CardContent className="grid p-0 md:grid-cols-2">
                <div className="p-6 md:p-8">
                  <div className="flex flex-col gap-6">
                    <JoinOrganisation />
                  </div>
                </div>
                <div className="p-6 md:p-8 bg-stone-100 ">
                  <div className="flex flex-col gap-6">
                    <CreateOrganisation />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
