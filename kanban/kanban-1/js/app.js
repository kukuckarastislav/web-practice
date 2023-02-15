// https://www.youtube.com/watch?v=ijQ6dCughW8
// https://github.com/dcode-youtube/kanban-board/blob/main/js/view/DropZone.js


import KanbanAPI from "./api/KanbanAPI.js";
import Kanban from "./view/Kanban.js";
//KanbanAPI.init()
new Kanban(document.querySelector(".kanban"))
console.log(KanbanAPI.getItems(1));