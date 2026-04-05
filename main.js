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
    initThreeJS();
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

function initThreeJS() {
    const container = document.getElementById('webgl-container');
    if (!container || typeof THREE === 'undefined') return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030803, 0.0015);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // ─── MASSIVE CENTRAL ARTIFACT ───
    const geom = new THREE.TorusKnotGeometry(15, 3.5, 120, 20);
    const mat = new THREE.MeshBasicMaterial({
        color: 0x39ff14,
        wireframe: true,
        transparent: true,
        opacity: 0.12
    });
    const mesh = new THREE.Mesh(geom, mat);
    mesh.position.z = -40;
    scene.add(mesh);

    // ─── 3D DUST PARTICLES ───
    const partGeom = new THREE.BufferGeometry();
    const partCount = 3000;
    const posArray = new Float32Array(partCount * 3);
    for (let i = 0; i < partCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 160;
    }
    partGeom.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const partMat = new THREE.PointsMaterial({
        size: 0.15,
        color: 0x39ff14,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(partGeom, partMat);
    scene.add(particles);

    // ─── INTERACTIVE PARALLAX ───
    let mouseX = 0;
    let mouseY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    const onDocumentMouseMove = (event) => {
        let clientX = event.clientX;
        let clientY = event.clientY;
        if (event.touches && event.touches.length > 0) {
            clientX = event.touches[0].clientX;
            clientY = event.touches[0].clientY;
        }
        mouseX = (clientX - windowHalfX);
        mouseY = (clientY - windowHalfY);
    };

    document.addEventListener('mousemove', onDocumentMouseMove, false);
    document.addEventListener('touchmove', onDocumentMouseMove, { passive: true });

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    const clock = new THREE.Clock();
    const animate = () => {
        requestAnimationFrame(animate);
        const time = clock.getElapsedTime();

        mesh.rotation.x += 0.002;
        mesh.rotation.y += 0.003;

        particles.rotation.y = time * 0.03;
        particles.rotation.x = time * 0.01;

        camera.position.x += (mouseX * 0.08 - camera.position.x) * 0.05;
        camera.position.y += (-mouseY * 0.08 - camera.position.y) * 0.05;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
    };
    animate();
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

// ─── CINEMATIC AUDIO ENGINE ───
let audioCtx;
const initAudio = () => {
    if (audioCtx) return;
    try {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();

        // Ambient drone
        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        const filter = audioCtx.createBiquadFilter();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(45, audioCtx.currentTime); // Deep bass

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(100, audioCtx.currentTime);

        gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.3, audioCtx.currentTime + 5);

        osc.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        osc.start();
    } catch (e) {
        console.warn('AudioContext failed:', e);
    }
};

const playHoverClick = () => {
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(800, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.05);

    gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);

    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.05);
};

document.getElementById('loading-screen').addEventListener('click', function () {
    initAudio();
    this.classList.add('fade-out');
    setTimeout(() => { this.style.display = 'none'; }, 420);
    document.body.style.backgroundColor = '#39ff14';
    setTimeout(() => { document.body.style.backgroundColor = ''; }, 100);
});
document.querySelectorAll('.btn, .trait-pill, .footer-links a, .cd-block').forEach(el => {
    el.addEventListener('mouseenter', playHoverClick);
});

// ─── GLOBAL SVG GLITCH ───
setInterval(() => {
    const filter = document.getElementById('glitch-displacement');
    if (!filter) return;
    filter.setAttribute('scale', Math.random() * 20 + 10);
    document.body.style.filter = 'url(#crt-glitch)';
    setTimeout(() => {
        filter.setAttribute('scale', '0');
        document.body.style.filter = 'none';
    }, 100 + Math.random() * 200);
}, 6000 + Math.random() * 8000);

// ─── CRYPTOGRAPHIC DECRYPTION ───
const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*XØŒ";
document.querySelectorAll('h3, .section-label, .cd-label').forEach(el => {
    el.dataset.original = el.textContent;
    el.addEventListener('mouseenter', () => {
        let iterations = 0;
        const interval = setInterval(() => {
            el.textContent = el.dataset.original.split('')
                .map((char, index) => {
                    if (char === ' ') return ' ';
                    if (index < iterations) return el.dataset.original[index];
                    return chars[Math.floor(Math.random() * chars.length)];
                }).join('');
            if (iterations >= el.dataset.original.length) {
                clearInterval(interval);
                el.textContent = el.dataset.original;
            }
            iterations += 1 / 3;
        }, 30);
    });
});

// ─── MAGNETIC PHYSICS FOR BUTTONS ───
if (window.matchMedia('(hover: hover)').matches) {
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) scale(1.05)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });
}
