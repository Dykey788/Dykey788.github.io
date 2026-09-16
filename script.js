// =============================================
// RAMO DE FLORES ANIMADO - Script Principal
// =============================================

document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    generateFlowers();
    generateFillers();
    scheduleFloatingPetals();
    initClickBurst();
});

// =============================================
// CONFIGURACIÓN DE FLORES
// =============================================
const FLOWER_CONFIG = [
    // Centro - Rosa grande
    {
        type: 'rose',
        x: 50, y: 48,
        size: 1.15,
        delay: 1.8,
        colors: { outer: '#e91e63', inner: '#f48fb1', center: '#ffcc02' }
    },
    // Izquierda superior - Peonia
    {
        type: 'peony',
        x: 30, y: 35,
        size: 1.0,
        delay: 2.0,
        colors: { outer: '#ba68c8', mid: '#ce93d8', inner: '#e1bee7', center: '#fdd835' }
    },
    // Derecha superior - Rosa
    {
        type: 'rose',
        x: 70, y: 38,
        size: 1.0,
        delay: 2.1,
        colors: { outer: '#c2185b', inner: '#f06292', center: '#ffe082' }
    },
    // Izquierda - Tulipán
    {
        type: 'tulip',
        x: 18, y: 52,
        size: 1.0,
        delay: 2.3,
        colors: { outer: '#ef5350', inner: '#ffcdd2', accent: '#e53935' }
    },
    // Derecha - Tulipán
    {
        type: 'tulip',
        x: 82, y: 50,
        size: 1.0,
        delay: 2.4,
        colors: { outer: '#ff7043', inner: '#ffccbc', accent: '#f4511e' }
    },
    // Superior centro - Rosa
    {
        type: 'rose',
        x: 48, y: 22,
        size: 0.9,
        delay: 2.2,
        colors: { outer: '#f8bbd0', inner: '#fce4ec', center: '#fff9c4' }
    },
    // Izquierda media - Rosa
    {
        type: 'rose',
        x: 22, y: 30,
        size: 0.85,
        delay: 2.5,
        colors: { outer: '#ef9a9a', inner: '#ffcdd2', center: '#fff176' }
    },
    // Derecha media - Peonia
    {
        type: 'peony',
        x: 78, y: 28,
        size: 0.85,
        delay: 2.6,
        colors: { outer: '#9575cd', mid: '#b39ddb', inner: '#d1c4e9', center: '#fdd835' }
    },
    // Superior izquierda
    {
        type: 'tulip',
        x: 35, y: 15,
        size: 0.8,
        delay: 2.7,
        colors: { outer: '#e91e63', inner: '#f48fb1', accent: '#c2185b' }
    },
    // Superior derecha
    {
        type: 'tulip',
        x: 65, y: 18,
        size: 0.8,
        delay: 2.8,
        colors: { outer: '#ab47bc', inner: '#e1bee7', accent: '#8e24aa' }
    },
    // Centro inferior
    {
        type: 'rose',
        x: 50, y: 65,
        size: 0.9,
        delay: 2.35,
        colors: { outer: '#d81b60', inner: '#f48fb1', center: '#ffcc02' }
    },
    // Relleno izquierda inferior
    {
        type: 'rose',
        x: 35, y: 60,
        size: 0.75,
        delay: 2.55,
        colors: { outer: '#ff80ab', inner: '#fce4ec', center: '#ffe082' }
    },
    // Relleno derecha inferior
    {
        type: 'rose',
        x: 68, y: 58,
        size: 0.75,
        delay: 2.65,
        colors: { outer: '#f06292', inner: '#fce4ec', center: '#fff9c4' }
    }
];

const FILLER_POSITIONS = [
    { x: 40, y: 20, delay: 2.9 },
    { x: 60, y: 15, delay: 3.0 },
    { x: 15, y: 42, delay: 3.1 },
    { x: 85, y: 40, delay: 3.1 },
    { x: 25, y: 55, delay: 3.2 },
    { x: 75, y: 55, delay: 3.2 },
    { x: 45, y: 10, delay: 3.0 },
    { x: 55, y: 12, delay: 3.0 },
    { x: 12, y: 48, delay: 3.15 },
    { x: 88, y: 46, delay: 3.15 },
    { x: 30, y: 68, delay: 3.25 },
    { x: 72, y: 66, delay: 3.25 },
    { x: 50, y: 75, delay: 3.3 },
    { x: 38, y: 42, delay: 3.05 },
    { x: 62, y: 44, delay: 3.05 },
];

