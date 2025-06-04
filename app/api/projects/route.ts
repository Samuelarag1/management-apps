import { NextResponse } from "next/server";
import { PrismaClient, Status } from "@prisma/client";
import { z } from "zod";
const prisma = new PrismaClient();

const projectSchema = z.object({
  name: z.string(),
  price: z.number(),
  description: z.string().optional(),
  pre_payment: z.number().optional(),
  finish_date: z.date().optional(),
  status: z.nativeEnum(Status).optional(),
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
      client: true,
    },
  });
  return NextResponse.json(projects);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const parsedBody = {
      ...body,
      name: body.name,
      price: Number(body.price),
      description: body.description ? body.description : null,
      pre_payment: body.pre_payment ? Number(body.pre_payment) : null,
      finish_date: body.finish_date ? new Date(body.finish_date) : null,
      initial_date: body.initial_date ? new Date(body.initial_date) : null,
      status: body.status ?? Status.activo,
      hosting: body.hosting ? new Date(body.hosting) : null,
      domain: body.domain ? new Date(body.domain) : null,
      cloud_storage: Boolean(body.cloud_storage),
      cloud_storage_date: body.cloud_storage_date
        ? new Date(body.cloud_storage_date)
        : undefined,
      clientsId: body.clientsId ? Number(body.clientsId) : null,
    };

    const projectData = projectSchema.parse(parsedBody);

    const newProject = await prisma.project.create({
      data: {
        name: projectData.name,
        price: Number(projectData.price),
        pre_payment: Number(projectData.pre_payment),
        description: projectData.description ? projectData.description : null,
        finish_date: projectData.finish_date
          ? new Date(projectData.finish_date)
          : null,
        initial_date: projectData.initial_date
          ? new Date(projectData.initial_date)
          : null,
        status: projectData.status ?? Status.activo,
        hosting: projectData.hosting ? new Date(projectData.hosting) : null,
        domain: projectData.domain ? new Date(projectData.domain) : null,
        cloud_storage: Boolean(projectData.cloud_storage),
        cloud_storage_date: projectData.cloud_storage_date
          ? new Date(projectData.cloud_storage_date)
          : undefined,
        clientsId: projectData.clientsId ? Number(projectData.clientsId) : null,
      },
      include: {
        client: true,
      },
    });

    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error al crear proyecto" },
      { status: 400 }
    );
  }
}
