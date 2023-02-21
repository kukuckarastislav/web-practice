export default class Card{
    static zIndex = 0;
    constructor(parentRoot, id, name, width, height, left, top, deviceType, events) {
        this.parentRoot = parentRoot;
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
        });

        this.root.addEventListener(this.events.move, (e) => { 
            if (this.moveElement) {
                e.preventDefault();
                let newX = !this.isTouchDevice ? e.clientX : e.touches[0].clientX;
                let newY = !this.isTouchDevice ? e.clientY : e.touches[0].clientY;
    
                const moveY = this.root.offsetTop - (this.initialY - newY);
                const moveX = this.root.offsetLeft - (this.initialX - newX);
        
                if (moveX >= this.root.offsetWidth / 2 && moveX <= window.innerWidth - this.root.offsetWidth / 2) {
                    this.root.style.left = moveX + "px";    
                    this.initialX = newX;
                }
        
                if (moveY >= this.root.offsetHeight / 2 && moveY <= window.innerHeight - this.root.offsetHeight / 2) {
                    this.root.style.top = moveY + "px";
                    this.initialY = newY;
                }
            }
        });

        this.root.addEventListener(this.events.up, (e) => {
            this.moveElement = false;
        });

        this.root.addEventListener("contextmenu", (e) => {
            e.preventDefault();    
        });
    }

}