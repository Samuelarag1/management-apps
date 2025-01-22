import { Payment, columns } from "./Columns";
import { DataTable } from "./data-table";

async function getData(): Promise<Payment[]> {
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "Diseñando",
      email: "m@example.com",
      project_name: "Project 1",
      description: "Description 1",
      initial_date: "2022-01-01",
      time_limit: "2022-02-01",
      finish_date: "2022-03-01",
      pre_payment: 50,
      hosting: "2022-01-01",
      domain: "2022-01-01",
      cloud_storage: "2022-01-01",
      payment_date: "2022-01-01",
      total: 150,
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "Diseñando",
      email: "m@example.com",
      project_name: "Project 1",
      description: "Description 1",
      initial_date: "2022-01-01",
      time_limit: "2022-02-01",
      finish_date: "2022-03-01",
      pre_payment: 50,
      hosting: "2022-01-01",
      domain: "2022-01-01",
      cloud_storage: "2022-01-01",
      payment_date: "2022-01-01",
      total: 150,
    },
  ];
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10 p-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