// =============================================
// GENERACIÓN DE FLORES
// =============================================
function generateFlowers() {
    const container = document.getElementById('flowersContainer');

    FLOWER_CONFIG.forEach((config, i) => {
        let flowerEl;

        switch (config.type) {
            case 'rose':
                flowerEl = createRose(config);
                break;
            case 'peony':
                flowerEl = createPeony(config);
                break;
            case 'tulip':
                flowerEl = createTulip(config);
                break;
        }

        // Position
        flowerEl.style.left = `${config.x}%`;
        flowerEl.style.top = `${config.y}%`;
        flowerEl.style.transform = `translate(-50%, -50%) scale(0)`;
        flowerEl.style.animationDelay = `${config.delay}s`;
        flowerEl.style.animation = `bloomFlower 1s cubic-bezier(0.34, 1.56, 0.64, 1) ${config.delay}s forwards`;

        // Add sway after bloom
        const swayDelay = config.delay + 1.2;
        setTimeout(() => {
            flowerEl.classList.add('sway');
            flowerEl.style.animationDuration = `${3.5 + Math.random() * 2}s`;
        }, swayDelay * 1000);

        container.appendChild(flowerEl);
    });
}

function createRose(config) {
    const flower = document.createElement('div');
    flower.className = 'flower flower-rose';
    flower.style.setProperty('--scale', config.size);
    flower.style.width = `${60 * config.size}px`;
    flower.style.height = `${60 * config.size}px`;

    // Outer petals
    const outerLayer = document.createElement('div');
    outerLayer.className = 'petal-layer';
    for (let i = 0; i < 6; i++) {
        const petal = document.createElement('div');
        petal.className = 'petal petal-outer';
        petal.style.background = `linear-gradient(${i * 60}deg, ${config.colors.outer}, ${adjustColor(config.colors.outer, 20)})`;
        const angle = i * 60;
        const radius = 15 * config.size;
        const cx = 30 * config.size;
        const cy = 30 * config.size;
        petal.style.width = `${28 * config.size}px`;
        petal.style.height = `${30 * config.size}px`;
        petal.style.left = `${cx + Math.cos(degToRad(angle - 90)) * radius - 14 * config.size}px`;
        petal.style.top = `${cy + Math.sin(degToRad(angle - 90)) * radius - 15 * config.size}px`;
        petal.style.transform = `rotate(${angle}deg)`;
        petal.style.borderRadius = '50% 50% 50% 50% / 60% 60% 40% 40%';
        outerLayer.appendChild(petal);
    }
    flower.appendChild(outerLayer);

    // Inner petals
    const innerLayer = document.createElement('div');
    innerLayer.className = 'petal-layer';
    for (let i = 0; i < 5; i++) {
        const petal = document.createElement('div');
        petal.className = 'petal petal-inner';
        petal.style.background = `linear-gradient(${i * 72 + 36}deg, ${config.colors.inner}, ${adjustColor(config.colors.inner, 10)})`;
        const angle = i * 72 + 36;
        const radius = 8 * config.size;
        const cx = 30 * config.size;
        const cy = 30 * config.size;
        petal.style.width = `${20 * config.size}px`;
        petal.style.height = `${22 * config.size}px`;
        petal.style.left = `${cx + Math.cos(degToRad(angle - 90)) * radius - 10 * config.size}px`;
        petal.style.top = `${cy + Math.sin(degToRad(angle - 90)) * radius - 11 * config.size}px`;
        petal.style.transform = `rotate(${angle}deg)`;
        petal.style.borderRadius = '50% 50% 50% 50% / 60% 60% 40% 40%';
        innerLayer.appendChild(petal);
    }
    flower.appendChild(innerLayer);

    // Center
    const center = document.createElement('div');
    center.className = 'flower-center';
    center.style.width = `${14 * config.size}px`;
    center.style.height = `${14 * config.size}px`;
    center.style.background = `radial-gradient(circle, #fff5c0, ${config.colors.center})`;
    center.style.borderRadius = '50%';
    center.style.position = 'absolute';
    center.style.top = '50%';
    center.style.left = '50%';
    center.style.transform = 'translate(-50%, -50%)';
    center.style.zIndex = '3';
    center.style.boxShadow = `0 0 8px rgba(255, 204, 2, 0.4)`;
    flower.appendChild(center);

    return flower;
}

