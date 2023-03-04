let canvasHtml = document.getElementById("canvas");
let ctx = canvasHtml.getContext("2d");

const canvasWidth = 1536 //() => { return ctx.canvas.clientWidth }
const canvasHeight = 941 //() => { return ctx.canvas.clientHeight }

document.getElementById("btnClear").addEventListener("click", () => {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
});

mousedownFlag = false;
canvasHtml.addEventListener("mousedown", (e) => {
    mousedownFlag = true;
});

canvasHtml.addEventListener("mouseup", (e) => {
    mousedownFlag = false;
});

document.getElementById("colorPicker").addEventListener("change", (e) => {
    ctx.fillStyle = e.target.value;
});

let penSize = 10;
document.getElementById("range").addEventListener("change", (e) => {
    penSize = e.target.value;
});

canvasHtml.addEventListener("mousemove", (e) => {
    if (mousedownFlag) {
        ctx.beginPath();
        ctx.arc(e.offsetX, e.offsetY, penSize, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
    }
});
