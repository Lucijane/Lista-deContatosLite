export class User {
    #id; #name; #email; #phone; #createdAt; #updatedAt; #active;

    constructor({ id, name, email, phone, createdAt, updatedAt, active = true }) {
        const now = new Date().toISOString();
        this.#id = id ?? (crypto.randomUUID?.() ?? String(Date.now()));
        this.name = name;      // setters validam
        this.email = email;
        this.phone = phone;    // valida e normaliza
        this.#createdAt = createdAt ?? now;
        this.#updatedAt = updatedAt ?? now;
        this.#active = active;
    }

    // getters
    get id() { return this.#id; }
    get name() { return this.#name; }
    get email() { return this.#email; }
    get phone() { return this.#phone; }
    get createdAt() { return this.#createdAt; }
    get updatedAt() { return this.#updatedAt; }
    get active() { return this.#active; }

    // setters com validação
    set name(v) {
        if (!v || v.trim().length < 2) throw new Error("Nome inválido");
        this.#name = v.trim();
        this.touch();
    }
    set email(v) {
        const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v ?? "");
        if (!ok) throw new Error("E-mail inválido");
        this.#email = v.trim();
        this.touch();
    }
    set phone(v) {
        const normalized = normalizePhoneBR(v);
        if (!normalized) throw new Error("Telefone inválido");
        this.#phone = normalized;
        this.touch();
    }

    deactivate() { this.#active = false; this.touch(); }
    touch() { this.#updatedAt = new Date().toISOString(); }

    toJSON() {
        return {
            id: this.#id, name: this.#name, email: this.#email, phone: this.#phone,
            createdAt: this.#createdAt, updatedAt: this.#updatedAt, active: this.#active
        };
    }
    static fromJSON(obj) { return new User(obj); }
}

// Util: normaliza telefone BR 
function normalizePhoneBR(input) {
    if (!input) return null;
    let digits = String(input).replace(/\D/g, "");
    for (const p of ["0055", "055", "55"]) { if (digits.startsWith(p)) { digits = digits.slice(p.length); break; } }
    const len = digits.length, ddd = digits.slice(0, 2), local = digits.slice(2);
    if (![10, 11].includes(len)) return null;    // 10 ou 11 dígitos
    if (ddd === "00") return null;             // DDD inválido
    if (/^(\d)\1+$/.test(digits)) return null; // repetidos
    if (len === 11 && local[0] !== "9") return null; // celular sem 9
    return `+55${digits}`;
}