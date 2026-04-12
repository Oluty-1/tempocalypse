const textToType = `SYSTEM FAILURE DETECTED...\nMARKETS: DECEASED.\nBULLS: EXTINCT.\nUPLOADING FINAL SURVIVAL LOGS TO TEMPO NETWORK...\nSTAY BEARISH. THE END IS NEAR.\n\n[ CLICK ANYWHERE TO ENTER THE TEMPOCALYPSE ]`;
const typedElement = document.getElementById('typed');
let index = 0;

const isCoarsePointer = window.matchMedia?.('(hover: none) and (pointer: coarse)')?.matches ?? false;
const isSmallScreen = window.matchMedia?.('(max-width: 768px)')?.matches ?? (window.innerWidth <= 768);
const isMobileLike = isCoarsePointer || isSmallScreen;
const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;

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

const deathDate = new Date('2026-01-15T00:00:00Z');
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

    const lowPowerMode = prefersReducedMotion || isMobileLike;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030803, 0.0015);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(lowPowerMode ? 1 : Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // ─── MASSIVE CENTRAL ARTIFACT ───
    const geom = new THREE.TorusKnotGeometry(
        15,
        3.5,
        lowPowerMode ? 64 : 120,
        lowPowerMode ? 12 : 20
    );
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
    const partCount = lowPowerMode ? 1200 : 3000;
    const posArray = new Float32Array(partCount * 3);
    for (let i = 0; i < partCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 160;
    }
    partGeom.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const partMat = new THREE.PointsMaterial({
        size: lowPowerMode ? 0.12 : 0.15,
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
        renderer.setPixelRatio(lowPowerMode ? 1 : Math.min(window.devicePixelRatio, 2));
    });

    const clock = new THREE.Clock();
    let lastRender = 0;
    const animate = () => {
        requestAnimationFrame(animate);
        const time = clock.getElapsedTime();
        const now = performance.now();

        // Cap FPS on mobile-like / reduced motion to avoid jank + battery drain.
        if (lowPowerMode) {
            const minFrameMs = 1000 / 30;
            if (now - lastRender < minFrameMs) return;
            lastRender = now;
        }

        mesh.rotation.x += lowPowerMode ? 0.0012 : 0.002;
        mesh.rotation.y += lowPowerMode ? 0.0018 : 0.003;

        particles.rotation.y = time * (lowPowerMode ? 0.02 : 0.03);
        particles.rotation.x = time * (lowPowerMode ? 0.006 : 0.01);

        camera.position.x += (mouseX * (lowPowerMode ? 0.05 : 0.08) - camera.position.x) * (lowPowerMode ? 0.04 : 0.05);
        camera.position.y += (-mouseY * (lowPowerMode ? 0.05 : 0.08) - camera.position.y) * (lowPowerMode ? 0.04 : 0.05);
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
let masterGain;
let audioMuted = false;

const startProceduralAudio = () => {
    // 1. Noise Pad (Wind/Static)
    const bufferSize = audioCtx.sampleRate * 2;
    const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
    }
    const noiseSource = audioCtx.createBufferSource();
    noiseSource.buffer = noiseBuffer;
    noiseSource.loop = true;

    const noiseFilter = audioCtx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.Q.value = 1;

    // LFO to sweep filter frequency
    const lfo = audioCtx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.value = 0.05; // Very slow sweep
    const lfoGain = audioCtx.createGain();
    lfoGain.gain.value = 600; // Sweep depth
    lfo.connect(lfoGain);
    lfoGain.connect(noiseFilter.frequency);
    noiseFilter.frequency.value = 800; // Base frequency

    const noiseGain = audioCtx.createGain();
    noiseGain.gain.value = 0.03;

    noiseSource.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(masterGain);

    noiseSource.start();
    lfo.start();

    // 2. Data stream bleeps
    const playBleep = () => {
        if (!audioMuted) {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = Math.random() > 0.5 ? 'sine' : 'square';
            osc.frequency.setValueAtTime(400 + Math.random() * 2000, audioCtx.currentTime);

            gain.gain.setValueAtTime(0, audioCtx.currentTime);
            gain.gain.linearRampToValueAtTime(0.01 + Math.random() * 0.02, audioCtx.currentTime + 0.01);
            gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);

            osc.connect(gain);
            gain.connect(masterGain);
            osc.start();
            osc.stop(audioCtx.currentTime + 0.1);
        }
        setTimeout(playBleep, Math.random() * 2000 + 500);
    };
    playBleep();

    // 3. Low rhythmic pulse
    const playPulse = () => {
        if (!audioMuted) {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(55, audioCtx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(30, audioCtx.currentTime + 0.5);

            gain.gain.setValueAtTime(0.5, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.5);

            osc.connect(gain);
            gain.connect(masterGain);
            osc.start();
            osc.stop(audioCtx.currentTime + 0.5);
        }
        setTimeout(playPulse, 1000); // 60 BPM pulse
    };
    playPulse();

    // 4. Glitch effect function
    const createGlitch = () => {
        if (audioCtx && !audioMuted) {
            const dur = Math.random() * 0.15 + 0.05;
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            const bitcrushFilter = audioCtx.createBiquadFilter();

            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(50 + Math.random() * 500, audioCtx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(10, audioCtx.currentTime + dur);

            gain.gain.setValueAtTime(0, audioCtx.currentTime);
            gain.gain.linearRampToValueAtTime(0.05 + Math.random() * 0.05, audioCtx.currentTime + dur * 0.1);
            gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + dur);

            bitcrushFilter.type = 'highpass';
            bitcrushFilter.frequency.value = 1000;

            osc.connect(bitcrushFilter);
            bitcrushFilter.connect(gain);
            gain.connect(masterGain);

            osc.start();
            osc.stop(audioCtx.currentTime + dur);
        }
        setTimeout(createGlitch, Math.random() * 8000 + 4000);
    };
    createGlitch();
};

const initAudio = () => {
    if (audioCtx) return;
    try {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        masterGain = audioCtx.createGain();
        masterGain.gain.value = audioMuted ? 0 : 1;
        masterGain.connect(audioCtx.destination);
        startProceduralAudio();
    } catch (e) {
        console.warn('AudioContext failed:', e);
    }
};

const toggleAudio = () => {
    audioMuted = !audioMuted;
    if (audioCtx && masterGain) {
        if (audioMuted) {
            masterGain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.5);
        } else {
            masterGain.gain.linearRampToValueAtTime(1, audioCtx.currentTime + 0.5);
            if (audioCtx.state === 'suspended') {
                audioCtx.resume();
            }
        }
    }
    updateAudioToggleUI();
};

