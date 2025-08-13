export class UserController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.view.handlers.onCreate = (data) => {
            try { this.model.create(data); } catch (e) { alert(e.message); }
        };
        this.view.handlers.onRemove = (id) => {
            this.model.remove(id);
            this.view.render(this.model.list());
        };
        // Agora só renderiza a lista quando clicar em "Listar Contatos"
        this.view.handlers.onList = () => { this.view.render(this.model.list()); };


    }
    init() { }
}