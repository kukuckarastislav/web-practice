export default class Card{
    static zIndex = 0;
    constructor(parentRoot, id, name, width, height, left, top, deviceType, events, activeRef) {
        this.parentRoot = parentRoot;
        this.activeRef = activeRef;
        this.name = name;
        this.id = id;

        this.width = width;
        this.height = height;
        this.left = left;
        this.top = top;

        this.initialX = 0;
        this.initialY = 0;
        this.deviceType = this.deviceType;
        this.events = events;

        this.root = this.createCard()
        this.parentRoot.appendChild(this.root);

        this.registerListeners();
    }

    createCard() {
        const range = document.createRange();
        range.selectNode(document.body);
        let style = `width: ${this.width}px; height: ${this.height}px; left: ${this.left}px; top: ${this.top}px;`;
        return range.createContextualFragment(`
            <div class="draggable-elem" style="${style}">${this.name}</div>
        `).children[0];
    }

    registerListeners() { 
        this.root.addEventListener(this.events.down, (e) => {
            e.preventDefault();
            this.initialX = !this.isTouchDevice ? e.clientX : e.touches[0].clientX;
            this.initialY = !this.isTouchDevice ? e.clientY : e.touches[0].clientY;
            this.moveElement = true;
            this.root.style.zIndex = Card.zIndex++;
            this.activeRef = this;
        });

        this.root.addEventListener(this.events.up, (e) => {
            this.moveElement = false;
            this.activeRef = null;
        });

        this.root.addEventListener("contextmenu", (e) => {
            e.preventDefault();    
        });
    }

    moveF(newX, newY) {
        if (this.moveElement) {
            let moveY = this.root.offsetTop - (this.initialY - newY);
            let moveX = this.root.offsetLeft - (this.initialX - newX);
            
            moveX = Math.max(moveX, this.root.offsetWidth / 2)
            moveX = Math.min(moveX, window.innerWidth - this.root.offsetWidth / 2)

            moveY = Math.max(moveY, this.root.offsetHeight / 2)
            moveY = Math.min(moveY, window.innerHeight - this.root.offsetHeight / 2)

            this.root.style.left = moveX + "px";    
            this.initialX = newX;
    
            this.root.style.top = moveY + "px";
            this.initialY = newY;        
        }
        
    }
}