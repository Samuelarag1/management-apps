export function getProjectStatusLabel(status: string | null | undefined) {
  switch (status) {
    case "activo":
      return "Activo";
    case "completo":
      return "Completo";
    case "descontinuado":
      return "Descontinuado";
    default:
      return "Sin estado";
  }
}

export function getProjectStatusClassName(status: string | null | undefined) {
  switch (status) {
    case "completo":
      return "bg-green-700 text-white";
    case "activo":
      return "bg-blue-600 text-white";
    case "descontinuado":
      return "bg-red-600 text-white";
    default:
      return "bg-muted text-foreground";
  }
}

export function getClientStatusClassName(status: string | null | undefined) {
  switch (status?.toLowerCase()) {
    case "activo":
      return "bg-green-700 text-white";
    case "inactivo":
      return "bg-amber-600 text-white";
    default:
      return "bg-muted text-foreground";
  }
}
