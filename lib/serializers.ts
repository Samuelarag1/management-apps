import { Prisma, type User } from "@prisma/client";
import type {
  ClientProjectSummary,
  ClientRecord,
  ProjectClientSummary,
  ProjectRecord,
  UserRecord,
} from "@/types/entities";

type ProjectWithClient = Prisma.ProjectGetPayload<{
  include: {
    client: {
      select: {
        id: true;
        name: true;
        alias: true;
      };
    };
  };
}>;

type ClientWithProjects = Prisma.ClientsGetPayload<{
  include: {
    projects: {
      select: {
        id: true;
        name: true;
        status: true;
        finish_date: true;
      };
    };
  };
}>;

function decimalToNumber(value: Prisma.Decimal | number | null | undefined) {
  if (value == null) {
    return null;
  }

  return Number(value);
}

function dateToIsoString(value: Date | string | null | undefined) {
  if (!value) {
    return null;
  }

  const date = value instanceof Date ? value : new Date(value);

  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

function serializeProjectClient(
  client: ProjectWithClient["client"]
): ProjectClientSummary | null {
  if (!client) {
    return null;
  }

  return {
    id: client.id,
    name: client.name,
    alias: client.alias,
  };
}

function serializeClientProject(
  project: ClientWithProjects["projects"][number]
): ClientProjectSummary {
  return {
    id: project.id,
    name: project.name,
    status: project.status ?? null,
    finish_date: dateToIsoString(project.finish_date),
  };
}

export function serializeProject(project: ProjectWithClient): ProjectRecord {
  return {
    id: project.id,
    name: project.name,
    price: decimalToNumber(project.price) ?? 0,
    description: project.description ?? null,
    pre_payment: decimalToNumber(project.pre_payment),
    finish_date: dateToIsoString(project.finish_date),
    status: project.status ?? null,
    initial_date: dateToIsoString(project.initial_date),
    hosting: dateToIsoString(project.hosting),
    domain: dateToIsoString(project.domain),
    cloud_storage: Boolean(project.cloud_storage),
    cloud_storage_date: dateToIsoString(project.cloud_storage_date),
    clientsId: project.clientsId ?? null,
    client: serializeProjectClient(project.client),
  };
}

export function serializeClient(client: ClientWithProjects): ClientRecord {
  return {
    id: client.id,
    name: client.name,
    alias: client.alias,
    email: client.email,
    status: client.status,
    phone_number: client.phone_number ?? null,
    location: client.location ?? null,
    projects: client.projects.map(serializeClientProject),
  };
}

export function serializeUser(user: User): UserRecord {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
}
