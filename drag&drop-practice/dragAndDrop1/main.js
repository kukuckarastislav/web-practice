import Card from "/Card.js";
let containerDiv = document.getElementById("container");

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

let activeRef = null;
let cards = []

cards.push(new Card(containerDiv, 1, "Drag me 1", 200, 200, 100, 100, deviceType, events[deviceType], activeRef))
cards.push(new Card(containerDiv, 2, "Drag me 2", 400, 200, 400, 100, deviceType, events[deviceType], activeRef))
cards.push(new Card(containerDiv, 3, "Drag me 3", 200, 400, 100, 400, deviceType, events[deviceType], activeRef))
cards.push(new Card(containerDiv, 4, "Drag me 4", 400, 400, 400, 400, deviceType, events[deviceType], activeRef))
cards.push(new Card(containerDiv, 5, "Drag me 5", 600, 400, 900, 400, deviceType, events[deviceType], activeRef))
cards.push(new Card(containerDiv, 6, "Drag me 6", 200, 200, 100, 700, deviceType, events[deviceType], activeRef))
cards.push(new Card(containerDiv, 7, "Drag me 7", 200, 200, 300, 700, deviceType, events[deviceType], activeRef))

containerDiv.addEventListener("mouseleave", (e) => {
    cards.forEach(card => {
        card.moveElement = false;
    })
})

containerDiv.addEventListener(events[deviceType].up, (e) => {
    cards.forEach(card => {
        card.moveElement = false;
    })
})


containerDiv.addEventListener(events[deviceType].move, (e) => {
    for (let i = 0; i < cards.length; i++) {
        const card = cards[i]
        if (card.moveElement) {
            e.preventDefault();
            card.moveF(!isTouchDevice ? e.clientX : e.touches[0].clientX, !isTouchDevice ? e.clientY : e.touches[0].clientY)
            break
        }
    }
})



