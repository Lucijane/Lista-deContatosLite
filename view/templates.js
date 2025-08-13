import { escapeHtml } from "../utils/dom.js";

const fmtPhone = (e164) => {
  const m = /^\+55(\d{2})(\d{4,5})(\d{4})$/.exec(e164 || "");
  if (!m) return e164 || "";
  const [, ddd, p1, p2] = m;
  return `(${ddd}) ${p1}-${p2}`;
};

export const userItem = (u) => `
  <strong>${escapeHtml(u.name)}</strong>
  <small>&lt;${escapeHtml(u.email)}&gt; — ${escapeHtml(fmtPhone(u.phone))}</small>
  <button class="btn-remove">Remover</button>
`;