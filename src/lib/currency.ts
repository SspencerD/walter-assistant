export function formatCurrency(cents: number): string {
  const pesos = cents / 100;
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(pesos);
}
