import KanbanAPI from "../api/KanbanAPI.js";
import DropZone from "./DropZone.js";
import Item from "./Item.js"

export default class Column{
    constructor(kanbanRef, id, title, color) {
        this.kanbanRef = kanbanRef;
        this.draggingNode = null;
        const topDropZone = new DropZone(this.kanbanRef).createDropZone();

        this.elements = {};
        this.elements.root = Column.createRoot(color);
        this.elements.title = this.elements.root.querySelector(".kanban__column-title");
        this.elements.items = this.elements.root.querySelector(".kanban__column_items");
        this.elements.addItem = this.elements.root.querySelector(".kanban__add-item");
        this.elements.items.appendChild(topDropZone)


        this.elements.root.dataset.id = id;
        this.elements.title.textContent = title;

        this.elements.addItem.addEventListener("click", () => {
            const newItem = KanbanAPI.insertItem(id, "");

            this.renderItem(newItem)
        });

        KanbanAPI.getItems(id).forEach(item => {
            this.renderItem(item)
        })
    }

    static createRoot(color) {
        const range = document.createRange();
        range.selectNode(document.body);
        console.log(this.color)
        return range.createContextualFragment(`
            <div class="kanban__column">
                <div class="kanban__column-topline" style="background-image: ${color}"></div>
                <div class="kanban__column-header">
                    <h2><div class="kanban__column-title"></div></h2>
                    <img style="width: 30px; cursor: pointer;" src="assets/question.svg" alt="?">
                </div>

                <div class="kanban__column_items"></div>

                <div class="kanban__add-item">
                    <h4>Add task</h4>
                    <img style="width: 20px; margin-left: 5px;" src="assets/add.svg" alt="+">
                </div>
            
            </div>
        `).children[0];

    }

    renderItem(data) {
        const item = new Item(this.kanbanRef, data.id, data.content, data.priority, data.messages, data.attachments)
        
        this.elements.items.appendChild(item.elements.root)
    }
}