function createPeony(config) {
    const flower = document.createElement('div');
    flower.className = 'flower flower-peony';
    flower.style.width = `${70 * config.size}px`;
    flower.style.height = `${70 * config.size}px`;

    const rings = [
        { count: 8, radius: 22, petalW: 32, petalH: 28, colorKey: 'outer' },
        { count: 6, radius: 14, petalW: 24, petalH: 22, colorKey: 'mid' },
        { count: 4, radius: 6, petalW: 18, petalH: 18, colorKey: 'inner' },
    ];

    rings.forEach(ring => {
        const layer = document.createElement('div');
        layer.className = 'petal-layer';
        layer.style.position = 'absolute';
        layer.style.width = '100%';
        layer.style.height = '100%';

        for (let i = 0; i < ring.count; i++) {
            const petal = document.createElement('div');
            petal.className = 'petal';
            const angle = (360 / ring.count) * i;
            const cx = 35 * config.size;
            const cy = 35 * config.size;
            const r = ring.radius * config.size;
            const w = ring.petalW * config.size;
            const h = ring.petalH * config.size;

            petal.style.width = `${w}px`;
            petal.style.height = `${h}px`;
            petal.style.left = `${cx + Math.cos(degToRad(angle - 90)) * r - w / 2}px`;
            petal.style.top = `${cy + Math.sin(degToRad(angle - 90)) * r - h / 2}px`;
            petal.style.transform = `rotate(${angle}deg)`;
            petal.style.background = `radial-gradient(ellipse at 50% 30%, ${adjustColor(config.colors[ring.colorKey], 15)}, ${config.colors[ring.colorKey]})`;
            petal.style.borderRadius = '50%';
            petal.style.position = 'absolute';

            layer.appendChild(petal);
        }

        flower.appendChild(layer);
    });

    // Center
    const center = document.createElement('div');
    center.className = 'flower-center';
    center.style.width = `${16 * config.size}px`;
    center.style.height = `${16 * config.size}px`;
    center.style.background = `radial-gradient(circle, #fff9c4, ${config.colors.center})`;
    center.style.borderRadius = '50%';
    center.style.position = 'absolute';
    center.style.top = '50%';
    center.style.left = '50%';
    center.style.transform = 'translate(-50%, -50%)';
    center.style.zIndex = '3';
    flower.appendChild(center);

    return flower;
}

function createTulip(config) {
    const flower = document.createElement('div');
    flower.className = 'flower flower-tulip';
    flower.style.width = `${36 * config.size}px`;
    flower.style.height = `${50 * config.size}px`;

    const petals = [
        { w: 22, h: 44, rotate: -10, color: config.colors.outer, z: 1 },
        { w: 22, h: 44, rotate: 10, color: config.colors.outer, z: 1 },
        { w: 18, h: 40, rotate: 0, color: config.colors.accent, z: 2 },
    ];

    petals.forEach(p => {
        const petal = document.createElement('div');
        petal.className = 'petal';
        petal.style.width = `${p.w * config.size}px`;
        petal.style.height = `${p.h * config.size}px`;
        petal.style.bottom = '0';
        petal.style.left = '50%';
        petal.style.transform = `translateX(-50%) rotate(${p.rotate}deg)`;
        petal.style.transformOrigin = 'center bottom';
        petal.style.background = `linear-gradient(to top, ${p.color}, ${config.colors.inner})`;
        petal.style.borderRadius = '50% 50% 10% 10% / 70% 70% 30% 30%';
        petal.style.position = 'absolute';
        petal.style.zIndex = p.z;
        flower.appendChild(petal);
    });

    return flower;
}

// =============================================
// FILLER FLOWERS (BABY'S BREATH)
// =============================================
function generateFillers() {
    const container = document.getElementById('fillerContainer');

    FILLER_POSITIONS.forEach(pos => {
        const cluster = document.createElement('div');
        cluster.className = 'filler-flower';
        cluster.style.left = `${pos.x}%`;
        cluster.style.top = `${pos.y}%`;
        cluster.style.transform = 'translate(-50%, -50%) scale(0)';
        cluster.style.animation = `bloomFiller 0.8s ease-out ${pos.delay}s forwards`;

        // Create a small cluster of 3-4 dots
        const dotCount = 3 + Math.floor(Math.random() * 2);
        for (let i = 0; i < dotCount; i++) {
            const dot = document.createElement('div');
            dot.className = 'filler-dot';
            const offsetX = (Math.random() - 0.5) * 14;
            const offsetY = (Math.random() - 0.5) * 14;
            dot.style.position = 'absolute';
            dot.style.left = `${offsetX}px`;
            dot.style.top = `${offsetY}px`;
            const s = 6 + Math.random() * 5;
            dot.style.width = `${s}px`;
            dot.style.height = `${s}px`;
            cluster.appendChild(dot);
        }

        container.appendChild(cluster);
    });
}

