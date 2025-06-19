const canvas = document.getElementById('circuitCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drawCircuits();
});

function random(min, max) {
    return Math.random() * (max - min) + min;
}

function drawLine(x, y, length, direction, opacity) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    if (direction === 'horizontal') {
        ctx.lineTo(x + length, y);
    } else {
        ctx.lineTo(x, y + length);
    }
    ctx.strokeStyle = `rgba(255, 105, 180, ${opacity})`; 
    ctx.shadowColor = 'rgba(255, 105, 180, 0.6)';
    ctx.shadowBlur = 12;
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.shadowBlur = 0;
}

function toggleAchievements(id){
    const section = document.getElementById(id);
    section.style.display = (section.style.display == "block") ? "none" : "block";
}

function drawCircuits() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const lines = [];

    for (let i = 0; i < 60; i++) {
        const x = random(0, canvas.width);
        const y = random(0, canvas.height);
        const length = random(150, 350);
        const direction = Math.random() > 0.5 ? 'horizontal' : 'vertical';
        lines.push({x, y, length, direction, opacity: random(0.3, 0.8), pulse: Math.random() > 0.5 ? 1 : -1});
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        lines.forEach(line => {
            line.opacity += 0.01 * line.pulse;
            if (line.opacity >= 0.8 || line.opacity <= 0.3) line.pulse *= -1;
            drawLine(line.x, line.y, line.length, line.direction, line.opacity);
        });
        requestAnimationFrame(animate);
    }

    animate();
}

drawCircuits();



const form = document.getElementById("contact-form");
const response = document.getElementById("form-response");

form.addEventListener("submit", function(e){
e.preventDefault();
response.textContent = "Message sent!";
response.style.opacity = 1;
})
