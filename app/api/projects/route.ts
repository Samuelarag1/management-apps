import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const projects = await prisma.project.findMany();
  return NextResponse.json(projects);
}
export async function POST(req: Request) {
  const body = await req.json();
  const {
    name,
    price,
    description,
    pre_payment,
    finish_date,
    status,
    initial_date,
    hosting,
    domain,
    cloud_storage,
    cloud_storage_date,
    clientsId,
  } = body;

  const newProject = await prisma.project.create({
    data: {
      name,
      price,
      description,
      pre_payment,
      finish_date,
      status,
      initial_date,
      hosting,
      domain,
      cloud_storage,
      cloud_storage_date,
      clientsId,
    },
  });

  return NextResponse.json(newProject, { status: 201 });
}
