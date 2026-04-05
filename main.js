// ─── TYPEWRITER ───
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

        window.onload = () => setTimeout(typeWriter, 500);

        // ─── CLICK TO ENTER ───
        document.getElementById('loading-screen').addEventListener('click', function () {
            this.classList.add('fade-out');
            setTimeout(() => { this.style.display = 'none'; }, 420);
            document.body.style.backgroundColor = '#39ff14';
            setTimeout(() => { document.body.style.backgroundColor = ''; }, 100);
        });

        // ─── UPTIME COUNTER (from a fixed "death date") ───
        const deathDate = new Date('2022-11-08T00:00:00Z'); // FTX collapse lol
        function updateClock() {
            const now = new Date();
            const diff = now - deathDate;
            const days = Math.floor(diff / 86400000);
            const hours = Math.floor((diff % 86400000) / 3600000);
            const mins = Math.floor((diff % 3600000) / 60000);
            const secs = Math.floor((diff % 60000) / 1000);
            document.getElementById('cd-days').textContent = String(days).padStart(3, '0');
            document.getElementById('cd-hours').textContent = String(hours).padStart(2, '0');
            document.getElementById('cd-mins').textContent = String(mins).padStart(2, '0');
            document.getElementById('cd-secs').textContent = String(secs).padStart(2, '0');
        }
        updateClock();
        setInterval(updateClock, 1000);

        // ─── SCROLL REVEAL ───
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    // slight random flicker delay
                    const delay = Math.random() * 120;
                    setTimeout(() => e.target.classList.add('visible'), delay);
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.section-box').forEach(el => observer.observe(el));

        // ─── LIVE LOG APPENDER ───
        const logTypes = ['ok', 'warn', 'err'];
        const logMessages = [
            ['New block minted on Tempo chain', 'ok'],
            ['Radiation spike in Sector 12 — evacuate if alive', 'warn'],
            ['Bull signal: still null', 'err'],
            ['Scavenger 0x7Fa3 acquired Toxic Canteen', 'ok'],
            ['Market sentiment: deceased', 'err'],
            ['Doom scroll entry #88,224 committed', 'ok'],
            ['Power grid fluctuation detected', 'warn'],
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
            // keep log trimmed
            while (logEl.children.length > 14) logEl.removeChild(logEl.firstChild);
        }, 4000);

        // ─── PHOSPHOR CURSOR TRAIL ───
        const createTrail = (e) => {
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
        document.addEventListener('mousemove', createTrail);

        // ─── INTERACTIVE TRAIT PILLS ───
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
