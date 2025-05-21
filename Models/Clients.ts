import IMProjects from "./Projects";

export default interface IMClients {
  id: number;
  name: string;
  alias: string;
  email: string;
  status: string;
  phone_number: string;
  location: string;
  projects?: IMProjects[];
}
