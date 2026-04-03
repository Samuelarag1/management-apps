export function formatPrice(
  value: number | null | undefined,
  currency: string = "ARS"
): string {
  const normalizedValue = typeof value === "number" ? value : 0;

  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(normalizedValue);
}
