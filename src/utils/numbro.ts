import numbro from "numbro";

export function formatAmount(amount: number) {
  return numbro(amount).format({ thousandSeparated: true });
}

export function formatThoundsand(num: number) {
  return numbro(num).format({
    spaceSeparated: true,
    average: true,
    mantissa: 1,
  });
}
