export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      clients: {
        Row: {
          id: string;
          created_at: string;
          user_id: string;
          name: string;
          alias: string;
          email: string | null;
          phone_number: string | null;
          location: string | null;
          status: string;
        };
        Insert: {
          id?: string;
          created_at?: string;
          user_id: string;
          name: string;
          alias: string;
          email?: string | null;
          phone_number?: string | null;
          location?: string | null;
          status?: string;
        };
        Update: {
          id?: string;
          created_at?: string;
          user_id?: string;
          name?: string;
          alias?: string;
          email?: string | null;
          phone_number?: string | null;
          location?: string | null;
          status?: string;
        };
        Relationships: [];
      };
      projects: {
        Row: {
          id: string;
          created_at: string;
          user_id: string;
          client_id: string | null;
          name: string;
          description: string | null;
          price: number | null;
          status: string;
          initial_date: string | null;
          finish_date: string | null;
          pre_payment: number | null;
          hosting: string | null;
          domain: string | null;
          cloud_storage: boolean;
          cloud_storage_date: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          user_id: string;
          client_id?: string | null;
          name: string;
          description?: string | null;
          price?: number | null;
          status?: string;
          initial_date?: string | null;
          finish_date?: string | null;
          pre_payment?: number | null;
          hosting?: string | null;
          domain?: string | null;
          cloud_storage?: boolean;
          cloud_storage_date?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          user_id?: string;
          client_id?: string | null;
          name?: string;
          description?: string | null;
          price?: number | null;
          status?: string;
          initial_date?: string | null;
          finish_date?: string | null;
          pre_payment?: number | null;
          hosting?: string | null;
          domain?: string | null;
          cloud_storage?: boolean;
          cloud_storage_date?: string | null;
        };
        Relationships: [];
      };
      tasks: {
        Row: {
          id: string;
          created_at: string;
          user_id: string;
          project_id: string | null;
          client_id: string | null;
          title: string;
          description: string | null;
          status: string;
          priority: string;
          due_date: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          user_id: string;
          project_id?: string | null;
          client_id?: string | null;
          title: string;
          description?: string | null;
          status?: string;
          priority?: string;
          due_date?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          user_id?: string;
          project_id?: string | null;
          client_id?: string | null;
          title?: string;
          description?: string | null;
          status?: string;
          priority?: string;
          due_date?: string | null;
        };
        Relationships: [];
      };
      invoices: {
        Row: {
          id: string;
          created_at: string;
          user_id: string;
          client_id: string | null;
          project_id: string | null;
          invoice_number: string | null;
          status: string;
          issue_date: string;
          due_date: string | null;
          subtotal: number;
          tax_rate: number;
          total: number;
          notes: string | null;
          items: Json;
        };
        Insert: {
          id?: string;
          created_at?: string;
          user_id: string;
          client_id?: string | null;
          project_id?: string | null;
          invoice_number?: string | null;
          status?: string;
          issue_date?: string;
          due_date?: string | null;
          subtotal?: number;
          tax_rate?: number;
          total?: number;
          notes?: string | null;
          items?: Json;
        };
        Update: {
          id?: string;
          created_at?: string;
          user_id?: string;
          client_id?: string | null;
          project_id?: string | null;
          invoice_number?: string | null;
          status?: string;
          issue_date?: string;
          due_date?: string | null;
          subtotal?: number;
          tax_rate?: number;
          total?: number;
          notes?: string | null;
          items?: Json;
        };
        Relationships: [];
      };
      maintenances: {
        Row: {
          id: string;
          created_at: string;
          user_id: string;
          client_id: string | null;
          project_id: string | null;
          name: string;
          amount: number;
          billing_day: number;
          status: string;
          start_date: string;
          notes: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          user_id: string;
          client_id?: string | null;
          project_id?: string | null;
          name: string;
          amount: number;
          billing_day?: number;
          status?: string;
          start_date?: string;
          notes?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          user_id?: string;
          client_id?: string | null;
          project_id?: string | null;
          name?: string;
          amount?: number;
          billing_day?: number;
          status?: string;
          start_date?: string;
          notes?: string | null;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
