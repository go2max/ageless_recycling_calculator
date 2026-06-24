import { estimateRows, materials, money, totals } from "./calculator.js";

const form = document.querySelector("form");
const rowsEl = document.querySelector("tbody");
const rates = { sorted: 0.07, mixed: 0.035, soiled: 0.01 };

function renderInputs() {
  document.querySelector("#materials").replaceChildren(...materials.map((material) => {
    const field = document.createElement("label");
    field.innerHTML = `<span>${material.name}</span><input name="${material.id}" type="number" inputmode="numeric" min="0" max="100000" step="1" value="0">`;
    return field;
  }));
}

function calculate() {
  const data = new FormData(form);
  const condition = data.get("condition");
  Object.keys(rates).forEach((key) => { rates[key] = Math.max(0, Number(data.get(`rate-${key}`)) || 0); });
  const rows = estimateRows(materials.map((material) => ({ materialId: material.id, count: data.get(material.id), condition })), rates).filter((row) => row.count > 0);
  rowsEl.replaceChildren(...(rows.length ? rows.map((row) => {
    const tr = document.createElement("tr");
    [row.name, row.count, `${row.weight.toFixed(2)} lb`, `${money(row.rate)}/lb`, money(row.earnings)].forEach((value) => { const td = document.createElement("td"); td.textContent = value; tr.append(td); });
    return tr;
  }) : [Object.assign(document.createElement("tr"), { innerHTML: '<td colspan="5">Enter container counts to calculate an estimate.</td>' })]));
  const result = totals(rows);
  document.querySelector("#total-count").textContent = result.count.toLocaleString();
  document.querySelector("#total-weight").textContent = `${result.weight.toFixed(2)} lb`;
  document.querySelector("#total-earnings").textContent = money(result.earnings);
  document.querySelector("#updated").textContent = new Date().toLocaleString();
}

renderInputs(); form.addEventListener("input", calculate); form.addEventListener("reset", () => setTimeout(calculate)); calculate();
