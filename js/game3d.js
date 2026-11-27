/**
 * HD 3D Endless Runner Engine - Subway Surfers Edu: SMK Produktif Edition (v2 HD & Pit Stop)
 * Fitur Utama:
 * - Desain 3D Organik & Halus (Bukan kotak-kotak kaku): Karakter kapsul ber-sendi (lutut, siku, wajah, sepatu),
 *   Kereta Cepat Aerodinamis (MRT Bullet Train) dengan tekstur HD Canvas, pohon kota, awan 3D lembut, & langit gradien.
 * - TIANG PIT STOP KUIS (Grand Archway Gate): Terlihat dari kejauhan dengan papan LED HD "PIT STOP KUIS",
 *   lengkap dengan Radar Jarak (misal: 70m -> 0m) dan efek pengereman halus (Slow-Motion Braking) sebelum kuis muncul
 *   agar pemain tidak kaget!
 * - Transisi Lanjut Lari Halus (Smooth Acceleration) setelah selesai menjawab kuis.
 */

const CHARACTER_SKINS = [
  {
    id: 'raka',
    name: 'Raka Anak TKJ',
    role: 'Network Engineer',
    price: 0,
    shirtColor: 0xf59e0b,
    jacketAccent: '#fde047',
    pantsColor: 0x1e3a8a,
    skinColor: 0xf6c89f,
    capColor: 0x2563eb,
    shoeColor: 0xef4444
  },
  {
    id: 'sinta',
    name: 'Sinta Coder RPL',
    role: 'Fullstack Developer',
    price: 350,
    shirtColor: 0xec4899,
    jacketAccent: '#f9a8d4',
    pantsColor: 0x1f2937,
    skinColor: 0xfce0c5,
    capColor: 0x8b5cf6,
    shoeColor: 0x06b6d4
  },
  {
    id: 'ninja',
    name: 'Cyber Ninja',
    role: 'Ethical Hacker',
    price: 700,
    shirtColor: 0x111827,
    jacketAccent: '#10b981',
    pantsColor: 0x0f172a,
    skinColor: 0x34d399,
    capColor: 0x059669,
    shoeColor: 0x22c55e
  },
  {
    id: 'robobot',
    name: 'Robo-Bot AI',
    role: 'Autonomous Android',
    price: 1200,
    shirtColor: 0x38bdf8,
    jacketAccent: '#e0f2fe',
    pantsColor: 0x475569,
    skinColor: 0xe2e8f0,
    capColor: 0x0284c7,
    shoeColor: 0xfacc15
  },
  {
    id: 'sultan',
    name: 'Sultan Emas 24K',
    role: 'IT Startup Founder',
    price: 2000,
    shirtColor: 0xfbbf24,
    jacketAccent: '#fef08a',
    pantsColor: 0x78350f,
    skinColor: 0xfde68a,
    capColor: 0xd97706,
    shoeColor: 0xffffff
  }
];

const HOVERBOARD_SKINS = [
  { id: 'neon', name: 'Neon Wave Surfer', price: 0, mainColor: 0x06b6d4, glowColor: 0xec4899 },
  { id: 'circuit', name: 'PCB Motherboard', price: 400, mainColor: 0x16a34a, glowColor: 0xfacc15 },
  { id: 'fire', name: 'Blaze Aero Turbo', price: 800, mainColor: 0xef4444, glowColor: 0xf97316 },
  { id: 'quantum', name: 'Quantum Galaxy', price: 1500, mainColor: 0x7c3aed, glowColor: 0x38bdf8 }
];

window.CHARACTER_SKINS = CHARACTER_SKINS;
window.HOVERBOARD_SKINS = HOVERBOARD_SKINS;

/**
 * Generator Tekstur HD Prosedural menggunakan HTML5 Canvas
 * Membuat tampilan kereta, gedung, papan Pit Stop, dan karakter tampak tajam & HD tanpa gambar eksternal.
 */
class HDTextureFactory {
  static createTrainSideTexture(mainHex, stripeHex, labelText = 'SMK BUDI AGUNG EXPRESS') {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    // Gradasi bodi metalik
    const grad = ctx.createLinearGradient(0, 0, 0, 256);
    grad.addColorStop(0, '#f8fafc');
    grad.addColorStop(0.18, mainHex);
    grad.addColorStop(0.82, mainHex);
    grad.addColorStop(1, '#0f172a');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1024, 256);

    // Sabuk garis aerodinamis
    ctx.fillStyle = stripeHex;
    ctx.fillRect(0, 148, 1024, 26);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 142, 1024, 6);

    // Deretan jendela kaca penumpang dengan sudut membulat (rounded)
    for (let x = 45; x < 960; x += 130) {
      // Pintu geser setiap 3 segmen
      const isDoor = ((x - 45) / 130) % 3 === 1;
      ctx.fillStyle = isDoor ? 'rgba(15, 23, 42, 0.35)' : 'rgba(255,255,255,0.12)';
      if (isDoor) {
        this.roundRect(ctx, x - 6, 32, 104, 188, 14, true);
      }

      // Kaca jendela
      const winGrad = ctx.createLinearGradient(x, 42, x + 90, 132);
      winGrad.addColorStop(0, '#bae6fd');
      winGrad.addColorStop(0.5, '#38bdf8');
      winGrad.addColorStop(1, '#0284c7');
      ctx.fillStyle = winGrad;
      this.roundRect(ctx, x, 44, 92, 86, 16, true);

      // Pantulan cahaya kaca
      ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
      ctx.beginPath();
      ctx.moveTo(x + 14, 48);
      ctx.lineTo(x + 38, 48);
      ctx.lineTo(x + 18, 124);
      ctx.lineTo(x + 6, 124);
      ctx.closePath();
      ctx.fill();
    }

    // Tulisan ekspres di bodi kereta
    ctx.fillStyle = '#ffffff';
    ctx.font = '900 22px "Segoe UI", sans-serif';
    ctx.fillText(labelText, 55, 208);
    ctx.fillText(labelText, 575, 208);

    const tex = new THREE.CanvasTexture(canvas);
    tex.anisotropy = 4;
    return tex;
  }

  static createPitStopBannerTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    // Latar belakang papan LED futuristik
    const bg = ctx.createLinearGradient(0, 0, 1024, 256);
    bg.addColorStop(0, '#1e1b4b');
    bg.addColorStop(0.5, '#3b0764');
    bg.addColorStop(1, '#1e1b4b');
    ctx.fillStyle = bg;
    this.roundRect(ctx, 8, 8, 1008, 240, 36, true);

    // Motif bendera balap (checkered flag) di sisi kiri & kanan
    const sq = 24;
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 3; c++) {
        ctx.fillStyle = (r + c) % 2 === 0 ? '#facc15' : '#0f172a';
        ctx.fillRect(28 + c * sq, 32 + r * sq, sq, sq);
        ctx.fillRect(924 + c * sq, 32 + r * sq, sq, sq);
      }
    }

    // Bingkai neon bercahaya
    ctx.lineWidth = 10;
    ctx.strokeStyle = '#38bdf8';
    this.roundRect(ctx, 14, 14, 996, 228, 32, false, true);

    // Teks utama PIT STOP KUIS
    ctx.textAlign = 'center';
    ctx.fillStyle = '#fde047';
    ctx.shadowColor = '#f59e0b';
    ctx.shadowBlur = 18;
    ctx.font = '900 72px "Segoe UI", sans-serif';
    ctx.fillText('🏁 PIT STOP KUIS 🏁', 512, 122);

    // Sub-teks
    ctx.shadowBlur = 0;
    ctx.fillStyle = '#e0f2fe';
    ctx.font = '800 34px "Segoe UI", sans-serif';
    ctx.fillText('ZONA UJI KOMPETENSI SMK • BONUS KOIN & POWER-UP', 512, 188);

    const tex = new THREE.CanvasTexture(canvas);
    tex.anisotropy = 4;
    return tex;
  }

  static createBuildingFacadeTexture(baseHex, accentHex, signText) {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');

    const grad = ctx.createLinearGradient(0, 0, 0, 1024);
    grad.addColorStop(0, baseHex);
    grad.addColorStop(1, '#0f172a');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 1024);

    // Papan reklame neon di puncak gedung
    if (signText) {
      ctx.fillStyle = '#090d16';
      this.roundRect(ctx, 36, 40, 440, 110, 20, true);
      ctx.lineWidth = 6;
      ctx.strokeStyle = accentHex;
      this.roundRect(ctx, 36, 40, 440, 110, 20, false, true);

      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.font = '900 34px "Segoe UI", sans-serif';
      ctx.fillText(signText, 256, 106);
    }

    // Jendela gedung modern dengan sudut membulat
    for (let y = 185; y < 950; y += 78) {
      for (let x = 44; x < 440; x += 108) {
        const lit = Math.random() > 0.22;
        ctx.fillStyle = lit ? 'rgba(254, 240, 138, 0.88)' : 'rgba(30, 41, 59, 0.7)';
        this.roundRect(ctx, x, y, 78, 52, 10, true);
      }
    }

    return new THREE.CanvasTexture(canvas);
  }

  static createTrackBallastTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#334155';
    ctx.fillRect(0, 0, 512, 512);

    // Tekstur batu kerikil rel halus
    const colors = ['#475569', '#1e293b', '#64748b', '#3b4252'];
    for (let i = 0; i < 1600; i++) {
      ctx.fillStyle = colors[i % colors.length];
      const rx = Math.random() * 512;
      const ry = Math.random() * 512;
      const rw = 3 + Math.random() * 6;
      ctx.beginPath();
      ctx.arc(rx, ry, rw, 0, Math.PI * 2);
      ctx.fill();
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(3, 45);
    return tex;
  }

  static roundRect(ctx, x, y, w, h, r, fill = true, stroke = false) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
    if (fill) ctx.fill();
    if (stroke) ctx.stroke();
  }
}

