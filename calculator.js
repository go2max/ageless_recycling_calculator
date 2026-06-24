export const materials = [
  { id: "aluminum", name: "Aluminum cans", poundsPerContainer: 0.03 },
  { id: "small-plastic", name: "Small plastic bottles", poundsPerContainer: 0.04 },
  { id: "medium-plastic", name: "Medium plastic bottles", poundsPerContainer: 0.06 },
  { id: "large-plastic", name: "Large plastic bottles", poundsPerContainer: 0.12 },
  { id: "bimetal", name: "Bimetal cans", poundsPerContainer: 0.05 },
  { id: "other-plastic", name: "Other accepted plastic", poundsPerContainer: 0.08 }
];

export function estimateRows(entries, rates) {
  return entries.map((entry) => {
    const material = materials.find((item) => item.id === entry.materialId);
    const count = Math.max(0, Number(entry.count) || 0);
    const rate = Math.max(0, Number(rates[entry.condition]) || 0);
    const weight = material ? count * material.poundsPerContainer : 0;
    return { ...entry, name: material?.name || "Unknown", count, rate, weight, earnings: weight * rate };
  });
}

export function totals(rows) {
  return rows.reduce((sum, row) => ({ count: sum.count + row.count, weight: sum.weight + row.weight, earnings: sum.earnings + row.earnings }), { count: 0, weight: 0, earnings: 0 });
}

export function money(value) { return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(Number(value) || 0); }
