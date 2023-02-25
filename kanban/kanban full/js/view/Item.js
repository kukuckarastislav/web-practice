import KanbanAPI from "../api/KanbanAPI.js";
import DropZone from "./DropZone.js";
import Kanban from "./Kanban.js";

export default class Item{
    draging = false;
    animationDuration = 300;
    constructor(kanbanRef, id, content, priority, messages, attachments) {
        this.kanbanRef = kanbanRef;
        this.draggingNode = null;
        const bottomDropZone = new DropZone(this.kanbanRef).createDropZone()

        this.elements = {};
        this.elements.root = Item.createRoot(priority);
        this.elements.input = this.elements.root.querySelector(".kanban__item-input");
        this.elements.messages = this.elements.root.querySelector("#messagesId");
        this.elements.messages.textContent = messages;
        this.elements.attachments = this.elements.root.querySelector("#attachmentsId");
        this.elements.attachments.textContent = attachments;
        
        this.elements.root.dataset.id = id;
        this.elements.input.textContent = content;
        this.content = content;

        this.elements.root.appendChild(bottomDropZone)
        
        const onBlur = () => {
            const newContent = this.elements.input.textContent.trim();
            
            if (newContent === this.content) {
                return;
            }

            this.content = newContent;
            KanbanAPI.updateItem(id, {content: this.content})

            console.log(this.content)
            console.log(newContent)
        };

        this.elements.input.addEventListener("blur", onBlur)
        this.elements.root.addEventListener("dblclick", () => {
            const check = confirm("Are you shure you want to delete this item?");
            if (check) {
                KanbanAPI.deleteItem(id);

                this.elements.input.removeEventListener("blur", onBlur);
                this.elements.root.parentElement.removeChild(this.elements.root)
            }
        })

        this.elements.root.addEventListener("dragstart", (e) => {
            e.dataTransfer.setData("text/plain", id);
            this.offsetX = e.offsetX;
            this.offsetY = e.offsetY;
            this.draging = true;
            this.draggingNode = this.elements.root.cloneNode(true);
            this.draggingNode.dataset.id = "noID";
            this.draggingNode.classList.add("draged-item-helper");
            document.getElementById("draggedItemHelperID").appendChild(this.draggingNode);
            this.startDragingLeft = (e.clientX - this.offsetX) + "px";
            this.startDragingTop = (e.clientY - this.offsetY) + "px";
            this.draggingNode.style.left = this.startDragingLeft;
            this.draggingNode.style.top = this.startDragingTop;
            this.elements.root.classList.add("dragging")
        });

        this.elements.root.addEventListener("dragend", (e) => {
            this.draging = false;

            if (this.kanbanRef.applyDragendTransition) {
                if (this.draggingNode) {
                    this.draggingNode.style.left = this.startDragingLeft;
                    this.draggingNode.style.top = this.startDragingTop;
                    this.draggingNode.classList.add("draged-item-helper__transition")   
                }
                setTimeout(() => {
                    this.elements.root.classList.remove("dragging")
                    this.kanbanRef.removeHelperDragableItem();
                }, this.animationDuration);
                this.draggingNode = null;    
            } else {
                this.elements.root.classList.remove("dragging")
                this.kanbanRef.removeHelperDragableItem();
                this.kanbanRef.applyDragendTransition = true;
                this.draggingNode = null;
            }
            
            
        });

        this.elements.root.addEventListener("drag", (e) => {
            e.preventDefault();
            if (this.draggingNode && !(e.pageX == 0 && e.pageY == 0 && e.clientX == 0 && e.clientY == 0)) {
                this.draggingNode.style.left = (e.pageX - this.offsetX) + "px";
                this.draggingNode.style.top = (e.pageY - this.offsetY) + "px";   
            }
        });

        this.elements.input.addEventListener("drop", e => {
            e.preventDefault();
        })


    }

    static createRoot(priority) {
        let priorityClass = "low";
        let priorityText = "Low Priority";
        if (priority === 1) {
            priorityClass = "high";
            priorityText = "High Priority";
        } else if (priority === 2) {
            priorityClass = "medium";
            priorityText = "Med Priority";
        }
            
        const range = document.createRange();
        range.selectNode(document.body);
        return range.createContextualFragment(`
        <div>
            <div class="kanban__item" draggable="true">
                    <div class="tag ${priorityClass}-priority">${priorityText}</div>
                    <div class="kanban__item-input" contenteditable></div>
                    <div class="kanban__item-fotter">
                        <div class="kanban__item-fotter-left">
                            <div class="kanban__item-fotter-icon">
                                <img style="width: 20px; margin-right: 5px;" src="assets/message.svg" alt="msg"> <p id="messagesId">1</p>
                            </div>
                            <div class="kanban__item-fotter-icon">
                                <img style="width: 20px; margin-right: 5px;" src="assets/attach.svg" alt="att"> <p id="attachmentsId">2</p>
                            </div>
                        </div>
                        <img style="width: 24px;" src="assets/user.svg" alt="acc">
                    </div>
            </div>
        </div>
        `).children[0];
    }

}