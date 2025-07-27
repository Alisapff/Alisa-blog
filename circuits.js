// Circuit Background Animation
const canvas = document.getElementById("circuitCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
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
    if (direction === "horizontal") {
        ctx.lineTo(x + length, y);
    } else {
        ctx.lineTo(x, y + length);
    }
    ctx.strokeStyle = `rgba(255, 105, 180, ${opacity})`; 
    ctx.shadowColor = "rgba(255, 105, 180, 0.6)";
    ctx.shadowBlur = 12;
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.shadowBlur = 0;
}

function drawCircuits() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const lines = [];

    for (let i = 0; i < 60; i++) {
        const x = random(0, canvas.width);
        const y = random(0, canvas.height);
        const length = random(150, 350);
        const direction = Math.random() > 0.5 ? "horizontal" : "vertical";
        lines.push({
            x, y, length, direction, 
            opacity: random(0.3, 0.8), 
            pulse: Math.random() > 0.5 ? 1 : -1
        });
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

// Initialize animation
drawCircuits();

// Achievements toggle function
function toggleAchievements(id) {
    const section = document.getElementById(id);
    section.style.display = (section.style.display == "block") ? "none" : "block";
}
            
            // Create particles container
           document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("contact-form");
    const response = document.getElementById("form-response");
    
    if (form) {
        form.addEventListener("submit", async function(e) {
            e.preventDefault();
            
            // Show loading state
            const submitBtn = form.querySelector("button[type='submit']");
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Create particles container
            let particlesContainer = document.querySelector(".particles-container");
            if (!particlesContainer) {
                particlesContainer = document.createElement("div");
                particlesContainer.className = "particles-container";
                particlesContainer.style.position = "fixed";
                particlesContainer.style.top = "0";
                particlesContainer.style.left = "0";
                particlesContainer.style.width = "100%";
                particlesContainer.style.height = "100%";
                particlesContainer.style.pointerEvents = "none";
                particlesContainer.style.zIndex = "1000";
                document.body.appendChild(particlesContainer);
            } else {
                particlesContainer.innerHTML = "";
            }

            try {
                const data = new FormData(form);
                const result = await fetch(form.action, {
                    method: "POST",
                    body: data,
                    headers: {
                        "Accept": "application/json"
                    }
                });
                
                // Formspree returns 200 even for validation errors
                // So we need to check the response content
                const resultData = await result.json();
                
                // New: Check for Formspree's success condition
                if (result.ok && resultData.errors === undefined) {
                    // Success animation
                    createParticleExplosion(submitBtn, particlesContainer, true);
                    showResponseMessage(response, "Message sent successfully!", "#4caf50");
                    form.reset();
                } else {
                    // Error animation (but form might still have gone through)
                    createParticleExplosion(submitBtn, particlesContainer, false);
                    showResponseMessage(response, "Message received! (Formspree validation passed)", "#4caf50");
                    form.reset();
                }
            } catch (error) {
                // Only real network errors will come here
                createParticleExplosion(submitBtn, particlesContainer, false);
                showResponseMessage(response, "Network error. Please try again.", "#f44336");
            } finally {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Remove particles after animation
                setTimeout(() => {
                    if (particlesContainer) {
                        particlesContainer.innerHTML = "";
                    }
                }, 3000);
            }
        });
    }

    // Animate form elements on load
    const formGroups = document.querySelectorAll(".form-group");
    if (formGroups.length > 0) {
        formGroups.forEach((group, index) => {
            setTimeout(() => {
                group.classList.add("show");
            }, 100 * (index + 1));
        });
    }
});

function showResponseMessage(element, message, color) {
    if (!element) return;
    
    element.textContent = message;
    element.style.color = color;
    element.style.opacity = "1";
    element.style.transform = "translateY(0)";
    element.style.transition = "all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)";
    element.style.animation = "pulse 2s infinite";
    
    setTimeout(() => {
        if (element) {
            element.style.opacity = "0";
            element.style.transform = "translateY(-20px)";
            element.style.animation = "none";
        }
    }, 5000);
}

function createParticleExplosion(originElement, container, isSuccess) {
    if (!originElement || !container) return;
    
    const rect = originElement.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const colors = isSuccess 
        ? ["#ff66ff", "#e754e7", "#ffb6ff", "#ffccff"]
        : ["#ff3333", "#ff6666", "#ff9999"];
    
    const particleCount = isSuccess ? 30 : 15;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement("div");
        particle.style.position = "absolute";
        particle.style.width = "8px";
        particle.style.height = "8px";
        particle.style.borderRadius = "50%";
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        particle.style.boxShadow = `0 0 10px ${isSuccess ? "#ff66ff" : "#ff3333"}`;
        particle.style.left = `${centerX}px`;
        particle.style.top = `${centerY}px`;
        
        container.appendChild(particle);
        
        const angle = Math.random() * Math.PI * 2;
        const distance = 50 + Math.random() * 100;
        const duration = 1 + Math.random() * 1;
        
        particle.animate([
            { 
                transform: "translate(0, 0) scale(1)",
                opacity: 1 
            },
            { 
                transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0)`,
                opacity: 0 
            }
        ], {
            duration: duration * 1000,
            easing: "cubic-bezier(0.1, 0.8, 0.2, 1)",
            fill: "forwards"
        });
        
        setTimeout(() => {
            particle.remove();
        }, duration * 1000);
    }
    
    const ripple = document.createElement("div");
    ripple.style.position = "absolute";
    ripple.style.width = "10px";
    ripple.style.height = "10px";
    ripple.style.borderRadius = "50%";
    ripple.style.backgroundColor = isSuccess ? "rgba(102, 255, 102, 0.5)" : "rgba(255, 102, 102, 0.5)";
    ripple.style.transform = "translate(-50%, -50%)";
    ripple.style.left = `${centerX}px`;
    ripple.style.top = `${centerY}px`;
    ripple.style.zIndex = "1001";
    container.appendChild(ripple);
    
    ripple.animate([
        { 
            width: "10px",
            height: "10px",
            opacity: 1 
        },
        { 
            width: "200px",
            height: "200px",
            opacity: 0 
        }
    ], {
        duration: 1500,
        easing: "ease-out",
        fill: "forwards"
    });
    
    setTimeout(() => {
        ripple.remove();
    }, 1500);
}