const updateAudioToggleUI = () => {
    const btn = document.getElementById('audio-toggle');
    if (!btn) return;
    btn.classList.toggle('is-muted', audioMuted);
    btn.setAttribute('aria-pressed', String(!audioMuted));
    btn.setAttribute('aria-label', audioMuted ? 'Unmute audio' : 'Mute audio');
    btn.title = audioMuted ? 'Unmute' : 'Mute';
};

updateAudioToggleUI();

const playHoverClick = () => {
    if (!audioCtx || audioMuted) return;
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(800, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.05);

    gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);

    osc.connect(gainNode);
    gainNode.connect(masterGain);

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
document.querySelectorAll('.btn:not(.audio-btn), .trait-pill, .footer-links a, .cd-block').forEach(el => {
    el.addEventListener('mouseenter', playHoverClick);
});

const handleApplyClick = (btn) => {
    if (btn.classList.contains('locked')) return;

    const originalText = btn.innerHTML;
    btn.classList.add('locked');

    const rejections = [
        '[ SCANNING VITALS... ]',
        '[ DECRYPTING WALLET... ]',
        '[ VERIFYING SCRAP LOGS... ]',
        '[ BYPASSING FIREWALL... ]',
        '[ CHECKING RADIATION LEVELS... ]',
        '[ ESTABLISHING TEMPO UPLINK... ]'
    ];
    const randomMsg = rejections[Math.floor(Math.random() * rejections.length)];

    btn.innerHTML = randomMsg;
    btn.style.borderColor = 'var(--cyan)';
    btn.style.color = 'var(--cyan)';

    const filter = document.getElementById('glitch-displacement');
    if (filter) {
        filter.setAttribute('scale', 16);
        document.body.style.filter = 'url(#crt-glitch)';
        setTimeout(() => {
            filter.setAttribute('scale', '0');
            document.body.style.filter = 'none';
        }, 90);
    }

    if (audioCtx && !audioMuted && masterGain) {
        // softer "error blip" (less harsh than the sawtooth drop)
        const osc = audioCtx.createOscillator();
        const filter = audioCtx.createBiquadFilter();
        const gain = audioCtx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(520, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(260, audioCtx.currentTime + 0.12);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1200, audioCtx.currentTime);
        filter.Q.value = 0.7;

        gain.gain.setValueAtTime(0.0, audioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(0.06, audioCtx.currentTime + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.14);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(masterGain);

        osc.start();
        osc.stop(audioCtx.currentTime + 0.15);
    }

    setTimeout(() => {
        btn.innerHTML = '[ CLEARANCE GRANTED ]';
        btn.style.borderColor = 'var(--green)';
        btn.style.color = 'var(--green)';

        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.classList.remove('locked');
            btn.style.borderColor = '';
            btn.style.color = '';
            openModal();
        }, 1000);
    }, 1800);
};

