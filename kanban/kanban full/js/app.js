import KanbanAPI from "./api/KanbanAPI.js";
import Kanban from "./view/Kanban.js";

KanbanAPI.init()
new Kanban(document.querySelector(".kanban"))
console.log(KanbanAPI.getItems(1));