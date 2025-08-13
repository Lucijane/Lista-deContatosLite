export const $ = (sel, root=document) => root.querySelector(sel);
export function escapeHtml(s){
  return String(s).replace(/[&<>"']/g, m => ({
    "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;"
  }[m]));
}