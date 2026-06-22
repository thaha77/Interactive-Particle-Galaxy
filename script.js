const canvas = document.getElementById('galaxyCanvas');
const ctx = canvas.getContext('2d'); 

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];
const numberofparticles = 250;

const mouse = {
    x: null,
    y: null, 
    radius: 150
}

window.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
});

window.addEventListener('touchmove', function(event){
    if (event.touches.length > 0) {
        mouse.x = event.touches[0].clientX;
        mouse.y = event.touches[0].clientY;
    }
});

window.addEventListener('mouseleave', function(){
    mouse.x = null;
    mouse.y = null;
});

window.addEventListener('touchend', function(){
    mouse.x = null;
    mouse.y = null;
});

class particle {
   constructor(){
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1; 
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random() * 30) + 1; 
        
        const colors = ['#ff0055', '#00bfff', '#9932cc', '#ffffff'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); 
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 10; 
        ctx.shadowColor = this.color;
        ctx.fill();
    }
    update() {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;

        let maxDistance = mouse.radius;
        let force = (maxDistance - distance) / maxDistance;
        let directionX = forceDirectionX * force * this.density;
        let directionY = forceDirectionY * force * this.density; 

        if (distance < mouse.radius) {
            this.x -= directionX;
            this.y -= directionY;
        } else {
            if (this.x !== this.baseX) {
                let dx0rig = this.x - this.baseX;
                this.x -= dx0rig / 20;
            }
            if (this.y !== this.baseY) {
                let dy0rig = this.y - this.baseY;
                this.y -= dy0rig / 20;
            }
        }
    }
}

function init() {
    particlesArray = [];
    for (let i = 0; i < numberofparticles; i++) { 
        particlesArray.push(new particle()); 
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.shadowBlur = 0;

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].draw();
        particlesArray[i].update();
    }
    requestAnimationFrame(animate);
}

init();
animate();

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});