// ─── STEP ENGINE FOR ENLISTMENT MODAL ───
let currentStep = 1;
const totalSteps = 4;
let applyBootTimeouts = [];

const clearApplyBoot = () => {
    applyBootTimeouts.forEach((id) => clearTimeout(id));
    applyBootTimeouts = [];
};

const pushApplyLog = (message) => {
    const el = document.getElementById('apply-live-log');
    if (!el) return;
    const line = document.createElement('div');
    line.className = 'apply-log-line';
    const ts = new Date().toISOString().slice(11, 19);
    line.textContent = `[${ts}] ${message}`;
    el.appendChild(line);
    el.scrollTop = el.scrollHeight;
};

const playApplyStepCue = () => {
    if (!audioCtx || audioMuted || !masterGain) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(660, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(440, audioCtx.currentTime + 0.08);
    gain.gain.setValueAtTime(0, audioCtx.currentTime);
    gain.gain.linearRampToValueAtTime(0.045, audioCtx.currentTime + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);
    osc.connect(gain);
    gain.connect(masterGain);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.12);
};

const APPLY_PHASE_BANNER = {
    1: 'PHASE 01 — CALLSIGN',
    2: 'PHASE 02 — KEY REGISTRY',
    3: 'PHASE 03 — FACTION OATH',
    4: 'PHASE 04 — TRAUMA ARCHIVE',
};

const APPLY_UPLINK_STATE = {
    1: 'RECEIVING',
    2: 'VERIFY_KEYS',
    3: 'OATH_SEALED',
    4: 'TRANSMIT_ARMED',
};

const APPLY_STEP_LOG = {
    1: 'phase_01 :: callsign required',
    2: 'phase_02 :: wallet ingest',
    3: 'phase_03 :: faction oath',
    4: 'phase_04 :: trauma archive',
};

function showStep(step) {
    document.querySelectorAll('.form-step').forEach(el => {
        el.style.display = 'none';
        el.classList.remove('active');
    });
    const activeEl = document.querySelector(`.form-step[data-step="${step}"]`);
    activeEl.style.display = 'block';

    // Trigger reflow for boot-up animation
    void activeEl.offsetWidth;
    activeEl.classList.add('active');

    const stepCount = document.getElementById('step-count');
    if (stepCount) {
        stepCount.innerText = `${String(step).padStart(2, '0')} / ${String(totalSteps).padStart(2, '0')}`;
    }

    const banner = document.getElementById('apply-phase-banner');
    if (banner) banner.textContent = APPLY_PHASE_BANNER[step] || '';

    const uplink = document.getElementById('apply-uplink-state');
    if (uplink) uplink.textContent = APPLY_UPLINK_STATE[step] || 'OPEN';

    const rad = document.getElementById('apply-rad-fill');
    if (rad) rad.style.width = `${Math.min(92, 16 + step * 22)}%`;

    const fill = document.getElementById('apply-progress-fill');
    if (fill) fill.style.width = `${(step / totalSteps) * 100}%`;

    document.querySelectorAll('#apply-phases li').forEach((li) => {
        const m = parseInt(li.getAttribute('data-step-marker'), 10);
        li.classList.toggle('is-active', step === m);
        li.classList.toggle('is-done', step > m);
    });

    if (APPLY_STEP_LOG[step]) pushApplyLog(APPLY_STEP_LOG[step]);

    // Auto-focus: skip on touch phones — opening the keyboard shrinks the viewport and
    // shoves the modal off-screen. Users tap the field when ready (better mobile UX).
    const input = activeEl.querySelector('input, textarea');
    if (input && !isMobileLike) {
        setTimeout(() => input.focus(), 50);
    }

    // Typewriter effect for prompt
    const prompt = activeEl.querySelector('.step-prompt');
    if (prompt) {
        const text = prompt.getAttribute('data-text');
        prompt.innerHTML = '';
        let i = 0;
        const typeInterval = setInterval(() => {
            prompt.innerHTML += text.charAt(i);
            i++;
            if (i >= text.length) clearInterval(typeInterval);
        }, 18);
    }

    playApplyStepCue();
}

