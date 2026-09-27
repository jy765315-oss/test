const canvas = document.getElementById('meteorCanvas');
const ctx = canvas.getContext('2d');

// 适配屏幕尺寸
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const meteors = [];

function randomBetween(a, b) {
    return a + Math.random() * (b - a);
}

function createMeteor() {
    return {
        x: randomBetween(0, canvas.width),
        y: randomBetween(-canvas.height, 0),
        len: randomBetween(80, 260),          // 流星长度
        speed: randomBetween(6, 12),          // 移动速度
        angle: randomBetween(Math.PI / 6, Math.PI / 3),  // 角度 30~60度
        alpha: randomBetween(0.3, 0.8),       // 透明度
        color: `hsl(${randomBetween(180, 240)}, 100%, 60%)` // 青蓝色系
    };
}

function drawMeteor(m) {
    ctx.save();
    ctx.globalAlpha = m.alpha;
    
    // 绘制流星主体
    ctx.strokeStyle = m.color;
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(m.x, m.y);
    ctx.lineTo(m.x - m.len * Math.cos(m.angle), m.y + m.len * Math.sin(m.angle));
    ctx.stroke();
    
    // 绘制流星头部（更亮）
    ctx.globalAlpha = m.alpha * 1.5;
    ctx.fillStyle = m.color;
    ctx.beginPath();
    ctx.arc(m.x, m.y, 2, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.restore();
}

function updateMeteor(m) {
    m.x += m.speed * Math.cos(m.angle);
    m.y += m.speed * Math.sin(m.angle);
    
    // 流星出屏时重置
    if (m.x < -m.len || m.y > canvas.height + m.len) {
        const newM = createMeteor();
        m.x = newM.x;
        m.y = newM.y;
        m.len = newM.len;
        m.speed = newM.speed;
        m.angle = newM.angle;
        m.alpha = newM.alpha;
        m.color = newM.color;
    }
}

// 初始化30颗流星
for (let i = 0; i < 30; i++) {
    meteors.push(createMeteor());
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (const meteor of meteors) {
        drawMeteor(meteor);
        updateMeteor(meteor);
    }
    
    requestAnimationFrame(animate);
}

animate();