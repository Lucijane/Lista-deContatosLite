import { userItem } from "./templates.js";

export class UserView {
    constructor({ formEl, listEl }) {
        this.formEl = formEl;
        this.listEl = listEl;
        this.handlers = { onCreate: null, onRemove: null };
        this.#bind();
    }

    #bind() {
        this.formEl.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = this.formEl.querySelector("#name").value;
            const email = this.formEl.querySelector("#email").value;
            const phone = this.formEl.querySelector("#phone").value;
            this.handlers.onCreate?.({ name, email, phone });
            this.formEl.reset();
        });

        this.listEl.addEventListener("click", (e) => {
            if (!e.target.classList.contains("btn-remove")) return;
            const id = e.target.closest("tr")?.dataset.id;
            this.handlers.onRemove?.(id);
        });

        // Evento de listar todos os usuários
        document.getElementById("btn-listar").addEventListener("click", () => {
            this.handlers.onList?.(); // chama o Controller para listar
        });


    }

    render(list) {
        this.listEl.innerHTML = "";
        for (const u of list) {
            const tr = document.createElement("tr");
            tr.dataset.id = u.id;
            tr.innerHTML = `
            
            <td>${u.name}</td>
            <td>${u.email}</td>
            <td>${u.phone}</td> <!-- Telefone aqui -->
            <td>${u.createdAt || ''}</td>
            <td>
                <button type="button" class="btn btn-danger btn-xs btn-flat btn-remove">Excluir</button>
            </td>
        `;
            this.listEl.appendChild(tr);
        }
    }


}