function nextStep() {
    // Validate current step
    const stepEl = document.querySelector(`.form-step[data-step="${currentStep}"]`);
    const inputs = stepEl.querySelectorAll('input:required, textarea:required');
    let valid = true;
    inputs.forEach(inp => {
        if (inp.type === 'radio') {
            const group = stepEl.querySelectorAll(`input[name="${inp.name}"]`);
            if (!Array.from(group).some(r => r.checked)) valid = false;
        } else if (!inp.value.trim()) {
            valid = false;
        }
    });

    if (!valid) {
        stepEl.classList.remove('form-step--shake');
        void stepEl.offsetWidth;
        stepEl.classList.add('form-step--shake');
        setTimeout(() => stepEl.classList.remove('form-step--shake'), 480);
        pushApplyLog('ERR :: field validation failed — complete required data');

        if (typeof audioCtx !== 'undefined' && !audioMuted && masterGain) {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.type = 'square';
            osc.frequency.setValueAtTime(120, audioCtx.currentTime);
            gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.18);
            osc.connect(gain);
            gain.connect(masterGain);
            osc.start();
            osc.stop(audioCtx.currentTime + 0.18);
        }
        return; // Halt progression
    }

    if (currentStep < totalSteps) {
        const shell = document.getElementById('modal-box');
        if (shell) {
            shell.classList.remove('apply-flash');
            void shell.offsetWidth;
            shell.classList.add('apply-flash');
        }
        pushApplyLog('handoff :: advancing phase');

        currentStep++;
        showStep(currentStep);
    }
}

// Global enter key to advance steps inside modal
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('enlist-form');
    if (form) {
        form.addEventListener('keydown', function (e) {
            // Check if user hit enter, not shift+enter if in textarea
            if (e.key === 'Enter' && !(e.target.tagName.toLowerCase() === 'textarea' && e.shiftKey)) {
                e.preventDefault();
                if (currentStep < totalSteps) {
                    nextStep();
                } else {
                    form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
                }
            }
        });
    }

    // Connect custom radio buttons visual
    document.querySelectorAll('.faction-option input').forEach(inp => {
        inp.addEventListener('change', (e) => {
            document.querySelectorAll('.f-box').forEach(box => box.innerText = '[ ]');
            const checkedBox = e.target.parentElement.querySelector('.f-box');
            if (checkedBox) checkedBox.innerText = '[X]';
        });
    });
});

// Open Modal Logic Updated
const openModal = () => {
    clearApplyBoot();
    currentStep = 1;
    const form = document.getElementById('enlist-form');
    form.reset();
    document.querySelectorAll('.f-box').forEach(box => box.innerText = '[ ]');

    const logEl = document.getElementById('apply-live-log');
    if (logEl) logEl.innerHTML = '';

    document.body.classList.add('modal-open');

    document.getElementById('apply-modal').style.display = 'flex';
    form.style.display = 'block';
    document.getElementById('success-state').style.display = 'none';

    const phaseBanner = document.getElementById('apply-phase-banner');
    if (phaseBanner) phaseBanner.style.display = '';

    showStep(currentStep);

    const shell = document.getElementById('modal-box');
    if (shell && isMobileLike) {
        shell.scrollTop = 0;
    }

    const uplinkEl = document.getElementById('apply-uplink-state');
    if (uplinkEl) uplinkEl.textContent = 'NEGOTIATING…';
    applyBootTimeouts.push(setTimeout(() => {
        const u = document.getElementById('apply-uplink-state');
        if (u) u.textContent = APPLY_UPLINK_STATE[currentStep] || 'OPEN';
    }, 480));

    const bootLines = [
        { delay: 60, msg: 'uplink_req :: enlistment v2' },
        { delay: 420, msg: 'handshake :: tempo-node ACK' },
        { delay: 780, msg: 'trace_buffer :: mounted (volatile)' },
        { delay: 1140, msg: 'awaiting operator input…' },
    ];
    bootLines.forEach(({ delay, msg }) => {
        applyBootTimeouts.push(setTimeout(() => pushApplyLog(msg), delay));
    });
};

