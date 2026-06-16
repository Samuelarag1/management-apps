export type ProjectStatus = "activo" | "completo" | "descontinuado";
export type TaskStatus = "pendiente" | "en_progreso" | "completada";
export type TaskPriority = "baja" | "media" | "alta" | "urgente";
export type InvoiceStatus = "borrador" | "enviada" | "pagada" | "vencida";

export interface ProjectClientSummary {
  id: string;
  name: string;
  alias: string;
}

export interface ClientProjectSummary {
  id: string;
  name: string;
  status: string | null;
  finish_date: string | null;
}

export interface ProjectRecord {
  id: string;
  name: string;
  price: number | null;
  description: string | null;
  pre_payment: number | null;
  finish_date: string | null;
  status: ProjectStatus | null;
  initial_date: string | null;
  hosting: string | null;
  domain: string | null;
  cloud_storage: boolean;
  cloud_storage_date: string | null;
  client_id: string | null;
  client: ProjectClientSummary | null;
}

export interface ClientRecord {
  id: string;
  name: string;
  alias: string;
  email: string | null;
  status: string;
  phone_number: string | null;
  location: string | null;
  projects: ClientProjectSummary[];
}

export interface UserRecord {
  id: string;
  email: string;
  user_metadata?: {
    name?: string;
    company?: string;
    phone?: string;
    city?: string;
    country?: string;
    address?: string;
    bio?: string;
    tax_id?: string;
    legal_name?: string;
    billing_address?: string;
    billing_city?: string;
    billing_zip?: string;
    billing_country?: string;
    currency?: string;
    invoice_prefix?: string;
    invoice_next_number?: string;
    payment_terms?: string;
  };
}

export interface TaskRecord {
  id: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  due_date: string | null;
  project_id: string | null;
  client_id: string | null;
  created_at: string;
  projects: { name: string } | null;
  clients: { name: string; alias: string } | null;
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  unit_price: number;
  total: number;
}

export interface InvoiceRecord {
  id: string;
  invoice_number: string | null;
  status: InvoiceStatus;
  issue_date: string;
  due_date: string | null;
  subtotal: number;
  tax_rate: number;
  total: number;
  notes: string | null;
  items: InvoiceItem[];
  client_id: string | null;
  project_id: string | null;
  created_at: string;
  clients: { name: string; alias: string } | null;
  projects: { name: string } | null;
}

export type MaintenanceStatus = "activo" | "pausado" | "cancelado";

export interface MaintenanceRecord {
  id: string;
  created_at: string;
  user_id: string;
  client_id: string | null;
  project_id: string | null;
  name: string;
  amount: number;
  billing_day: number;
  status: MaintenanceStatus;
  start_date: string;
  notes: string | null;
  clients: { name: string; alias: string } | null;
  projects: { name: string } | null;
}

export type WorkItemStatus = "pendiente" | "en_progreso" | "completado" | "facturado";

export interface WorkItemRecord {
  id: string;
  created_at: string;
  user_id: string;
  project_id: string | null;
  client_id: string | null;
  title: string;
  description: string | null;
  amount: number;
  hours: number | null;
  work_date: string;
  status: WorkItemStatus;
  clients: { name: string; alias: string } | null;
  projects: { name: string } | null;
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