class SubwayGame3D {
  constructor(containerId, callbacks = {}) {
    this.container = document.getElementById(containerId);
    this.callbacks = callbacks;

    this.LANES = [-3.4, 0, 3.4];
    this.currentLane = 1;
    this.targetX = 0;

    // Status permainan
    this.state = 'MENU'; // MENU, RUNNING, PAUSED, QUIZ, COUNTDOWN, GAMEOVER
    this.score = 0;
    this.coins = 0;
    this.distance = 0;
    this.baseSpeed = 24;
    this.speed = 24;
    this.maxSpeed = 46;
    this.baseMultiplier = 1;

    // Faktor perlambatan halus saat mendekati Tiang Pit Stop atau baru selesai kuis
    this.speedScale = 1.0;

    // Jadwal jarak Tiang Pit Stop Kuis berikutnya (setiap ~160m)
    this.nextPitStopDist = 140;
    this.pitStopInterval = 175;
    this.activePitStop = null;

    // Statistik Kuis dalam 1 sesi lari
    this.quizCorrect = 0;
    this.quizTotal = 0;
    this.reviveCount = 0;
    this.maxRevives = 3;

    // Fisika Karakter
    this.playerY = 0;
    this.groundY = 0;
    this.velocityY = 0;
    this.gravity = -56;
    this.jumpForce = 19.8;
    this.isJumping = false;
    this.isRolling = false;
    this.rollTimer = 0;
    this.jumpFlipAngle = 0;

    // Power-ups & Pelindung
    this.hoverboardActive = false;
    this.hoverboardTimer = 0;
    this.hoverboardCooldown = 0;
    this.invincibleTimer = 0;

    this.powerups = {
      magnet: 0,
      jetpack: 0,
      sneakers: 0,
      multiplier: 0
    };

    // Koleksi Objek Dunia 3D
    this.obstacles = [];
    this.coinsList = [];
    this.itemsList = [];
    this.pitStopGates = [];
    this.particles = [];
    this.trackSleepers = [];
    this.buildings = [];
    this.clouds = [];
    this.sceneryProps = [];

    this.spawnZ = -45;
    this.waveCount = 0;
    this.lastTime = performance.now();
    this.runCycle = 0;
    this.cameraShake = 0;

    // Cache Tekstur HD
    this.pitStopTexture = HDTextureFactory.createPitStopBannerTexture();
    this.trainTextures = [
      {
        body: 0x2563eb,
        nose: 0x1d4ed8,
        tex: HDTextureFactory.createTrainSideTexture('#2563eb', '#facc15', 'SMK BUDI AGUNG • TKJ EXPRESS')
      },
      {
        body: 0x059669,
        nose: 0x047857,
        tex: HDTextureFactory.createTrainSideTexture('#059669', '#38bdf8', 'RPL CODING LINE • HIGH SPEED')
      },
      {
        body: 0xdc2626,
        nose: 0xb91c1c,
        tex: HDTextureFactory.createTrainSideTexture('#dc2626', '#fde047', 'INFORMATIKA METRO • CYBER LINE')
      },
      {
        body: 0x7c3aed,
        nose: 0x6d28d9,
        tex: HDTextureFactory.createTrainSideTexture('#7c3aed', '#f472b6', 'PRODUKTIF SMK • DIGITAL TRAIN')
      }
    ];

    this.initThree();
    this.buildEnvironment();
    this.buildPlayer();
    this.buildChaser();
    this.bindControls();

    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);
  }

  initThree() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x1e293b);
    this.scene.fog = new THREE.FogExp2(0x1e293b, 0.0068);

    const w = this.container.clientWidth || window.innerWidth;
    const h = this.container.clientHeight || window.innerHeight;

    this.camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 240);
    this.camera.position.set(0, 6.2, 10.2);
    this.camera.lookAt(0, 2.2, -14);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    this.renderer.setSize(w, h);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.outputEncoding = THREE.sRGBEncoding;

    this.container.innerHTML = '';
    this.container.appendChild(this.renderer.domElement);

    // Pencahayaan HD Hangat & Cerah
    const hemiLight = new THREE.HemisphereLight(0xe0f2fe, 0x334155, 0.95);
    hemiLight.position.set(0, 60, 0);
    this.scene.add(hemiLight);

    const sunLight = new THREE.DirectionalLight(0xfffbeb, 1.15);
    sunLight.position.set(24, 45, 28);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 1;
    sunLight.shadow.camera.far = 140;
    sunLight.shadow.camera.left = -22;
    sunLight.shadow.camera.right = 22;
    sunLight.shadow.camera.top = 40;
    sunLight.shadow.camera.bottom = -45;
    this.scene.add(sunLight);

    window.addEventListener('resize', () => this.onResize());
  }

  onResize() {
    if (!this.container || !this.renderer) return;
    const w = this.container.clientWidth || window.innerWidth;
    const h = this.container.clientHeight || window.innerHeight;
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h);
  }

  /**
   * Helper untuk membuat kapsul organik halus (silinder dengan ujung bola di kedua sisi)
   * sehingga karakter & objek sama sekali tidak tampak kotak-kotak!
   */
  createSmoothCapsule(radiusTop, radiusBottom, length, mat, segments = 20) {
    const group = new THREE.Group();
    const cyl = new THREE.Mesh(
      new THREE.CylinderGeometry(radiusTop, radiusBottom, length, segments),
      mat
    );
    cyl.castShadow = true;
    group.add(cyl);

    const topSphere = new THREE.Mesh(
      new THREE.SphereGeometry(radiusTop, segments, segments),
      mat
    );
    topSphere.position.y = length / 2;
    topSphere.castShadow = true;
    group.add(topSphere);

    const botSphere = new THREE.Mesh(
      new THREE.SphereGeometry(radiusBottom, segments, segments),
      mat
    );
    botSphere.position.y = -length / 2;
    botSphere.castShadow = true;
    group.add(botSphere);

    return group;
  }

  buildEnvironment() {
    // 1. Kubah Langit Gradien HD (Sky Backdrop)
    const skyCanvas = document.createElement('canvas');
    skyCanvas.width = 512;
    skyCanvas.height = 512;
    const sCtx = skyCanvas.getContext('2d');
    const skyGrad = sCtx.createLinearGradient(0, 0, 0, 512);
    skyGrad.addColorStop(0, '#0284c7');
    skyGrad.addColorStop(0.48, '#38bdf8');
    skyGrad.addColorStop(0.78, '#fde047');
    skyGrad.addColorStop(1, '#f97316');
    sCtx.fillStyle = skyGrad;
    sCtx.fillRect(0, 0, 512, 512);

    const skyTex = new THREE.CanvasTexture(skyCanvas);
    const skyDome = new THREE.Mesh(
      new THREE.SphereGeometry(195, 32, 24),
      new THREE.MeshBasicMaterial({ map: skyTex, side: THREE.BackSide, fog: false })
    );
    this.scene.add(skyDome);

    // 2. Awan 3D Lembut (Gugusan Bola Organik) di Langit
    const cloudMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.9,
      metalness: 0.0
    });
    for (let i = 0; i < 12; i++) {
      const cGroup = new THREE.Group();
      const puffs = 4 + Math.floor(Math.random() * 3);
      for (let p = 0; p < puffs; p++) {
        const r = 2.8 + Math.random() * 2.2;
        const puff = new THREE.Mesh(new THREE.SphereGeometry(r, 16, 16), cloudMat);
        puff.position.set((p - puffs / 2) * 2.6, Math.random() * 1.1, (Math.random() - 0.5) * 1.8);
        puff.scale.y = 0.68;
        cGroup.add(puff);
      }
      cGroup.position.set(
        (Math.random() < 0.5 ? -1 : 1) * (15 + Math.random() * 45),
        26 + Math.random() * 16,
        -20 - Math.random() * 160
      );
      this.scene.add(cGroup);
      this.clouds.push(cGroup);
    }

    // 3. Dasar Rel Kereta dengan Tekstur Batu Ballast HD
    const ballastTex = HDTextureFactory.createTrackBallastTexture();
    const groundGeo = new THREE.PlaneGeometry(14.6, 260);
    const groundMat = new THREE.MeshStandardMaterial({
      map: ballastTex,
      roughness: 0.92
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.z = -100;
    ground.receiveShadow = true;
    this.scene.add(ground);

    // Trotoar taman kota di sisi kiri & kanan
    const sideGeo = new THREE.BoxGeometry(24, 0.7, 260);
    const sideMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.8 });

    const leftSide = new THREE.Mesh(sideGeo, sideMat);
    leftSide.position.set(-19, 0.25, -100);
    leftSide.receiveShadow = true;
    this.scene.add(leftSide);

    const rightSide = new THREE.Mesh(sideGeo, sideMat);
    rightSide.position.set(19, 0.25, -100);
    rightSide.receiveShadow = true;
    this.scene.add(rightSide);

    // Pembatas jalan silinder neon halus
    const curbGeo = new THREE.CylinderGeometry(0.28, 0.28, 260, 16);
    const curbMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 0.45,
      roughness: 0.2
    });
    const leftCurb = new THREE.Mesh(curbGeo, curbMat);
    leftCurb.rotation.x = Math.PI / 2;
    leftCurb.position.set(-6.8, 0.55, -100);
    this.scene.add(leftCurb);

    const rightCurb = new THREE.Mesh(curbGeo, curbMat);
    rightCurb.rotation.x = Math.PI / 2;
    rightCurb.position.set(6.8, 0.55, -100);
    this.scene.add(rightCurb);

    // Batang Besi Rel Silinder Halus untuk 3 Jalur
    const railGeo = new THREE.CylinderGeometry(0.09, 0.11, 260, 12);
    const railMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      metalness: 0.88,
      roughness: 0.18
    });

    this.LANES.forEach(laneX => {
      const r1 = new THREE.Mesh(railGeo, railMat);
      r1.rotation.x = Math.PI / 2;
      r1.position.set(laneX - 0.88, 0.16, -100);
      this.scene.add(r1);

      const r2 = new THREE.Mesh(railGeo, railMat);
      r2.rotation.x = Math.PI / 2;
      r2.position.set(laneX + 0.88, 0.16, -100);
      this.scene.add(r2);
    });

    // Bantalan rel kereta dengan baut pengikat
    const sleeperMat = new THREE.MeshStandardMaterial({ color: 0x451a03, roughness: 0.85 });
    const boltMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.8 });

    for (let z = 14; z > -175; z -= 3.0) {
      const rowGroup = new THREE.Group();
      this.LANES.forEach(laneX => {
        const sl = new THREE.Mesh(new THREE.BoxGeometry(2.35, 0.1, 0.42), sleeperMat);
        sl.position.set(laneX, 0.05, 0);
        rowGroup.add(sl);

        // Baut penahan rel bulat
        const b1 = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.16, 10), boltMat);
        b1.position.set(laneX - 0.88, 0.1, 0);
        const b2 = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.16, 10), boltMat);
        b2.position.set(laneX + 0.88, 0.1, 0);
        rowGroup.add(b1, b2);
      });
      rowGroup.position.z = z;
      this.scene.add(rowGroup);
      this.trackSleepers.push(rowGroup);
    }

    // 4. Gedung Kota Modern Bertekstur HD, Pohon Rindang Organik, & Lampu Jalan Melengkung
    const buildingConfigs = [
      { base: '#1e3a8a', accent: '#38bdf8', sign: 'SMK BUDI AGUNG' },
      { base: '#312e81', accent: '#a855f7', sign: 'TKJ NETWORK LAB' },
      { base: '#065f46', accent: '#34d399', sign: 'RPL CODING HUB' },
      { base: '#1e293b', accent: '#f59e0b', sign: 'CYBER CENTER' }
    ];
    const buildingTextures = buildingConfigs.map(cfg =>
      HDTextureFactory.createBuildingFacadeTexture(cfg.base, cfg.accent, cfg.sign)
    );

    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.9 });
    const leafMat = new THREE.MeshStandardMaterial({ color: 0x10b981, roughness: 0.65 });
    const poleMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.7, roughness: 0.3 });
    const lampBulbMat = new THREE.MeshBasicMaterial({ color: 0xfef08a });

    for (let z = 12; z > -185; z -= 15) {
      [-1, 1].forEach((side, sIdx) => {
        const bGroup = new THREE.Group();
        const isTower = Math.random() > 0.45;
        const bw = 6.5 + Math.random() * 3.5;
        const bh = 14 + Math.random() * 16;
        const tex = buildingTextures[(Math.abs(Math.round(z)) + sIdx) % buildingTextures.length];
        const bMat = new THREE.MeshStandardMaterial({ map: tex, roughness: 0.55 });

        if (isTower) {
          // Menara Silinder / Oval Modern (Tidak Kotak!)
          const cylTower = new THREE.Mesh(
            new THREE.CylinderGeometry(bw * 0.52, bw * 0.55, bh, 24),
            bMat
          );
          cylTower.position.y = bh / 2;
          bGroup.add(cylTower);

          // Kubah kaca di puncak menara
          const dome = new THREE.Mesh(
            new THREE.SphereGeometry(bw * 0.48, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2),
            new THREE.MeshStandardMaterial({
              color: 0x38bdf8,
              emissive: 0x0284c7,
              emissiveIntensity: 0.35,
              roughness: 0.2
            })
          );
          dome.position.y = bh;
          bGroup.add(dome);
        } else {
          // Gedung dengan Pilar Sudut Silinder Halus & Atap Melengkung
          const core = new THREE.Mesh(new THREE.BoxGeometry(bw, bh, 8.5), bMat);
          core.position.y = bh / 2;
          bGroup.add(core);

          const archRoof = new THREE.Mesh(
            new THREE.CylinderGeometry(bw / 2, bw / 2, 8.5, 20),
            new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.4 })
          );
          archRoof.rotation.x = Math.PI / 2;
          archRoof.position.y = bh;
          bGroup.add(archRoof);
        }

        bGroup.position.set(side * (12.5 + bw / 2), 0, z);
        this.scene.add(bGroup);
        this.buildings.push(bGroup);

        // Pohon Kota Rindang (Batang Silinder + Mahkota Daun Bola-Bola Organik)
        const treeGroup = new THREE.Group();
        const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.34, 2.4, 14), trunkMat);
        trunk.position.y = 1.4;
        treeGroup.add(trunk);

        const crown1 = new THREE.Mesh(new THREE.SphereGeometry(1.35, 18, 18), leafMat);
        crown1.position.set(0, 3.1, 0);
        const crown2 = new THREE.Mesh(new THREE.SphereGeometry(1.0, 16, 16), leafMat);
        crown2.position.set(0.65, 2.7, 0.4);
        const crown3 = new THREE.Mesh(new THREE.SphereGeometry(0.95, 16, 16), leafMat);
        crown3.position.set(-0.6, 2.8, -0.35);
        treeGroup.add(crown1, crown2, crown3);

        // Lampu Jalan Melengkung
        const lampPole = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.14, 5.4, 12), poleMat);
        lampPole.position.set(side * -1.4, 2.7, 3.5);
        const lampArm = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 1.6, 10), poleMat);
        lampArm.rotation.z = side * (Math.PI / 3);
        lampArm.position.set(side * -2.0, 5.2, 3.5);
        const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.28, 14, 14), lampBulbMat);
        bulb.position.set(side * -2.55, 5.35, 3.5);
        treeGroup.add(lampPole, lampArm, bulb);

        treeGroup.position.set(side * 9.2, 0.4, z + 5);
        this.scene.add(treeGroup);
        this.sceneryProps.push(treeGroup);
      });
    }
  }

  /**
   * Membangun Karakter 3D Organik Halus (Bukan Kotak-Kotak!)
   * Lengkap dengan sendi bahu, siku, pinggul, lutut, wajah ekspresif, headphone, & sepatu sneaker bulat.
   */
  buildPlayer() {
    if (this.playerGroup) {
      this.scene.remove(this.playerGroup);
    }

    const skinId = localStorage.getItem('smk_surfers_skin') || 'raka';
    const skin = CHARACTER_SKINS.find(s => s.id === skinId) || CHARACTER_SKINS[0];

    const hbId = localStorage.getItem('smk_surfers_board') || 'neon';
    const hbSkin = HOVERBOARD_SKINS.find(b => b.id === hbId) || HOVERBOARD_SKINS[0];

    this.playerGroup = new THREE.Group();
    this.playerMeshGroup = new THREE.Group();
    this.playerGroup.add(this.playerMeshGroup);

    const torsoMat = new THREE.MeshStandardMaterial({ color: skin.shirtColor, roughness: 0.38 });
    const skinMat = new THREE.MeshStandardMaterial({ color: skin.skinColor, roughness: 0.45 });
    const pantsMat = new THREE.MeshStandardMaterial({ color: skin.pantsColor, roughness: 0.55 });
    const capMat = new THREE.MeshStandardMaterial({ color: skin.capColor, roughness: 0.35 });
    const shoeMat = new THREE.MeshStandardMaterial({ color: skin.shoeColor, roughness: 0.3 });
    const whiteMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.25 });
    const darkMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.2 });

    // 1. Torso Organik (Kapsul Halus + Kerah Hoodie + Resleting)
    this.torsoGroup = new THREE.Group();
    const torsoCore = this.createSmoothCapsule(0.46, 0.41, 0.72, torsoMat, 24);
    torsoCore.scale.set(1.08, 1, 0.78);
    this.torsoGroup.add(torsoCore);

    // Garis resleting/aksen jaket SMK
    const zipMat = new THREE.MeshBasicMaterial({ color: skin.jacketAccent || '#fde047' });
    const zipper = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.85, 12), zipMat);
    zipper.position.set(0, 0, -0.35);
    this.torsoGroup.add(zipper);

    // Tas Ransel Membulat (Rounded Backpack)
    const bagGroup = new THREE.Group();
    const bagBody = this.createSmoothCapsule(0.34, 0.36, 0.45, capMat, 20);
    bagBody.scale.set(1.0, 1.0, 0.65);
    const bagPocket = new THREE.Mesh(new THREE.SphereGeometry(0.24, 16, 16), shoeMat);
    bagPocket.scale.set(1.1, 0.8, 0.55);
    bagPocket.position.set(0, -0.1, 0.18);
    bagGroup.add(bagBody, bagPocket);
    bagGroup.position.set(0, 0.04, 0.36);
    this.torsoGroup.add(bagGroup);

    this.torsoGroup.position.y = 1.48;
    this.playerMeshGroup.add(this.torsoGroup);

    // 2. Kepala Bulat Halus + Mata + Topi Melengkung + Headphone Cyber
    this.headGroup = new THREE.Group();
    const headSphere = new THREE.Mesh(new THREE.SphereGeometry(0.42, 28, 28), skinMat);
    headSphere.scale.set(0.96, 1.04, 0.96);
    headSphere.castShadow = true;
    this.headGroup.add(headSphere);

    // Telinga & Headphone
    const earCupGeo = new THREE.CylinderGeometry(0.15, 0.15, 0.12, 18);
    const earL = new THREE.Mesh(earCupGeo, shoeMat);
    earL.rotation.z = Math.PI / 2;
    earL.position.set(-0.42, 0.02, 0);
    const earR = new THREE.Mesh(earCupGeo, shoeMat);
    earR.rotation.z = Math.PI / 2;
    earR.position.set(0.42, 0.02, 0);
    this.headGroup.add(earL, earR);

    // Kubah Topi (Baseball Cap Melengkung)
    const capDome = new THREE.Mesh(
      new THREE.SphereGeometry(0.435, 24, 18, 0, Math.PI * 2, 0, Math.PI * 0.55),
      capMat
    );
    capDome.position.y = 0.05;
    capDome.rotation.x = -0.12;
    this.headGroup.add(capDome);

    // Visor Topi Melengkung (menghadap ke belakang ala street runner!)
    const capVisor = new THREE.Mesh(
      new THREE.CylinderGeometry(0.38, 0.38, 0.06, 20, 1, false, 0, Math.PI),
      capMat
    );
    capVisor.position.set(0, 0.12, 0.24);
    capVisor.rotation.x = 0.22;
    this.headGroup.add(capVisor);

    // Mata (terlihat saat karakter menoleh di menu)
    const eyeL = new THREE.Mesh(new THREE.SphereGeometry(0.065, 14, 14), whiteMat);
    eyeL.position.set(-0.14, 0.04, -0.37);
    const pupilL = new THREE.Mesh(new THREE.SphereGeometry(0.038, 12, 12), darkMat);
    pupilL.position.set(-0.14, 0.04, -0.41);

    const eyeR = new THREE.Mesh(new THREE.SphereGeometry(0.065, 14, 14), whiteMat);
    eyeR.position.set(0.14, 0.04, -0.37);
    const pupilR = new THREE.Mesh(new THREE.SphereGeometry(0.038, 12, 12), darkMat);
    pupilR.position.set(0.14, 0.04, -0.41);
    this.headGroup.add(eyeL, pupilL, eyeR, pupilR);

    this.headGroup.position.y = 2.38;
    this.playerMeshGroup.add(this.headGroup);

    // 3. Lengan Kiri & Kanan Bersendi (Bahu + Lengan Atas + Siku + Lengan Bawah + Tangan Bulat)
    const buildArticulatedArm = side => {
      const shoulderPivot = new THREE.Group();
      shoulderPivot.position.set(side * 0.62, 1.82, 0);

      const upperArm = this.createSmoothCapsule(0.145, 0.13, 0.36, torsoMat, 16);
      upperArm.position.y = -0.18;
      shoulderPivot.add(upperArm);

      const elbowPivot = new THREE.Group();
      elbowPivot.position.y = -0.38;
      const foreArm = this.createSmoothCapsule(0.125, 0.11, 0.34, skinMat, 16);
      foreArm.position.y = -0.17;
      elbowPivot.add(foreArm);

      const hand = new THREE.Mesh(new THREE.SphereGeometry(0.13, 16, 16), skinMat);
      hand.position.y = -0.36;
      elbowPivot.add(hand);

      shoulderPivot.add(elbowPivot);
      return { shoulderPivot, elbowPivot };
    };

    const armL = buildArticulatedArm(-1);
    this.leftArm = armL.shoulderPivot;
    this.leftElbow = armL.elbowPivot;
    this.playerMeshGroup.add(this.leftArm);

    const armR = buildArticulatedArm(1);
    this.rightArm = armR.shoulderPivot;
    this.rightElbow = armR.elbowPivot;
    this.playerMeshGroup.add(this.rightArm);

    // 4. Kaki Kiri & Kanan Bersendi (Pinggul + Paha + Lutut + Betis + Sepatu Sneaker Sporty Membulat)
    const buildArticulatedLeg = side => {
      const hipPivot = new THREE.Group();
      hipPivot.position.set(side * 0.25, 1.02, 0);

      const thigh = this.createSmoothCapsule(0.18, 0.155, 0.42, pantsMat, 18);
      thigh.position.y = -0.21;
      hipPivot.add(thigh);

      const kneePivot = new THREE.Group();
      kneePivot.position.y = -0.44;

      const shin = this.createSmoothCapsule(0.15, 0.125, 0.38, pantsMat, 18);
      shin.position.y = -0.19;
      kneePivot.add(shin);

      // Sepatu Sneaker Bulat Aerodinamis + Sol Putih
      const shoeGroup = new THREE.Group();
      const shoeUpper = this.createSmoothCapsule(0.16, 0.15, 0.28, shoeMat, 18);
      shoeUpper.rotation.x = Math.PI / 2;
      shoeUpper.scale.set(1.0, 1.0, 0.72);
      shoeUpper.position.set(0, 0.04, -0.08);

      const shoeSole = this.createSmoothCapsule(0.17, 0.165, 0.32, whiteMat, 18);
      shoeSole.rotation.x = Math.PI / 2;
      shoeSole.scale.set(1.05, 1.05, 0.32);
      shoeSole.position.set(0, -0.05, -0.08);

      shoeGroup.add(shoeUpper, shoeSole);
      shoeGroup.position.y = -0.44;
      kneePivot.add(shoeGroup);

      hipPivot.add(kneePivot);
      return { hipPivot, kneePivot, shoeGroup };
    };

    const legL = buildArticulatedLeg(-1);
    this.leftLeg = legL.hipPivot;
    this.leftKnee = legL.kneePivot;
    this.leftShoe = legL.shoeGroup;
    this.playerMeshGroup.add(this.leftLeg);

    const legR = buildArticulatedLeg(1);
    this.rightLeg = legR.hipPivot;
    this.rightKnee = legR.kneePivot;
    this.rightShoe = legR.shoeGroup;
    this.playerMeshGroup.add(this.rightLeg);

    // 5. Hoverboard Selancar Oval Aerodinamis (Bukan Papan Kotak!)
    this.hoverboardMesh = new THREE.Group();
    const deckMat = new THREE.MeshStandardMaterial({
      color: hbSkin.mainColor,
      metalness: 0.55,
      roughness: 0.2
    });
    const glowMat = new THREE.MeshBasicMaterial({ color: hbSkin.glowColor });

    const deckCore = this.createSmoothCapsule(0.55, 0.48, 1.45, deckMat, 24);
    deckCore.rotation.x = Math.PI / 2;
    deckCore.scale.set(1.15, 1.0, 0.18);

    const glowRing = new THREE.Mesh(new THREE.TorusGeometry(0.68, 0.06, 12, 32), glowMat);
    glowRing.rotation.x = Math.PI / 2;
    glowRing.scale.set(0.95, 1.75, 1.0);
    glowRing.position.y = -0.04;

    this.hoverboardMesh.add(deckCore, glowRing);
    this.hoverboardMesh.position.y = 0.14;
    this.hoverboardMesh.visible = this.hoverboardActive;
    this.playerGroup.add(this.hoverboardMesh);

    // 6. Cyber Jetpack Halus di Punggung
    this.jetpackMesh = new THREE.Group();
    const tankMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, metalness: 0.75, roughness: 0.2 });
    const flameMat = new THREE.MeshBasicMaterial({ color: 0xf97316 });

    [-0.24, 0.24].forEach(offsetX => {
      const tank = this.createSmoothCapsule(0.16, 0.14, 0.65, tankMat, 18);
      tank.position.set(offsetX, 1.52, 0.62);
      const nozzle = new THREE.Mesh(new THREE.ConeGeometry(0.16, 0.55, 14), flameMat);
      nozzle.rotation.x = Math.PI;
      nozzle.position.set(offsetX, 0.9, 0.62);
      this.jetpackMesh.add(tank, nozzle);
    });
    this.jetpackMesh.visible = false;
    this.playerMeshGroup.add(this.jetpackMesh);

    // 7. Bola Energi Pelindung Halus (Invincible Shield)
    this.shieldBubble = new THREE.Mesh(
      new THREE.SphereGeometry(1.9, 28, 28),
      new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        emissive: 0x0284c7,
        emissiveIntensity: 0.5,
        transparent: true,
        opacity: 0.28,
        roughness: 0.1
      })
    );
    this.shieldBubble.position.y = 1.45;
    this.shieldBubble.visible = false;
    this.playerGroup.add(this.shieldBubble);

    this.playerGroup.position.set(this.LANES[this.currentLane], this.playerY, 0);
    this.scene.add(this.playerGroup);
  }

  buildChaser() {
    // Karakter Pengejar (Inspektur Disiplin) dengan bentuk kapsul halus
    this.chaserGroup = new THREE.Group();
    const uniformMat = new THREE.MeshStandardMaterial({ color: 0x1e3a8a, roughness: 0.45 });
    const skinMat = new THREE.MeshStandardMaterial({ color: 0xf6c89f, roughness: 0.45 });
    const hatMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.3 });

    const body = this.createSmoothCapsule(0.5, 0.45, 0.85, uniformMat, 20);
    body.position.y = 1.45;
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.42, 22, 22), skinMat);
    head.position.y = 2.38;
    const hat = new THREE.Mesh(new THREE.CylinderGeometry(0.48, 0.44, 0.25, 20), hatMat);
    hat.position.y = 2.74;

    this.chaserGroup.add(body, head, hat);
    this.chaserGroup.position.set(0, 0, 4.5);
    this.chaserVisibleTimer = 0;
    this.scene.add(this.chaserGroup);
  }

  bindControls() {
    window.addEventListener('keydown', e => {
      if (this.state !== 'RUNNING') return;
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) return;

      switch (e.code) {
        case 'ArrowLeft':
        case 'KeyA':
          e.preventDefault();
          this.moveLane(-1);
          break;
        case 'ArrowRight':
        case 'KeyD':
          e.preventDefault();
          this.moveLane(1);
          break;
        case 'ArrowUp':
        case 'KeyW':
        case 'Space':
          e.preventDefault();
          this.jump();
          break;
        case 'ArrowDown':
        case 'KeyS':
          e.preventDefault();
          this.roll();
          break;
        case 'KeyH':
          e.preventDefault();
          this.activateHoverboard();
          break;
      }
    });

    let touchStartX = 0;
    let touchStartY = 0;
    let lastTapTime = 0;

    const el = this.renderer.domElement;
    el.addEventListener('touchstart', e => {
      if (this.state !== 'RUNNING') return;
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;

      const now = Date.now();
      if (now - lastTapTime < 280) {
        this.activateHoverboard();
      }
      lastTapTime = now;
    }, { passive: true });

    el.addEventListener('touchend', e => {
      if (this.state !== 'RUNNING') return;
      const dx = e.changedTouches[0].screenX - touchStartX;
      const dy = e.changedTouches[0].screenY - touchStartY;

      if (Math.abs(dx) < 24 && Math.abs(dy) < 24) return;

      if (Math.abs(dx) > Math.abs(dy)) {
        if (dx > 26) this.moveLane(1);
        else if (dx < -26) this.moveLane(-1);
      } else {
        if (dy < -26) this.jump();
        else if (dy > 26) this.roll();
      }
    }, { passive: true });
  }

  moveLane(dir) {
    if (this.state !== 'RUNNING') return;
    const next = this.currentLane + dir;
    if (next >= 0 && next <= 2) {
      this.currentLane = next;
      this.targetX = this.LANES[this.currentLane];
      window.SoundManager?.playLaneSwitch();
    }
  }

  jump() {
    if (this.state !== 'RUNNING') return;
    if (this.powerups.jetpack > 0) return;

    if (!this.isJumping && Math.abs(this.playerY - this.groundY) < 0.28) {
      this.isJumping = true;
      this.isRolling = false;
      this.jumpFlipAngle = 0;
      const mult = this.powerups.sneakers > 0 ? 1.32 : 1.0;
      this.velocityY = this.jumpForce * mult;
      window.SoundManager?.playJump();
    }
  }

  roll() {
    if (this.state !== 'RUNNING') return;
    if (this.powerups.jetpack > 0) return;

    this.isRolling = true;
    this.rollTimer = 0.68;
    if (this.isJumping) {
      this.velocityY = -38;
    }
    window.SoundManager?.playSlide();
  }

  activateHoverboard() {
    if (this.state !== 'RUNNING') return;
    if (this.hoverboardActive || this.hoverboardCooldown > 0) return;

    const upgrades = this.getUpgrades();
    this.hoverboardActive = true;
    this.hoverboardTimer = 14 + (upgrades.boardLevel || 0) * 3;
    this.hoverboardMesh.visible = true;
    window.SoundManager?.playHoverboard();
    this.spawnParticles(this.playerGroup.position.x, this.playerY + 0.5, 0, 0x06b6d4, 16);
    this.notifyHUD();
  }

  getUpgrades() {
    try {
      return JSON.parse(localStorage.getItem('smk_surfers_upgrades') || '{}');
    } catch (e) {
      return {};
    }
  }

  startNewGame() {
    this.clearWorldObjects();
    this.buildPlayer();

    this.state = 'RUNNING';
    this.score = 0;
    this.coins = 0;
    this.distance = 0;
    this.speed = this.baseSpeed;
    this.speedScale = 0.4; // Mulai dengan akselerasi halus
    this.waveCount = 0;

    this.quizCorrect = 0;
    this.quizTotal = 0;
    this.reviveCount = 0;

    this.currentLane = 1;
    this.targetX = this.LANES[1];
    this.playerY = 0;
    this.groundY = 0;
    this.velocityY = 0;
    this.isJumping = false;
    this.isRolling = false;

    this.hoverboardActive = false;
    this.hoverboardTimer = 0;
    this.hoverboardCooldown = 0;
    this.invincibleTimer = 2.2;
    this.chaserVisibleTimer = 4.5;

    this.powerups = { magnet: 0, jetpack: 0, sneakers: 0, multiplier: 0 };
    this.playerGroup.position.set(0, 0, 0);

    // Spawn gelombang rintangan awal + Tiang Pit Stop pertama pada gelombang ke-5 (~130m di depan)
    this.spawnZ = -42;
    for (let i = 0; i < 6; i++) {
      this.spawnWave(this.spawnZ);
      this.spawnZ -= 26;
    }

    window.SoundManager?.setBgmDucking(false);
    window.SoundManager?.startBgm();
    this.notifyHUD();
  }

  clearWorldObjects() {
    this.obstacles.forEach(o => this.scene.remove(o.mesh));
    this.coinsList.forEach(c => this.scene.remove(c.mesh));
    this.itemsList.forEach(i => this.scene.remove(i.mesh));
    this.pitStopGates.forEach(g => this.scene.remove(g.mesh));
    this.particles.forEach(p => this.scene.remove(p.mesh));

    this.obstacles = [];
    this.coinsList = [];
    this.itemsList = [];
    this.pitStopGates = [];
    this.particles = [];
    this.activePitStop = null;
  }

  spawnWave(zPos) {
    this.waveCount++;

    // Setiap 5 gelombang (~135 meter), bangun ZONA TIANG PIT STOP KUIS yang megah & bebas rintangan mendadak!
    if (this.waveCount % 5 === 0) {
      this.createPitStopGate(zPos);
      // Berikan karpet koin emas menuju Tiang Pit Stop di ketiga lajur!
      [0, 1, 2].forEach(lane => {
        this.createCoinLine(lane, zPos + 10, 4, 1.0);
      });
      return;
    }

    const occupiedLanes = new Set();
    const numObstacles = Math.random() < 0.62 ? 2 : 1;
    const lanesOrder = [0, 1, 2].sort(() => Math.random() - 0.5);

    for (let i = 0; i < numObstacles; i++) {
      const lane = lanesOrder[i];
      const roll = Math.random();

      if (roll < 0.36) {
        const isMoving = Math.random() < 0.32 && this.distance > 120;
        const hasRamp = !isMoving && Math.random() < 0.48;
        this.createBulletTrain(lane, zPos, isMoving, hasRamp);
        occupiedLanes.add(lane);
      } else if (roll < 0.68) {
        this.createRoundedLowBarrier(lane, zPos);
        occupiedLanes.add(lane);
        this.createCoinArc(lane, zPos);
      } else {
        this.createRoundedHighBarrier(lane, zPos);
        occupiedLanes.add(lane);
        this.createCoinLine(lane, zPos - 3, 4, 0.85);
      }
    }

    // Lajur bebas diisi koin & Power-Up
    const freeLanes = [0, 1, 2].filter(l => !occupiedLanes.has(l));
    if (freeLanes.length > 0) {
      const coinLane = freeLanes[Math.floor(Math.random() * freeLanes.length)];
      this.createCoinLine(coinLane, zPos - 4, 5, 1.0);

      if (Math.random() < 0.35) {
        const types = ['magnet', 'jetpack', 'sneakers', 'multiplier'];
        const pType = types[Math.floor(Math.random() * types.length)];
        this.createPowerupItem(coinLane, zPos + 2.5, 1.35, pType);
      }
    }
  }

  /**
   * Membangun TIANG PIT STOP KUIS (Grand Archway Gantry) yang membentang di atas 3 jalur!
   * Terlihat jelas dari jarak >120m sehingga siswa bisa bersiap dan sama sekali tidak kaget.
   */
  createPitStopGate(zPos) {
    const gateGroup = new THREE.Group();

    const pillarMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      metalness: 0.75,
      roughness: 0.2
    });
    const neonBlueMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const neonGoldMat = new THREE.MeshBasicMaterial({ color: 0xfacc15 });

    // Tiang Silinder Kembar di Kiri & Kanan Rel
    [-6.1, 6.1].forEach(xPos => {
      const mainPillar = new THREE.Mesh(
        new THREE.CylinderGeometry(0.45, 0.58, 7.6, 24),
        pillarMat
      );
      mainPillar.position.set(xPos, 3.8, 0);
      mainPillar.castShadow = true;
      gateGroup.add(mainPillar);

      // Cincin Neon Menyala di Tiang
      [1.8, 3.6, 5.4].forEach((yRing, idx) => {
        const ring = new THREE.Mesh(
          new THREE.TorusGeometry(0.54, 0.08, 12, 24),
          idx % 2 === 0 ? neonBlueMat : neonGoldMat
        );
        ring.rotation.x = Math.PI / 2;
        ring.position.set(xPos, yRing, 0);
        gateGroup.add(ring);
      });

      // Lampu Sirine / Beacon Bulat di Puncak Tiang
      const beacon = new THREE.Mesh(
        new THREE.SphereGeometry(0.55, 20, 20),
        neonGoldMat
      );
      beacon.position.set(xPos, 7.9, 0);
      gateGroup.add(beacon);
    });

    // Lengkungan Atas Gantry (Crossbar Silinder Halus)
    const topBeam = new THREE.Mesh(
      new THREE.CylinderGeometry(0.32, 0.32, 13.0, 20),
      pillarMat
    );
    topBeam.rotation.z = Math.PI / 2;
    topBeam.position.set(0, 7.2, 0);
    gateGroup.add(topBeam);

    // Papan LED Megah "🏁 PIT STOP KUIS 🏁" dengan Tekstur HD Canvas
    const signBoard = new THREE.Mesh(
      new THREE.BoxGeometry(10.6, 2.55, 0.45),
      new THREE.MeshBasicMaterial({ map: this.pitStopTexture })
    );
    signBoard.position.set(0, 6.45, 0);
    gateGroup.add(signBoard);

    // Tirai Hologram Energi Transparan di Bawah Gerbang Pit Stop
    const holoCurtain = new THREE.Mesh(
      new THREE.PlaneGeometry(11.4, 5.0),
      new THREE.MeshBasicMaterial({
        color: 0xa855f7,
        transparent: true,
        opacity: 0.2,
        side: THREE.DoubleSide
      })
    );
    holoCurtain.position.set(0, 2.5, 0);
    gateGroup.add(holoCurtain);

    // Garis Finish Checkered Line di Lantai Rel
    const floorStrip = new THREE.Mesh(
      new THREE.PlaneGeometry(11.8, 2.2),
      new THREE.MeshBasicMaterial({
        color: 0xfacc15,
        transparent: true,
        opacity: 0.65
      })
    );
    floorStrip.rotation.x = -Math.PI / 2;
    floorStrip.position.set(0, 0.19, 0);
    gateGroup.add(floorStrip);

    gateGroup.position.set(0, 0, zPos);
    this.scene.add(gateGroup);

    this.pitStopGates.push({
      mesh: gateGroup,
      triggered: false,
      beaconTime: 0
    });
  }

  /**
   * Membangun Kereta Cepat Aerodinamis (MRT Bullet Train) - Bukan Kotak Kaku!
   * Lengkap dengan moncong melengkung, atap lengkung silinder, & tekstur jendela HD.
   */
  createBulletTrain(lane, zPos, isMoving = false, hasRamp = false) {
    const trainLen = 14.0;
    const trainHeight = 3.25;
    const trainGroup = new THREE.Group();

    const style = this.trainTextures[Math.floor(Math.random() * this.trainTextures.length)];

    const sideMat = new THREE.MeshStandardMaterial({
      map: style.tex,
      roughness: 0.25,
      metalness: 0.3
    });
    const roofMat = new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      roughness: 0.3,
      metalness: 0.4
    });
    const noseMat = new THREE.MeshStandardMaterial({
      color: style.body,
      roughness: 0.22,
      metalness: 0.35
    });

    // Badan kereta utama
    const bodyMesh = new THREE.Mesh(
      new THREE.BoxGeometry(2.68, trainHeight - 0.55, trainLen - 1.6),
      sideMat
    );
    bodyMesh.position.y = (trainHeight - 0.55) / 2 + 0.22;
    bodyMesh.castShadow = true;
    bodyMesh.receiveShadow = true;
    trainGroup.add(bodyMesh);

    // Atap Kereta Melengkung (Silinder Memanjang Halus)
    const roofCyl = new THREE.Mesh(
      new THREE.CylinderGeometry(1.34, 1.34, trainLen - 1.5, 24, 1, false, 0, Math.PI),
      roofMat
    );
    roofCyl.rotation.z = Math.PI / 2;
    roofCyl.rotation.y = Math.PI / 2;
    roofCyl.scale.set(1, 0.42, 1);
    roofCyl.position.y = trainHeight - 0.32;
    trainGroup.add(roofCyl);

    // Moncong Depan Kereta Aerodinamis (Bullet Nose Melengkung)
    const noseSphere = new THREE.Mesh(
      new THREE.SphereGeometry(1.34, 28, 22),
      noseMat
    );
    noseSphere.scale.set(1.0, 1.12, 1.45);
    noseSphere.position.set(0, 1.65, (trainLen - 1.6) / 2 + 0.2);
    trainGroup.add(noseSphere);

    // Kaca Kokpit Masinis Melengkung
    const cockpitGlass = new THREE.Mesh(
      new THREE.SphereGeometry(1.22, 24, 18),
      new THREE.MeshStandardMaterial({
        color: 0x0f172a,
        emissive: 0x0284c7,
        emissiveIntensity: 0.35,
        roughness: 0.1
      })
    );
    cockpitGlass.scale.set(0.92, 0.62, 1.15);
    cockpitGlass.position.set(0, 2.15, (trainLen - 1.6) / 2 + 0.55);
    trainGroup.add(cockpitGlass);

    // Lampu Utama LED Bulat
    const lightMat = new THREE.MeshBasicMaterial({ color: isMoving ? 0xff4444 : 0xfef08a });
    [-0.78, 0.78].forEach(lx => {
      const hl = new THREE.Mesh(new THREE.SphereGeometry(0.22, 16, 16), lightMat);
      hl.position.set(lx, 1.05, trainLen / 2 + 0.35);
      trainGroup.add(hl);
    });

    trainGroup.position.set(this.LANES[lane], 0, zPos);
    this.scene.add(trainGroup);

    this.obstacles.push({
      type: 'train',
      lane,
      mesh: trainGroup,
      halfDepth: trainLen / 2 + 0.4,
      height: trainHeight + 0.15,
      speedOffset: isMoving ? 13 : 0
    });

    // Koin di atas atap kereta
    this.createCoinLine(lane, zPos - 4, 4, trainHeight + 1.05);

    // Tanjakan (Ramp) Melengkung Halus di depan kereta
    if (hasRamp) {
      const rampGroup = new THREE.Group();
      const rampMat = new THREE.MeshStandardMaterial({
        color: 0xf59e0b,
        emissive: 0xd97706,
        emissiveIntensity: 0.2,
        roughness: 0.35
      });
      const rampMesh = new THREE.Mesh(new THREE.BoxGeometry(2.55, 0.32, 5.4), rampMat);
      rampMesh.rotation.x = Math.PI / 5.4;
      rampMesh.position.set(0, 1.55, 0);

      // Pagar pengaman silinder di pinggir tanjakan
      const railMat = new THREE.MeshBasicMaterial({ color: 0xfef08a });
      [-1.2, 1.2].forEach(rx => {
        const sideRail = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 5.4, 12), railMat);
        sideRail.rotation.x = Math.PI / 2 + Math.PI / 5.4;
        sideRail.position.set(rx, 1.75, 0);
        rampGroup.add(sideRail);
      });

      rampGroup.add(rampMesh);
      rampGroup.position.set(this.LANES[lane], 0, zPos + trainLen / 2 + 2.3);
      this.scene.add(rampGroup);

      this.obstacles.push({
        type: 'ramp',
        lane,
        mesh: rampGroup,
        halfDepth: 2.4,
        height: trainHeight + 0.15,
        speedOffset: 0
      });
    }
  }

  createRoundedLowBarrier(lane, zPos) {
    // Palang rendah dari pipa silinder membulat & lampu sirine bulat
    const group = new THREE.Group();
    const postMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.7, roughness: 0.25 });
    const barMat = new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.3 });
    const stripeMat = new THREE.MeshBasicMaterial({ color: 0xfef08a });

    [-1.08, 1.08].forEach(px => {
      const post = this.createSmoothCapsule(0.13, 0.15, 1.15, postMat, 16);
      post.position.set(px, 0.62, 0);
      group.add(post);

      const light = new THREE.Mesh(new THREE.SphereGeometry(0.16, 14, 14), stripeMat);
      light.position.set(px, 1.28, 0);
      group.add(light);
    });

    const mainTube = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 2.35, 20), barMat);
    mainTube.rotation.z = Math.PI / 2;
    mainTube.position.y = 0.94;
    group.add(mainTube);

    [-0.55, 0, 0.55].forEach(sx => {
      const band = new THREE.Mesh(new THREE.CylinderGeometry(0.23, 0.23, 0.26, 20), stripeMat);
      band.rotation.z = Math.PI / 2;
      band.position.set(sx, 0.94, 0);
      group.add(band);
    });

    group.position.set(this.LANES[lane], 0, zPos);
    this.scene.add(group);

    this.obstacles.push({
      type: 'low_barrier',
      lane,
      mesh: group,
      halfDepth: 0.45,
      height: 1.22,
      speedOffset: 0
    });
  }

  createRoundedHighBarrier(lane, zPos) {
    // Palang tinggi lengkung untuk Roll / Slide di bawahnya
    const group = new THREE.Group();
    const postMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.7, roughness: 0.25 });
    const beamMat = new THREE.MeshStandardMaterial({ color: 0xf97316, roughness: 0.3 });
    const glowMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });

    [-1.15, 1.15].forEach(px => {
      const post = this.createSmoothCapsule(0.14, 0.16, 3.0, postMat, 16);
      post.position.set(px, 1.55, 0);
      group.add(post);
    });

    // Silinder palang atas ganda
    const upperCyl = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 2.5, 22), beamMat);
    upperCyl.rotation.z = Math.PI / 2;
    upperCyl.position.y = 2.55;

    const lowerCyl = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 2.5, 22), beamMat);
    lowerCyl.rotation.z = Math.PI / 2;
    lowerCyl.position.y = 1.82;

    const neonBar = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 2.2, 16), glowMat);
    neonBar.rotation.z = Math.PI / 2;
    neonBar.position.y = 1.48;

    group.add(upperCyl, lowerCyl, neonBar);
    group.position.set(this.LANES[lane], 0, zPos);
    this.scene.add(group);

    this.obstacles.push({
      type: 'high_barrier',
      lane,
      mesh: group,
      halfDepth: 0.45,
      minY: 1.32,
      height: 3.2,
      speedOffset: 0
    });
  }

  createCoin(laneX, y, z) {
    // Koin 3D dengan cincin berbingkai timbul (Torus + Silinder Halus)
    const coinGroup = new THREE.Group();
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xfacc15,
      emissive: 0xd97706,
      emissiveIntensity: 0.35,
      metalness: 0.78,
      roughness: 0.18
    });

    const core = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.12, 24), goldMat);
    core.rotation.x = Math.PI / 2;
    const rim = new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.065, 12, 24), goldMat);

    coinGroup.add(core, rim);
    coinGroup.position.set(laneX, y, z);
    this.scene.add(coinGroup);
    this.coinsList.push({ mesh: coinGroup });
  }

  createCoinLine(lane, startZ, count = 5, y = 1.0) {
    const x = this.LANES[lane];
    for (let i = 0; i < count; i++) {
      this.createCoin(x, y, startZ - i * 2.1);
    }
  }

  createCoinArc(lane, centerZ) {
    const x = this.LANES[lane];
    const offsets = [
      { dz: 3.6, y: 1.2 },
      { dz: 1.8, y: 2.35 },
      { dz: 0, y: 2.85 },
      { dz: -1.8, y: 2.35 },
      { dz: -3.6, y: 1.2 }
    ];
    offsets.forEach(o => this.createCoin(x, o.y, centerZ + o.dz));
  }

  createPowerupItem(lane, zPos, y, powerType) {
    const colors = {
      magnet: 0xef4444,
      jetpack: 0xf97316,
      sneakers: 0x22c55e,
      multiplier: 0x38bdf8
    };
    const group = new THREE.Group();
    const mainMat = new THREE.MeshStandardMaterial({
      color: colors[powerType] || 0x38bdf8,
      emissive: colors[powerType] || 0x38bdf8,
      emissiveIntensity: 0.45,
      metalness: 0.5,
      roughness: 0.2
    });

    if (powerType === 'magnet') {
      // Bentuk Magnet U 3D Asli
      const arch = new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.14, 14, 24, Math.PI), mainMat);
      group.add(arch);
    } else {
      const sphereCore = new THREE.Mesh(new THREE.SphereGeometry(0.48, 22, 22), mainMat);
      group.add(sphereCore);
    }

    const halo = new THREE.Mesh(
      new THREE.TorusGeometry(0.75, 0.06, 12, 28),
      new THREE.MeshBasicMaterial({ color: 0xffffff })
    );
    group.add(halo);
    group.position.set(this.LANES[lane], y, zPos);
    this.scene.add(group);

    this.itemsList.push({
      type: powerType,
      mesh: group
    });
  }

  spawnParticles(x, y, z, color = 0xfacc15, count = 14) {
    const geo = new THREE.SphereGeometry(0.16, 10, 10);
    const mat = new THREE.MeshBasicMaterial({ color });

    for (let i = 0; i < count; i++) {
      const m = new THREE.Mesh(geo, mat);
      m.position.set(x, y, z);
      this.scene.add(m);
      this.particles.push({
        mesh: m,
        vx: (Math.random() - 0.5) * 10,
        vy: Math.random() * 8 + 2,
        vz: (Math.random() - 0.5) * 10,
        life: 0.55
      });
    }
  }

  activatePowerup(type) {
    const upgrades = this.getUpgrades();
    const bonusSec = (upgrades[type + 'Level'] || 0) * 2.5;
    const baseDurations = {
      magnet: 12,
      jetpack: 8,
      sneakers: 12,
      multiplier: 14
    };
    const dur = (baseDurations[type] || 10) + bonusSec;
    this.powerups[type] = dur;
    window.SoundManager?.playPowerup();

    if (type === 'jetpack') {
      this.isJumping = false;
      this.isRolling = false;
      this.velocityY = 0;
      for (let z = -12; z > -130; z -= 3.2) {
        const lane = Math.floor(Math.random() * 3);
        this.createCoin(this.LANES[lane], 8.5, z);
      }
    }

    this.notifyHUD();
  }

  pauseGame() {
    if (this.state === 'RUNNING') {
      this.state = 'PAUSED';
      window.SoundManager?.setBgmDucking(true);
    }
  }

  resumeGame() {
    if (this.state === 'PAUSED' || this.state === 'QUIZ') {
      this.state = 'RUNNING';
      // Mulai dengan kecepatan pelan lalu akselerasi halus agar pemain tidak kaget saat kembali berlari!
      this.speedScale = 0.25;
      this.lastTime = performance.now();
      window.SoundManager?.setBgmDucking(false);
    }
  }

  triggerQuiz(quizType) {
    this.state = 'QUIZ';
    window.SoundManager?.setBgmDucking(true);
    window.SoundManager?.playQuizOpen();
    if (this.callbacks.onTriggerQuiz) {
      this.callbacks.onTriggerQuiz(quizType, {
        reviveCount: this.reviveCount,
        maxRevives: this.maxRevives
      });
    }
  }

  resolveQuizResult(quizType, isCorrect) {
    this.quizTotal++;
    if (isCorrect) {
      this.quizCorrect++;
    }

    if (quizType === 'bonus') {
      if (isCorrect) {
        this.coins += 100;
        this.score += 500;
        const pTypes = ['magnet', 'jetpack', 'sneakers', 'multiplier'];
        const chosen = pTypes[Math.floor(Math.random() * pTypes.length)];
        this.activatePowerup(chosen);
      }
      this.invincibleTimer = 2.5;
      this.resumeGame();
      this.notifyHUD();
    } else if (quizType === 'revive') {
      if (isCorrect) {
        this.reviveCount++;
        this.invincibleTimer = 3.8;
        this.clearNearbyObstacles();
        this.spawnParticles(this.playerGroup.position.x, this.playerY + 1.2, 0, 0x22c55e, 22);
        this.resumeGame();
        this.notifyHUD();
      } else {
        this.finishGameOver();
      }
    }
  }

  clearNearbyObstacles() {
    for (let i = this.obstacles.length - 1; i >= 0; i--) {
      const obs = this.obstacles[i];
      if (obs.mesh.position.z > -28 && obs.mesh.position.z < 12) {
        this.scene.remove(obs.mesh);
        this.obstacles.splice(i, 1);
      }
    }
  }

  finishGameOver() {
    this.state = 'GAMEOVER';
    window.SoundManager?.stopBgm();
    if (this.callbacks.onGameOver) {
      this.callbacks.onGameOver({
        score: Math.floor(this.score),
        coins: this.coins,
        distance: Math.floor(this.distance),
        quizCorrect: this.quizCorrect,
        quizTotal: this.quizTotal
      });
    }
  }

  /**
   * Menghitung jarak (meter) ke Tiang Pit Stop terdekat di depan pemain
   */
  getNearestPitStopDistance() {
    let minZ = Infinity;
    for (let i = 0; i < this.pitStopGates.length; i++) {
      const g = this.pitStopGates[i];
      if (!g.triggered && g.mesh.position.z <= 1.0) {
        const dist = Math.abs(g.mesh.position.z);
        if (dist < minZ) minZ = dist;
      }
    }
    return minZ === Infinity ? null : Math.round(minZ * 0.65);
  }

  notifyHUD() {
    if (this.callbacks.onUpdateHUD) {
      const activeMult = (this.powerups.multiplier > 0 ? 2 : 1) * this.baseMultiplier;
      this.callbacks.onUpdateHUD({
        score: Math.floor(this.score),
        coins: this.coins,
        distance: Math.floor(this.distance),
        multiplier: activeMult,
        hoverboardActive: this.hoverboardActive,
        hoverboardTimer: this.hoverboardTimer,
        hoverboardCooldown: this.hoverboardCooldown,
        invincibleTimer: this.invincibleTimer,
        powerups: { ...this.powerups },
        quizCorrect: this.quizCorrect,
        quizTotal: this.quizTotal,
        pitStopDistance: this.getNearestPitStopDistance()
      });
    }
  }

  update(dt) {
    if (this.state !== 'RUNNING') {
      if (this.state === 'MENU' && this.playerGroup) {
        const t = performance.now() * 0.0022;
        this.playerGroup.rotation.y = Math.sin(t) * 0.45;
        this.playerMeshGroup.position.y = Math.abs(Math.sin(t * 2)) * 0.12;
      }
      return;
    }

    this.playerGroup.rotation.y = 0;

    // Cek jarak ke Tiang Pit Stop untuk efek pengereman halus (Slow-Motion Approach) biar tidak kaget!
    const nearestPitDist = this.getNearestPitStopDistance();
    let targetSpeedScale = 1.0;
    if (nearestPitDist !== null && nearestPitDist < 16) {
      // Melambat dengan mulus saat memasuki area 16m sebelum Tiang Pit Stop
      targetSpeedScale = Math.max(0.38, nearestPitDist / 18);
    }
    this.speedScale += (targetSpeedScale - this.speedScale) * Math.min(1, dt * 3.5);

    this.speed = Math.min(this.maxSpeed, this.baseSpeed + this.distance * 0.011) * this.speedScale;
    const moveStep = this.speed * dt;
    this.distance += moveStep * 0.45;

    const mult = (this.powerups.multiplier > 0 ? 2 : 1) * this.baseMultiplier;
    this.score += moveStep * 1.6 * mult;

    // Timer Power-Ups
    Object.keys(this.powerups).forEach(k => {
      if (this.powerups[k] > 0) {
        this.powerups[k] = Math.max(0, this.powerups[k] - dt);
      }
    });

    if (this.hoverboardActive) {
      this.hoverboardTimer -= dt;
      if (this.hoverboardTimer <= 0) {
        this.hoverboardActive = false;
        this.hoverboardMesh.visible = false;
        this.hoverboardCooldown = 8;
      }
    } else if (this.hoverboardCooldown > 0) {
      this.hoverboardCooldown = Math.max(0, this.hoverboardCooldown - dt);
    }

    if (this.invincibleTimer > 0) {
      this.invincibleTimer = Math.max(0, this.invincibleTimer - dt);
    }

    this.shieldBubble.visible = this.invincibleTimer > 0;
    if (this.shieldBubble.visible) {
      this.shieldBubble.rotation.y += dt * 2.5;
    }

    this.jetpackMesh.visible = this.powerups.jetpack > 0;
    this.leftShoe.scale.setScalar(this.powerups.sneakers > 0 ? 1.35 : 1.0);
    this.rightShoe.scale.setScalar(this.powerups.sneakers > 0 ? 1.35 : 1.0);

    // Gerakan pindah lajur yang luwes dengan kemiringan tubuh organik
    const dx = this.targetX - this.playerGroup.position.x;
    this.playerGroup.position.x += dx * Math.min(1, dt * 14);
    this.playerMeshGroup.rotation.z = dx * -0.16;
    this.playerMeshGroup.rotation.y = dx * 0.12;

    // Cek ketinggian pijakan (Atap kereta / Ramp)
    let targetGroundY = 0;
    const px = this.playerGroup.position.x;

    for (let i = 0; i < this.obstacles.length; i++) {
      const obs = this.obstacles[i];
      const oz = obs.mesh.position.z;
      const ox = this.LANES[obs.lane];

      if (Math.abs(px - ox) < 1.18 && Math.abs(oz) < obs.halfDepth + 0.55) {
        if (obs.type === 'ramp') {
          targetGroundY = Math.max(targetGroundY, obs.height);
          this.playerY = Math.max(this.playerY, obs.height);
        } else if (obs.type === 'train' && this.playerY >= obs.height - 0.55) {
          targetGroundY = Math.max(targetGroundY, obs.height);
        }
      }
    }
    this.groundY = targetGroundY;

    // Fisika Vertikal
    if (this.powerups.jetpack > 0) {
      this.playerY += (8.5 - this.playerY) * Math.min(1, dt * 7);
      this.velocityY = 0;
      this.isJumping = false;
    } else {
      if (this.playerY > this.groundY || this.velocityY > 0) {
        this.velocityY += this.gravity * dt;
        this.playerY += this.velocityY * dt;
        if (this.playerY <= this.groundY) {
          this.playerY = this.groundY;
          this.velocityY = 0;
          this.isJumping = false;
          this.jumpFlipAngle = 0;
        }
      } else {
        this.playerY = this.groundY;
      }
    }

    // Pose Merunduk (Roll) & Lompat Luwes
    if (this.isRolling) {
      this.rollTimer -= dt;
      this.playerMeshGroup.scale.y = 0.54;
      this.torsoGroup.rotation.x = 0.55;
      if (this.rollTimer <= 0) {
        this.isRolling = false;
        this.playerMeshGroup.scale.y = 1.0;
        this.torsoGroup.rotation.x = 0.12;
      }
    } else {
      this.playerMeshGroup.scale.y = 1.0;
      this.torsoGroup.rotation.x = 0.12; // Condong lari atletis ke depan
    }

    this.playerGroup.position.y = this.playerY;

    // Animasi Sendi Lutut, Siku, Pinggul, & Bahu yang Organik (Tidak Kaku!)
    this.runCycle += dt * (this.speed * 0.65);
    if (this.powerups.jetpack > 0) {
      this.leftLeg.rotation.x = 0.25;
      this.rightLeg.rotation.x = 0.25;
      this.leftKnee.rotation.x = 0.35;
      this.rightKnee.rotation.x = 0.35;
      this.leftArm.rotation.x = -0.6;
      this.rightArm.rotation.x = -0.6;
      this.playerMeshGroup.position.y = Math.sin(this.runCycle * 0.5) * 0.15;
    } else if (this.isJumping) {
      this.leftLeg.rotation.x = -0.65;
      this.leftKnee.rotation.x = 0.85;
      this.rightLeg.rotation.x = 0.35;
      this.rightKnee.rotation.x = 0.45;
      this.leftArm.rotation.x = -1.1;
      this.rightArm.rotation.x = -1.1;
      this.leftElbow.rotation.x = -0.6;
      this.rightElbow.rotation.x = -0.6;
      this.playerMeshGroup.position.y = 0;
    } else if (this.hoverboardActive) {
      // Pose berselancar keren di atas Hoverboard
      this.leftLeg.rotation.x = -0.25;
      this.rightLeg.rotation.x = 0.25;
      this.leftKnee.rotation.x = 0.3;
      this.rightKnee.rotation.x = 0.3;
      this.leftArm.rotation.z = -0.45;
      this.rightArm.rotation.z = 0.45;
      this.playerMeshGroup.position.y = Math.sin(this.runCycle * 0.6) * 0.1;
    } else {
      const s = Math.sin(this.runCycle);
      const c = Math.cos(this.runCycle);

      this.leftArm.rotation.z = 0;
      this.rightArm.rotation.z = 0;

      // Ayunan Paha & Tekukan Lutut Alami
      this.leftLeg.rotation.x = s * 0.85;
      this.rightLeg.rotation.x = -s * 0.85;
      this.leftKnee.rotation.x = Math.max(0.1, -c * 0.95);
      this.rightKnee.rotation.x = Math.max(0.1, c * 0.95);

      // Ayunan Bahu & Tekukan Siku Alami
      this.leftArm.rotation.x = -s * 0.78;
      this.rightArm.rotation.x = s * 0.78;
      this.leftElbow.rotation.x = -0.55 - Math.max(0, s * 0.45);
      this.rightElbow.rotation.x = -0.55 - Math.max(0, -s * 0.45);

      // Pantulan vertikal tubuh (Vertical Bounce) & rotasi bahu
      this.playerMeshGroup.position.y = Math.abs(s) * 0.14;
      this.torsoGroup.rotation.y = s * 0.14;
      this.headGroup.rotation.y = -s * 0.08;
    }

    // Karakter pengejar
    if (this.chaserVisibleTimer > 0) {
      this.chaserVisibleTimer -= dt;
      this.chaserGroup.visible = true;
      this.chaserGroup.position.x += (this.playerGroup.position.x - this.chaserGroup.position.x) * dt * 6;
      this.chaserGroup.position.z = 3.2 + (4.5 - this.chaserVisibleTimer) * 0.6;
      this.chaserGroup.position.y = Math.abs(Math.sin(this.runCycle)) * 0.22;
    } else {
      this.chaserGroup.visible = false;
    }

    // Pergerakan dunia 3D (Bantalan rel, gedung, pohon, awan)
    this.trackSleepers.forEach(sl => {
      sl.position.z += moveStep;
      if (sl.position.z > 15) sl.position.z -= 186;
    });

    this.buildings.forEach(b => {
      b.position.z += moveStep * 0.85;
      if (b.position.z > 20) b.position.z -= 195;
    });

    this.sceneryProps.forEach(p => {
      p.position.z += moveStep * 0.92;
      if (p.position.z > 18) p.position.z -= 195;
    });

    this.clouds.forEach(cl => {
      cl.position.z += moveStep * 0.18;
      if (cl.position.z > 25) cl.position.z -= 185;
    });

    // Spawn gelombang baru
    this.spawnZ += moveStep;
    while (this.spawnZ > -155) {
      this.spawnWave(this.spawnZ);
      this.spawnZ -= 26 + Math.random() * 4;
    }

    this.updatePitStopGates(dt, moveStep);
    this.updateObstacles(dt, moveStep);
    this.updateCoins(dt, moveStep);
    this.updateItems(dt, moveStep);
    this.updateParticles(dt);

    // Kamera dinamis yang halus mengikuti ketinggian & lajur pemain
    const camTargetY = 6.2 + this.playerY * 0.45;
    this.camera.position.y += (camTargetY - this.camera.position.y) * Math.min(1, dt * 6);

    if (this.cameraShake > 0) {
      this.cameraShake = Math.max(0, this.cameraShake - dt * 2.5);
      this.camera.position.x = (Math.random() - 0.5) * this.cameraShake;
    } else {
      this.camera.position.x += (this.playerGroup.position.x * 0.32 - this.camera.position.x) * Math.min(1, dt * 7);
    }

    this.notifyHUD();
  }

  updatePitStopGates(dt, moveStep) {
    for (let i = this.pitStopGates.length - 1; i >= 0; i--) {
      const gate = this.pitStopGates[i];
      gate.mesh.position.z += moveStep;

      if (gate.mesh.position.z > 18) {
        this.scene.remove(gate.mesh);
        this.pitStopGates.splice(i, 1);
        continue;
      }

      // Saat pemain melewati garis Tiang Pit Stop Kuis (z >= -0.8)
      if (!gate.triggered && gate.mesh.position.z >= -0.8) {
        gate.triggered = true;
        this.spawnParticles(this.playerGroup.position.x, this.playerY + 1.5, 0, 0xfacc15, 22);
        this.triggerQuiz('bonus');
      }
    }
  }

  updateObstacles(dt, moveStep) {
    const px = this.playerGroup.position.x;
    const py = this.playerY;
    const playerTop = py + (this.isRolling ? 1.1 : 2.5);

    for (let i = this.obstacles.length - 1; i >= 0; i--) {
      const obs = this.obstacles[i];
      obs.mesh.position.z += moveStep + (obs.speedOffset || 0) * dt;
      const oz = obs.mesh.position.z;

      if (oz > 18) {
        this.scene.remove(obs.mesh);
        this.obstacles.splice(i, 1);
        continue;
      }

      if (this.powerups.jetpack > 0) continue;

      const ox = this.LANES[obs.lane];
      const inSameLane = Math.abs(px - ox) < 1.05;
      const inZRange = Math.abs(oz) < obs.halfDepth + 0.42;

      if (inSameLane && inZRange) {
        if (obs.type === 'ramp') continue;

        let hit = false;
        if (obs.type === 'train') {
          if (py < obs.height - 0.5) hit = true;
        } else if (obs.type === 'low_barrier') {
          if (py < 1.15) hit = true;
        } else if (obs.type === 'high_barrier') {
          if (playerTop > 1.35) hit = true;
        }

        if (hit) {
          this.handleObstacleCollision(obs, i);
          break;
        }
      }
    }
  }

  handleObstacleCollision(obs, index) {
    if (this.invincibleTimer > 0) {
      this.spawnParticles(obs.mesh.position.x, 1.5, obs.mesh.position.z, 0x38bdf8, 16);
      this.scene.remove(obs.mesh);
      this.obstacles.splice(index, 1);
      window.SoundManager?.playShieldBreak();
      return;
    }

    if (this.hoverboardActive) {
      this.hoverboardActive = false;
      this.hoverboardMesh.visible = false;
      this.hoverboardCooldown = 10;
      this.invincibleTimer = 2.5;
      this.cameraShake = 0.7;
      this.spawnParticles(obs.mesh.position.x, 1.5, obs.mesh.position.z, 0x06b6d4, 22);
      this.scene.remove(obs.mesh);
      this.obstacles.splice(index, 1);
      window.SoundManager?.playShieldBreak();
      this.notifyHUD();
      return;
    }

    this.cameraShake = 1.0;
    this.chaserVisibleTimer = 4.5;
    window.SoundManager?.playCrash();

    if (this.reviveCount < this.maxRevives) {
      this.triggerQuiz('revive');
    } else {
      this.finishGameOver();
    }
  }

  updateCoins(dt, moveStep) {
    const px = this.playerGroup.position.x;
    const py = this.playerY + 1.1;
    const magnetActive = this.powerups.magnet > 0;

    for (let i = this.coinsList.length - 1; i >= 0; i--) {
      const c = this.coinsList[i];
      c.mesh.position.z += moveStep;
      c.mesh.rotation.y += dt * 4.2;

      if (c.mesh.position.z > 12) {
        this.scene.remove(c.mesh);
        this.coinsList.splice(i, 1);
        continue;
      }

      if (magnetActive && c.mesh.position.z > -18 && c.mesh.position.z < 4) {
        c.mesh.position.x += (px - c.mesh.position.x) * Math.min(1, dt * 14);
        c.mesh.position.y += (py - c.mesh.position.y) * Math.min(1, dt * 14);
      }

      const dx = Math.abs(c.mesh.position.x - px);
      const dy = Math.abs(c.mesh.position.y - py);
      const dz = Math.abs(c.mesh.position.z);

      if (dx < 1.15 && dy < 1.45 && dz < 1.15) {
        this.coins++;
        this.score += 15 * (this.powerups.multiplier > 0 ? 2 : 1);
        window.SoundManager?.playCoin();
        this.spawnParticles(c.mesh.position.x, c.mesh.position.y, c.mesh.position.z, 0xfacc15, 6);
        this.scene.remove(c.mesh);
        this.coinsList.splice(i, 1);
      }
    }
  }

  updateItems(dt, moveStep) {
    const px = this.playerGroup.position.x;
    const py = this.playerY + 1.1;

    for (let i = this.itemsList.length - 1; i >= 0; i--) {
      const item = this.itemsList[i];
      item.mesh.position.z += moveStep;
      item.mesh.rotation.y += dt * 3.2;

      if (item.mesh.position.z > 12) {
        this.scene.remove(item.mesh);
        this.itemsList.splice(i, 1);
        continue;
      }

      const dx = Math.abs(item.mesh.position.x - px);
      const dy = Math.abs(item.mesh.position.y - py);
      const dz = Math.abs(item.mesh.position.z);

      if (dx < 1.25 && dy < 1.6 && dz < 1.25) {
        const type = item.type;
        this.spawnParticles(item.mesh.position.x, item.mesh.position.y, item.mesh.position.z, 0x38bdf8, 14);
        this.scene.remove(item.mesh);
        this.itemsList.splice(i, 1);
        this.activatePowerup(type);
      }
    }
  }

  updateParticles(dt) {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.life -= dt;
      if (p.life <= 0) {
        this.scene.remove(p.mesh);
        this.particles.splice(i, 1);
        continue;
      }
      p.mesh.position.x += p.vx * dt;
      p.mesh.position.y += p.vy * dt;
      p.mesh.position.z += p.vz * dt;
      p.mesh.scale.setScalar(Math.max(0.1, p.life * 1.8));
    }
  }

  animate(now) {
    const dt = Math.min(0.05, (now - this.lastTime) / 1000);
    this.lastTime = now;

    this.update(dt);
    this.renderer.render(this.scene, this.camera);

    requestAnimationFrame(this.animate);
  }
}

window.SubwayGame3D = SubwayGame3D;