const closeModal = () => {
    clearApplyBoot();
    const shell = document.getElementById('modal-box');
    if (shell) shell.classList.remove('apply-flash');
    document.body.classList.remove('modal-open');
    document.getElementById('apply-modal').style.display = 'none';
};

// Handle Form Submission to Netlify
document.getElementById('enlist-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Stop page reload

    const myForm = e.target;
    const formData = new FormData(myForm);

    // Send data to Netlify Forms invisibly
    fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString(),
    })
        .then(() => {
            pushApplyLog('tx :: packet sealed — awaiting timeline broadcast');
            const shell = document.getElementById('modal-box');
            if (shell) {
                shell.classList.remove('apply-flash');
                void shell.offsetWidth;
                shell.classList.add('apply-flash');
            }
            const u = document.getElementById('apply-uplink-state');
            if (u) u.textContent = 'QUEUED';
            // Hide form, show Twitter prompt
            myForm.style.display = 'none';
            const phaseBannerEl = document.getElementById('apply-phase-banner');
            if (phaseBannerEl) phaseBannerEl.style.display = 'none';
            document.getElementById('success-state').style.display = 'block';
        })
        .catch((error) => alert('TRANSMISSION FAILED: ' + error));
});

// Twitter Post Logic
document.getElementById('tweet-btn').addEventListener('click', (e) => {
    const btn = e.currentTarget;
    const tweetText = encodeURIComponent("The fiat burned, but I survived. Just enlisted for the @tempocalypse_ Wasteland. \n\nWe stay bearish. ☢️🐻\n\nApply here: https://tempocalypse.com");
    
    btn.innerHTML = '[ INITIATING API HANDSHAKE... ]';
    btn.style.pointerEvents = 'none';
    btn.style.borderColor = 'var(--amber)';
    btn.style.color = 'var(--amber)';

    setTimeout(() => {
        window.open(`https://twitter.com/intent/tweet?text=${tweetText}`, '_blank');
        
        btn.innerHTML = '[ AWAITING NETWORK VALIDATION... ]';
        btn.style.borderColor = 'var(--cyan)';
        btn.style.color = 'var(--cyan)';
        
        // Fake verifying they tweeted
        setTimeout(() => {
            btn.style.display = 'none';
            const successMsg = document.getElementById('final-validation-msg');
            if(successMsg) successMsg.style.display = 'block';
            
            // Audio success cue
            if (typeof audioCtx !== 'undefined' && !audioMuted && masterGain) {
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(400, audioCtx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(800, audioCtx.currentTime + 0.2);
                gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.3);
                osc.connect(gain);
                gain.connect(masterGain);
                osc.start();
                osc.stop(audioCtx.currentTime + 0.3);
            }
            
            setTimeout(closeModal, 4000);
        }, 10000);
    }, 800);
});

// ─── GLOBAL SVG GLITCH ───
setInterval(() => {
    // If the modal is open, suppress global glitch to prevent form distortion
    const modal = document.getElementById('apply-modal');
    if (modal && modal.style.display !== 'none' && modal.style.display !== '') return;
    if (prefersReducedMotion) return;

    const filter = document.getElementById('glitch-displacement');
    if (!filter) return;
    const scale = isMobileLike ? (Math.random() * 10 + 6) : (Math.random() * 20 + 10);
    filter.setAttribute('scale', scale);
    document.body.style.filter = 'url(#crt-glitch)';
    setTimeout(() => {
        filter.setAttribute('scale', '0');
        document.body.style.filter = 'none';
    }, (isMobileLike ? 80 : 100) + Math.random() * (isMobileLike ? 120 : 200));
}, (isMobileLike ? 9000 : 6000) + Math.random() * (isMobileLike ? 11000 : 8000));

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
    document.querySelectorAll('.btn:not(.audio-btn)').forEach(btn => {
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

