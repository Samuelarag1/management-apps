import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  const prisma = new PrismaClient();

  const dashboardSummary = {
    projects: await prisma.project.count(),
  };

  console.log(dashboardSummary);

  return NextResponse.json(dashboardSummary);
}
