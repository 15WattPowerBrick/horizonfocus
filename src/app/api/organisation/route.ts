import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createOrganisationSchema } from "@/lib/zod";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Incoming body:", body);
    const validatedData = createOrganisationSchema.parse(body);

    const organisation = await prisma.organisation.create({
      data: {
        name: validatedData.organisationName,
      },
    });

    return NextResponse.json(organisation, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create organisation." },
      { status: 400 }
    );
  }
}
