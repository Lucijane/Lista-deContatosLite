import { UserStore } from "./model/UserStore.js";
import { UserView } from "./view/UserView.js";
import { UserController } from "./controller/UserController.js";


const model = new UserStore();
const view = new UserView({
    formEl: document.getElementById("user-form"),
    listEl: document.getElementById("user-list")
});

new UserController(model, view).init();