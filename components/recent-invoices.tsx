export function RecentInvoices() {
  const invoices = [
    {
      id: "INV-001",
      client: "Acme Inc",
      date: "01 Abril 2025",
      amount: "$1,200",
      status: "Pagada",
    },
    {
      id: "INV-002",
      client: "TechCorp",
      date: "15 Abril 2025",
      amount: "$850",
      status: "Pendiente",
    },
    {
      id: "INV-003",
      client: "GlobalBiz",
      date: "22 Abril 2025",
      amount: "$1,500",
      status: "Pagada",
    },
    {
      id: "INV-004",
      client: "LocalShop",
      date: "30 Abril 2025",
      amount: "$700",
      status: "Vencida",
    },
  ];

  return (
    <div className="rounded-md border">
      <div className="grid grid-cols-5 gap-4 p-4 font-medium">
        <div>Nº Factura</div>
        <div>Cliente</div>
        <div>Fecha</div>
        <div>Monto</div>
        <div>Estado</div>
      </div>
      <div className="divide-y">
        {invoices.map((invoice, i) => (
          <div key={i} className="grid grid-cols-5 gap-4 p-4 items-center">
            <div className="font-medium">{invoice.id}</div>
            <div>{invoice.client}</div>
            <div>{invoice.date}</div>
            <div>{invoice.amount}</div>
            <div>
              <span
                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  invoice.status === "Pagada"
                    ? "bg-green-100 text-green-800"
                    : invoice.status === "Pendiente"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {invoice.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
