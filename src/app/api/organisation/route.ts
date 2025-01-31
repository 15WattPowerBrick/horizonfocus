// /src/app/api/organisation/route.ts

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createOrganisationSchema } from "@/lib/zod";
import { auth } from "@/lib/auth";
import { ExtendedSession } from "../../../lib/types/next-auth";

export async function POST(req: Request) {
  const session = (await auth()) as ExtendedSession;
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const validatedData = createOrganisationSchema.parse(body);

    // Create the organisation
    const organisation = await prisma.organisation.create({
      data: {
        name: validatedData.organisationName,
        parentId: null,
      },
    });

    // Assign the authenticated user as the owner (or admin) of the organisation
    const defaultRole = await prisma.role.create({
      data: {
        name: "Owner",
        organisationId: organisation.id,
      },
    });

    await prisma.membership.create({
      data: {
        userId: session.user.id,
        organisationId: organisation.id,
        roleId: defaultRole.id,
      },
    });

    return NextResponse.json(
      { id: organisation.id, name: organisation.name },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating organisation:", error);
    return NextResponse.json(
      { error: "Failed to create organisation." },
      { status: 400 }
    );
  }
}