// =============================================
// CLICK / TAP BURST EFFECT
// =============================================
function initClickBurst() {
    const body = document.body;

    // Mouse click
    body.addEventListener('click', (e) => {
        createBurst(e.clientX, e.clientY);
    });

    // Touch support
    body.addEventListener('touchstart', (e) => {
        for (let i = 0; i < e.touches.length; i++) {
            createBurst(e.touches[i].clientX, e.touches[i].clientY);
        }
    }, { passive: true });

    // Hide hint after first click
    let hintHidden = false;
    const hideHint = () => {
        if (!hintHidden) {
            hintHidden = true;
            const hint = document.getElementById('clickHint');
            if (hint) {
                hint.style.transition = 'opacity 0.5s';
                hint.style.opacity = '0';
                setTimeout(() => hint.remove(), 600);
            }
        }
    };
    body.addEventListener('click', hideHint, { once: true });
    body.addEventListener('touchstart', hideHint, { once: true });
}

function createBurst(x, y) {
    const layer = document.getElementById('clickBurstLayer');

    // --- Ring flash ---
    const ring = document.createElement('div');
    ring.className = 'burst-ring';
    ring.style.left = `${x - 60}px`;
    ring.style.top = `${y - 60}px`;
    layer.appendChild(ring);
    setTimeout(() => ring.remove(), 750);

    // --- Petals burst ---
    const petalCount = 10 + Math.floor(Math.random() * 6);
    const petalColors = [
        '#f48fb1', '#e1bee7', '#ffcdd2', '#f8bbd0', '#ce93d8',
        '#ef9a9a', '#ff80ab', '#f06292', '#ba68c8', '#e91e63',
        '#ffab91', '#b39ddb', '#fff176', '#fce4ec'
    ];

    for (let i = 0; i < petalCount; i++) {
        const petal = document.createElement('div');
        petal.className = 'burst-petal';

        const color = petalColors[Math.floor(Math.random() * petalColors.length)];
        const size = 8 + Math.random() * 14;
        const angle = (Math.PI * 2 / petalCount) * i + (Math.random() - 0.5) * 0.5;
        const distance = 60 + Math.random() * 120;
        const duration = 800 + Math.random() * 700;
        const rotation = (Math.random() - 0.5) * 720;
        const gravity = 40 + Math.random() * 80;

        petal.style.width = `${size}px`;
        petal.style.height = `${size * 1.3}px`;
        petal.style.background = `linear-gradient(135deg, ${color}, ${adjustColor(color, -25)})`;
        petal.style.left = `${x}px`;
        petal.style.top = `${y}px`;
        petal.style.boxShadow = `0 0 6px ${color}55`;

        layer.appendChild(petal);

        // Animate with JS for physics-based movement
        const startTime = performance.now();
        const vx = Math.cos(angle) * distance;
        const vy = Math.sin(angle) * distance - 30; // slight upward bias

        function animatePetal(now) {
            const elapsed = now - startTime;
            const progress = elapsed / duration;

            if (progress >= 1) {
                petal.remove();
                return;
            }

            const eased = 1 - Math.pow(1 - progress, 3);
            const px = x + vx * eased;
            const py = y + vy * eased + gravity * progress * progress;
            const rot = rotation * eased;
            const opacity = 1 - progress * progress;
            const scale = 1 - progress * 0.3;

            petal.style.transform = `translate(-50%, -50%) translate(${px - x}px, ${py - y}px) rotate(${rot}deg) scale(${scale})`;
            petal.style.opacity = opacity;

            requestAnimationFrame(animatePetal);
        }

        requestAnimationFrame(animatePetal);
    }

    // --- Sparkles ---
    const sparkleCount = 8 + Math.floor(Math.random() * 5);
    for (let i = 0; i < sparkleCount; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'burst-sparkle';

        const size = 3 + Math.random() * 5;
        const angle = Math.random() * Math.PI * 2;
        const distance = 40 + Math.random() * 100;
        const duration = 500 + Math.random() * 500;
        const sparkleColors = ['#fff', '#ffd54f', '#ffcc02', '#f8e8d0', '#f48fb1'];
        const color = sparkleColors[Math.floor(Math.random() * sparkleColors.length)];

        sparkle.style.width = `${size}px`;
        sparkle.style.height = `${size}px`;
        sparkle.style.background = `radial-gradient(circle, ${color}, ${color}88)`;
        sparkle.style.left = `${x}px`;
        sparkle.style.top = `${y}px`;
        sparkle.style.boxShadow = `0 0 ${size * 2}px ${color}`;

        layer.appendChild(sparkle);

        const startTime = performance.now();
        const vx = Math.cos(angle) * distance;
        const vy = Math.sin(angle) * distance;

        function animateSparkle(now) {
            const elapsed = now - startTime;
            const progress = elapsed / duration;

            if (progress >= 1) {
                sparkle.remove();
                return;
            }

            const eased = 1 - Math.pow(1 - progress, 2);
            const px = vx * eased;
            const py = vy * eased;
            const opacity = 1 - progress;
            const scale = 1 - progress * 0.5;

            sparkle.style.transform = `translate(-50%, -50%) translate(${px}px, ${py}px) scale(${scale})`;
            sparkle.style.opacity = opacity;

            requestAnimationFrame(animateSparkle);
        }

        requestAnimationFrame(animateSparkle);
    }

    // --- Mini flowers (2-4 per click) ---
    const miniFlowerCount = 2 + Math.floor(Math.random() * 3);
    for (let i = 0; i < miniFlowerCount; i++) {
        const miniFlower = document.createElement('div');
        miniFlower.className = 'burst-mini-flower';

        const flowerSize = 18 + Math.random() * 14;
        const petalColorSets = [
            { petals: '#f48fb1', center: '#fdd835' },
            { petals: '#ce93d8', center: '#fff9c4' },
            { petals: '#ef9a9a', center: '#ffcc02' },
            { petals: '#ff80ab', center: '#ffe082' },
            { petals: '#b39ddb', center: '#fdd835' },
            { petals: '#ffab91', center: '#fff176' },
        ];
        const colorSet = petalColorSets[Math.floor(Math.random() * petalColorSets.length)];

        miniFlower.style.width = `${flowerSize}px`;
        miniFlower.style.height = `${flowerSize}px`;
        miniFlower.style.left = `${x}px`;
        miniFlower.style.top = `${y}px`;

        // Create mini petals
        const miniPetalCount = 5 + Math.floor(Math.random() * 2);
        for (let p = 0; p < miniPetalCount; p++) {
            const mp = document.createElement('div');
            mp.className = 'mini-petal';
            const pa = (360 / miniPetalCount) * p;
            const pr = flowerSize * 0.25;
            const pw = flowerSize * 0.42;
            const ph = flowerSize * 0.38;
            const cx = flowerSize / 2;
            const cy = flowerSize / 2;

            mp.style.width = `${pw}px`;
            mp.style.height = `${ph}px`;
            mp.style.left = `${cx + Math.cos(degToRad(pa - 90)) * pr - pw / 2}px`;
            mp.style.top = `${cy + Math.sin(degToRad(pa - 90)) * pr - ph / 2}px`;
            mp.style.transform = `rotate(${pa}deg)`;
            mp.style.background = `radial-gradient(ellipse at 50% 30%, ${adjustColor(colorSet.petals, 20)}, ${colorSet.petals})`;

            miniFlower.appendChild(mp);
        }

        // Center
        const mc = document.createElement('div');
        mc.className = 'mini-center';
        mc.style.width = `${flowerSize * 0.28}px`;
        mc.style.height = `${flowerSize * 0.28}px`;
        mc.style.background = `radial-gradient(circle, #fff9c4, ${colorSet.center})`;
        miniFlower.appendChild(mc);

        layer.appendChild(miniFlower);

        // Animate mini flower
        const angle = Math.random() * Math.PI * 2;
        const dist = 80 + Math.random() * 100;
        const dur = 1200 + Math.random() * 600;
        const rot = (Math.random() - 0.5) * 360;
        const grav = 60 + Math.random() * 40;
        const startTime = performance.now();

        const vx = Math.cos(angle) * dist;
        const vy = Math.sin(angle) * dist - 50;

        function animateMiniFlower(now) {
            const elapsed = now - startTime;
            const progress = elapsed / dur;

            if (progress >= 1) {
                miniFlower.remove();
                return;
            }

            const eased = 1 - Math.pow(1 - progress, 2.5);
            const px = vx * eased;
            const py = vy * eased + grav * progress * progress;
            const r = rot * eased;
            const opacity = progress < 0.7 ? 1 : 1 - (progress - 0.7) / 0.3;
            const scale = progress < 0.3 ? 0.5 + progress * 1.7 : 1 - (progress - 0.3) * 0.6;

            miniFlower.style.transform = `translate(-50%, -50%) translate(${px}px, ${py}px) rotate(${r}deg) scale(${Math.max(0, scale)})`;
            miniFlower.style.opacity = Math.max(0, opacity);
            miniFlower.style.filter = `drop-shadow(0 2px 6px rgba(0,0,0,0.2))`;

            requestAnimationFrame(animateMiniFlower);
        }

        requestAnimationFrame(animateMiniFlower);
    }
}

