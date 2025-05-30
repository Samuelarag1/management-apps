import IMClients from "./Clients";

export default interface IMProjects {
  id: string;
  name: string;
  price: number;
  description: string;
  pre_payment?: string;
  finish_date: string;
  status: string;
  initial_date: string;
  hosting: string;
  domain: string;
  cloud_storage?: boolean;
  cloud_storage_date?: string;
  userId: number;
  client?: IMClients;
}
