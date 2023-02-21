let draggableElem = document.getElementById("draggable-elem");
let initialX = 0
let initialY = 0

let moveElement = false;
//Events Object
let events = {
    mouse: {
        down: "mousedown",
        move: "mousemove",
        up: "mouseup"
    },
    touch: {
        down: "touchstart",
        move: "touchmove",
        up: "touchend"
    }
}

let deviceType = "";

//Check if the device is touch or mouse
const isTouchDeviceF = () => {
    try {
        document.createEvent("TouchEvent");
        deviceType = "touch";
        return true;
    }
    catch (e) {
        deviceType = "mouse";
    }
    return false;
}

var isTouchDevice = isTouchDeviceF()

draggableElem.addEventListener(events[deviceType].down, (e) => {
    e.preventDefault();
    initialX = !isTouchDevice ? e.clientX : e.touches[0].clientX;
    initialY = !isTouchDevice ? e.clientY : e.touches[0].clientY;
    moveElement = true;
});

draggableElem.addEventListener(events[deviceType].move, (e) => { 
    if (moveElement) {
        e.preventDefault();
        let newX = !isTouchDevice ? e.clientX : e.touches[0].clientX;
        let newY = !isTouchDevice ? e.clientY : e.touches[0].clientY;
        
        const moveY = draggableElem.offsetTop - (initialY - newY);
        const moveX = draggableElem.offsetLeft - (initialX - newX);

        if (moveX >= draggableElem.offsetWidth / 2 && moveX <= window.innerWidth - draggableElem.offsetWidth / 2) {
            draggableElem.style.left = moveX + "px";    
            initialX = newX;
        }

        if (moveY >= draggableElem.offsetHeight / 2 && moveY <= window.innerHeight - draggableElem.offsetHeight / 2) {
            draggableElem.style.top = moveY + "px";
            initialY = newY;
        }
    }
});

draggableElem.addEventListener(events[deviceType].up, (e) => {
    moveElement = false;
})


document.getElementById("container").addEventListener("mouseleave", (e) => {
    moveElement = false;
})

document.getElementById("container").addEventListener(events[deviceType].up, (e) => {
    moveElement = false;
})

draggableElem.addEventListener("contextmenu", (e) => {
    e.preventDefault();    
})
