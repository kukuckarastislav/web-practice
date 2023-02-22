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
        this.deviceType = deviceType;
        this.events = events;

        this.root = this.createCard()
        this.parentRoot.appendChild(this.root);

        this.registerListeners();
    }

    createCard() {
        const range = document.createRange();
        range.selectNode(document.body);
        var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("x", this.left);
        rect.setAttribute("y", this.top);
        rect.setAttribute("width", this.width);
        rect.setAttribute("height", this.height);
        rect.setAttribute("class", "draggable-elem-svg");
        return rect;
    }

    registerListeners() { 
        this.root.addEventListener(this.events.down, (e) => {
            e.preventDefault();
            this.initialX = !this.isTouchDevice ? e.clientX : e.touches[0].clientX;
            this.initialY = !this.isTouchDevice ? e.clientY : e.touches[0].clientY;
            this.moveElement = true;
            //this.root.style.zIndex = Card.zIndex++;
        });

        this.root.addEventListener(this.events.move, (e) => { 
            if (this.moveElement) {
                e.preventDefault();
                let newX = !this.isTouchDevice ? e.clientX : e.touches[0].clientX;
                let newY = !this.isTouchDevice ? e.clientY : e.touches[0].clientY;

                const x = this.root.getAttribute("x");
                const y = this.root.getAttribute("y");
    
                const moveY = y - (this.initialY - newY);
                const moveX = x - (this.initialX - newX);
        
                if (moveX >= 0 && moveX <= window.innerWidth - this.width) {
                    this.root.setAttribute("x", moveX)
                    this.initialX = newX;
                }
        
                if (moveY >= 0 && moveY <= window.innerHeight - this.height) {
                    this.root.setAttribute("y", moveY)
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