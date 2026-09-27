const canvas = document.getElementById('meteorCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const meteors = [];
const colors = ["#fff", "#AED6F1", "#FAD7A0", "#ABB2B9"];
const meteorCount = 80;

function randomMeteor() {
    let x = Math.random() * canvas.width;
    let y = Math.random() * -canvas.height;
    let len = 150 + Math.random() * 80;
    let angle = Math.PI/4 + Math.random()*Math.PI/12;
    let speed = 5 + Math.random() * 5;
    let alpha = 0.3 + Math.random() * 0.5;
    let color = colors[Math.floor(Math.random()*colors.length)];
    return { x, y, len, angle, speed, alpha, color };
}

for (let i = 0; i < meteorCount; i++) {
    meteors.push(randomMeteor());
}

function drawMeteor(meteor) {
    ctx.save();
    ctx.globalAlpha = meteor.alpha;
    ctx.strokeStyle = meteor.color;
    ctx.shadowColor = meteor.color;
    ctx.shadowBlur = 15;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(meteor.x, meteor.y);
    ctx.lineTo(
        meteor.x + Math.cos(meteor.angle)*meteor.len,
        meteor.y + Math.sin(meteor.angle)*meteor.len
    );
    ctx.stroke();
    ctx.restore();
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let meteor of meteors) {
        drawMeteor(meteor);
        meteor.x += Math.cos(meteor.angle) * meteor.speed;
        meteor.y += Math.sin(meteor.angle) * meteor.speed;

        if (meteor.x > canvas.width || meteor.y > canvas.height) {
            Object.assign(meteor, randomMeteor());
        }
    }
    requestAnimationFrame(animate);
}

animate();
