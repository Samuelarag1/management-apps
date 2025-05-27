import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
const prisma = new PrismaClient();

const projectSchema = z.object({
  name: z.string(),
  price: z.number(),
  description: z.string().optional(),
  pre_payment: z.number().optional(),
  finish_date: z.date().optional(),
  status: z.string(),
  initial_date: z.date().optional(),
  hosting: z.date().optional(),
  domain: z.date().optional(),
  cloud_storage: z.boolean().optional(),
  cloud_storage_date: z.date().optional(),
  clientsId: z.number().optional(),
});

export async function GET() {
  const projects = await prisma.project.findMany({
    include: {
      Clients: true,
    },
  });
  return NextResponse.json(projects);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const projectParsed = projectSchema.parse(body);
    const newProject = await prisma.project.create({
      data: projectParsed,
    });

    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error al crear proyecto" },
      { status: 400 }
    );
  }
}
