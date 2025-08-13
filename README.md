# Projeto: Lista de Contatos Lite

## Objetivo

Criar uma página web simples para cadastrar e listar contatos (nome, e-mail, telefone).

---

## Requisitos mínimos (entregáveis funcionais)

- **Cadastrar contato** via formulário (nome, e-mail, telefone).
- **Listar contatos** em uma tabela simples.
- **Excluir contato** (botão “Excluir” em cada linha).
- **Persistência local:** salvar no localStorage com `JSON.stringify` e carregar com `JSON.parse` no carregamento da página.

> **Observação:** Edição é opcional (extra).

---

## Restrições técnicas

- **Eventos:**  
  - Submit do formulário  
  - Click no botão Excluir  
  - Usar `event.preventDefault()` no submit

- **Funções sugeridas:**  
  - `carregar()`  
  - `salvar()`  
  - `render()`  
  - `handleSubmit(e)`  
  - `removerContato(id)`

- **Classe com getters/setters** (exemplo: `Contato`) com validações simples:
  - nome: não vazio
  - email: conter “@”
  - telefone: somente dígitos (ou padrão simples)

- **JSON:**  
  - Salvar array de contatos no localStorage (`"contatos"`).

---

## Estrutura do Projeto

- `index.html` — Página principal
- `style.css` — Estilos personalizados
- `index.js` — Lógica principal
- `model/`, `view/`, `controller/` — Organização do código em MVC

---

Desenvolvido para fins didáticos.