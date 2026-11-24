/**
 * Deterministic number formatting. toLocaleString can differ between the
 * server and the browser, which breaks hydration, so commas are added by hand.
 */
export function money(n: number, dp = 2): string {
  const fixed = Math.abs(n).toFixed(dp);
  const [int, dec] = fixed.split(".");
  const grouped = int.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return `${n < 0 ? "−" : ""}${grouped}${dec ? `.${dec}` : ""}`;
}