// =============================================
// FLOATING PETALS (continuous effect)
// =============================================
function scheduleFloatingPetals() {
    // Start after bouquet is bloomed
    setTimeout(() => {
        createFloatingPetal();
        setInterval(createFloatingPetal, 2500);
    }, 4500);
}

function createFloatingPetal() {
    const petal = document.createElement('div');
    petal.className = 'floating-petal';

    const colors = ['#f48fb1', '#e1bee7', '#ffcdd2', '#f8bbd0', '#ce93d8', '#ef9a9a', '#ff80ab'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    petal.style.background = `linear-gradient(135deg, ${color}, ${adjustColor(color, -20)})`;

    const startX = window.innerWidth * 0.3 + Math.random() * window.innerWidth * 0.4;
    const startY = window.innerHeight * 0.4 + Math.random() * window.innerHeight * 0.2;
    petal.style.left = `${startX}px`;
    petal.style.top = `${startY}px`;

    const drift = (Math.random() - 0.5) * 100;
    const spin = 90 + Math.random() * 270;
    const duration = 3 + Math.random() * 3;
    petal.style.setProperty('--drift', `${drift}px`);
    petal.style.setProperty('--spin', `${spin}deg`);
    petal.style.setProperty('--duration', `${duration}s`);

    const size = 10 + Math.random() * 8;
    petal.style.width = `${size}px`;
    petal.style.height = `${size * 1.3}px`;

    document.body.appendChild(petal);

    setTimeout(() => {
        petal.remove();
    }, duration * 1000 + 100);
}

// =============================================
// PARTICLE BACKGROUND
// =============================================
function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');

    let width, height;
    const particles = [];
    const particleCount = window.innerWidth < 480 ? 30 : 60;

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    resize();
    window.addEventListener('resize', resize);

    // Create particles
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3 - 0.15,
            size: 1 + Math.random() * 2.5,
            alpha: 0.15 + Math.random() * 0.35,
            color: getRandomParticleColor(),
            pulse: Math.random() * Math.PI * 2,
            pulseSpeed: 0.01 + Math.random() * 0.02
        });
    }

    function getRandomParticleColor() {
        const colors = [
            '233, 30, 99',   // pink
            '186, 104, 200', // purple
            '239, 83, 80',   // red
            '255, 183, 77',  // gold
            '255, 255, 255', // white
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.pulse += p.pulseSpeed;

            // Wrap around
            if (p.x < -10) p.x = width + 10;
            if (p.x > width + 10) p.x = -10;
            if (p.y < -10) p.y = height + 10;
            if (p.y > height + 10) p.y = -10;

            const pulseAlpha = p.alpha + Math.sin(p.pulse) * 0.15;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${p.color}, ${Math.max(0, pulseAlpha)})`;
            ctx.fill();

            // Glow
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${p.color}, ${Math.max(0, pulseAlpha * 0.15)})`;
            ctx.fill();
        });

        requestAnimationFrame(animate);
    }

    animate();
}

// =============================================
// UTILITY FUNCTIONS
// =============================================
function degToRad(deg) {
    return deg * (Math.PI / 180);
}

function adjustColor(hex, amount) {
    hex = hex.replace('#', '');
    const r = Math.min(255, Math.max(0, parseInt(hex.substring(0, 2), 16) + amount));
    const g = Math.min(255, Math.max(0, parseInt(hex.substring(2, 4), 16) + amount));
    const b = Math.min(255, Math.max(0, parseInt(hex.substring(4, 6), 16) + amount));
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}
