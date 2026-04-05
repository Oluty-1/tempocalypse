const textToType = `SYSTEM FAILURE DETECTED...\nMARKETS: DECEASED.\nBULLS: EXTINCT.\nUPLOADING FINAL SURVIVAL LOGS TO TEMPO NETWORK...\nSTAY BEARISH. THE END IS NEAR.\n\n[ CLICK ANYWHERE TO ENTER THE TEMPOCALYPSE ]`;
const typedElement = document.getElementById('typed');
let index = 0;

function typeWriter() {
    if (index < textToType.length) {
        if (textToType.charAt(index) === '\n') {
            typedElement.innerHTML += '<br>';
        } else {
            typedElement.innerHTML += textToType.charAt(index);
        }
        index++;
        setTimeout(typeWriter, 40 + (Math.random() * 30 - 15));
    }
}

window.onload = () => {
    setTimeout(typeWriter, 500);
    initMatrixRain();
    initParticles();
};

document.getElementById('loading-screen').addEventListener('click', function () {
    this.classList.add('fade-out');
    setTimeout(() => { this.style.display = 'none'; }, 420);
    document.body.style.backgroundColor = '#39ff14';
    setTimeout(() => { document.body.style.backgroundColor = ''; }, 100);
});

const deathDate = new Date('2022-11-08T00:00:00Z');
function updateClock() {
    const now = new Date();
    const diff = now - deathDate;
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const mins = Math.floor((diff % 3600000) / 60000);
    const secs = Math.floor((diff % 60000) / 1000);

    animateNumber('cd-days', days, 3);
    animateNumber('cd-hours', hours, 2);
    animateNumber('cd-mins', mins, 2);
    animateNumber('cd-secs', secs, 2);
}

function animateNumber(id, value, padding) {
    const el = document.getElementById(id);
    if (!el) return;
    const current = el.textContent;
    const target = String(value).padStart(padding, '0');
    if (current !== target) {
        el.style.transform = 'scale(1.1)';
        setTimeout(() => {
            el.textContent = target;
            el.style.transform = 'scale(1)';
        }, 100);
    }
}

updateClock();
setInterval(updateClock, 1000);

const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            const delay = Math.random() * 120;
            setTimeout(() => e.target.classList.add('visible'), delay);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.section-box').forEach(el => observer.observe(el));

const logMessages = [
    ['New block minted on Tempo chain', 'ok'],
    ['Radiation spike in Sector 12 — evacuate if alive', 'warn'],
    ['Bull signal: still null', 'err'],
    ['Scavenger 0x7Fa3 acquired Toxic Canteen', 'ok'],
    ['Market sentiment: deceased', 'err'],
    ['Doom scroll entry #88,224 committed', 'ok'],
    ['Power grid fluctuation detected', 'warn'],
    ['Memory leak detected in legacy systems', 'warn'],
    ['Blockchain sync: 99.97% complete', 'ok'],
    ['Unknown entity detected in Zone 9', 'err'],
    ['Scrap value increased by 0.003%', 'ok'],
];

setInterval(() => {
    const logEl = document.getElementById('signal-log');
    if (!logEl) return;
    const [msg, type] = logMessages[Math.floor(Math.random() * logMessages.length)];
    const now = new Date();
    const ts = `[${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}]`;
    const span = document.createElement('span');
    span.className = 'log-line';
    span.innerHTML = `<span class="ts">${ts}</span> <span class="${type}">${type.toUpperCase()}</span> — ${msg}`;
    logEl.appendChild(span);
    while (logEl.children.length > 14) logEl.removeChild(logEl.firstChild);
    logEl.scrollTop = logEl.scrollHeight;
}, 4000);

let throttle = false;
const createTrail = (e) => {
    if (throttle) return;
    throttle = true;
    setTimeout(() => throttle = false, 50);

    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.left = e.pageX + 'px';
    trail.style.top = e.pageY + 'px';
    document.body.appendChild(trail);
    setTimeout(() => {
        trail.style.opacity = '0';
        trail.style.transform = 'scale(2)';
    }, 50);
    setTimeout(() => trail.remove(), 400);
};

if (window.matchMedia('(hover: hover)').matches) {
    document.addEventListener('mousemove', createTrail);
}

document.querySelectorAll('.trait-pill').forEach(pill => {
    pill.addEventListener('mouseenter', () => {
        const logEl = document.getElementById('signal-log');
        if (!logEl) return;
        const msg = `Trait scanned: ${pill.textContent.replace(' ✦', '').replace(' ★', '')} — Safe`;
        const now = new Date();
        const ts = `[${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}]`;
        const span = document.createElement('span');
        span.className = 'log-line';
        span.innerHTML = `<span class="ts">${ts}</span> <span class="warn">SCAN</span> — ${msg}`;
        logEl.appendChild(span);
        while (logEl.children.length > 14) logEl.removeChild(logEl.firstChild);
    });
});

function initMatrixRain() {
    const canvas = document.getElementById('matrix-rain');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノ';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    function draw() {
        ctx.fillStyle = 'rgba(3, 8, 3, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#39ff14';
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    setInterval(draw, 50);

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

function initParticles() {
    const container = document.getElementById('particles-container');
    if (!container) return;

    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.setProperty('--drift', (Math.random() * 100 - 50) + 'px');
        const duration = 15 + Math.random() * 10;
        particle.style.animationDuration = duration + 's';
        particle.style.animationDelay = Math.random() * 5 + 's';
        container.appendChild(particle);

        setTimeout(() => particle.remove(), (duration + 5) * 1000);
    }

    for (let i = 0; i < 30; i++) {
        setTimeout(() => createParticle(), i * 200);
    }

    setInterval(() => {
        if (container.children.length < 30) {
            createParticle();
        }
    }, 1000);
}

const pfpWrap = document.querySelector('.pfp-wrap');
if (pfpWrap && window.matchMedia('(hover: hover)').matches) {
    pfpWrap.addEventListener('mousemove', (e) => {
        const rect = pfpWrap.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        const pfpImg = pfpWrap.querySelector('.pfp-img');
        if (pfpImg) {
            pfpImg.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
        }
    });

    pfpWrap.addEventListener('mouseleave', () => {
        const pfpImg = pfpWrap.querySelector('.pfp-img');
        if (pfpImg) {
            pfpImg.style.transform = '';
        }
    });
}

document.querySelectorAll('.section-box').forEach(box => {
    if (!window.matchMedia('(hover: hover)').matches) return;

    box.addEventListener('mousemove', (e) => {
        const rect = box.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 50;
        const rotateY = (centerX - x) / 50;

        box.style.transform = `translateY(-5px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    box.addEventListener('mouseleave', () => {
        box.style.transform = '';
    });
});
