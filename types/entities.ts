import type { Role, Status } from "@prisma/client";

export interface ProjectClientSummary {
  id: number;
  name: string;
  alias: string;
}

export interface ClientProjectSummary {
  id: string;
  name: string;
  status: Status | null;
  finish_date: string | null;
}

export interface ProjectRecord {
  id: string;
  name: string;
  price: number;
  description: string | null;
  pre_payment: number | null;
  finish_date: string | null;
  status: Status | null;
  initial_date: string | null;
  hosting: string | null;
  domain: string | null;
  cloud_storage: boolean;
  cloud_storage_date: string | null;
  clientsId: number | null;
  client: ProjectClientSummary | null;
}

export interface ClientRecord {
  id: number;
  name: string;
  alias: string;
  email: string;
  status: string;
  phone_number: string | null;
  location: string | null;
  projects: ClientProjectSummary[];
}

export interface UserRecord {
  id: number;
  name: string | null;
  email: string;
  role: Role;
}

export interface DashboardSummary {
  projectCount: number;
  activeProjectCount: number;
  completedProjectCount: number;
  clientCount: number;
  totalRevenue: number;
}

export interface ApiErrorPayload {
  message: string;
  issues?: unknown;
}
