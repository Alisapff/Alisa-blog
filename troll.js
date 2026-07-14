const troll = document.getElementById("trollFace");

let x = 200;
let y = 150;

let dx = 2;
let dy = 2;

troll.style.position = "fixed";
troll.style.width = "80px";
troll.style.zIndex = "9999";
troll.style.left = x + "px";
troll.style.top = y + "px";
troll.style.userSelect = "none";

function moveTroll() {

    x += dx;
    y += dy;

    if (x <= 0 || x >= window.innerWidth - troll.offsetWidth)
        dx *= -1;

    if (y <= 0 || y >= window.innerHeight - troll.offsetHeight)
        dy *= -1;

    troll.style.left = x + "px";
    troll.style.top = y + "px";

    requestAnimationFrame(moveTroll);
}

moveTroll();

document.addEventListener("mousemove", (e)=>{

    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const centerX = x + troll.offsetWidth/2;
    const centerY = y + troll.offsetHeight/2;

    const distance = Math.hypot(mouseX-centerX, mouseY-centerY);

    if(distance < 120){

        const angle = Math.atan2(centerY-mouseY, centerX-mouseX);

        const shift = 80;

        x += Math.cos(angle) * shift;
        y += Math.sin(angle) * shift;

        x = Math.max(0, Math.min(x, window.innerWidth - troll.offsetWidth));
        y = Math.max(0, Math.min(y, window.innerHeight - troll.offsetHeight));

    }

});
