import fs from 'fs';
import path from 'path';

/**
 * 将提取出的游戏资产，自动封装并生成一个极简、开箱即用的现代化 Three.js WebGL 工程
 */
export async function exportToThreeJsProject(assetManifest, gameConfig, targetOutputDir) {
  fs.mkdirSync(targetOutputDir, { recursive: true });

  const dirs = [
    path.join(targetOutputDir, 'public', 'assets', 'textures'),
    path.join(targetOutputDir, 'public', 'assets', 'models'),
    path.join(targetOutputDir, 'public', 'assets', 'audio'),
    path.join(targetOutputDir, 'src')
  ];
  dirs.forEach(d => fs.mkdirSync(d, { recursive: true }));

  // 1. 生成 package.json (Vite + Three.js)
  const pkgJson = {
    "name": path.basename(targetOutputDir),
    "version": "1.0.0",
    "type": "module",
    "scripts": {
      "dev": "vite",
      "build": "vite build",
      "preview": "vite preview"
    },
    "dependencies": {
      "three": "^0.160.0"
    },
    "devDependencies": {
      "vite": "^5.0.0"
    }
  };
  fs.writeFileSync(path.join(targetOutputDir, 'package.json'), JSON.stringify(pkgJson, null, 2));

  // 2. 生成 index.html
  const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${path.basename(targetOutputDir)} - Three.js WebGL Game</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { overflow: hidden; background: #050d1a; font-family: sans-serif; }
    #canvas-container { width: 100vw; height: 100vh; display: block; }
    #hud {
      position: absolute;
      top: 20px;
      left: 20px;
      color: #fff;
      background: rgba(0,0,0,0.6);
      padding: 10px 18px;
      border-radius: 12px;
      backdrop-filter: blur(8px);
      pointer-events: none;
    }
  </style>
</head>
<body>
  <div id="canvas-container"></div>
  <div id="hud">
    <h2>🎮 Three.js Game (Ported by GEA)</h2>
    <p>3D WebGL Scene Initialized</p>
  </div>
  <script type="module" src="/src/main.js"></script>
</body>
</html>
`;
  fs.writeFileSync(path.join(targetOutputDir, 'index.html'), indexHtml);

  // 3. 生成 src/main.js (标准 Three.js 场景 + 基础光照 + 水面网格 + 动画循环)
  const mainJs = `import * as THREE from 'three';

// 场景初始化
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0a192f);
scene.fog = new THREE.FogExp2(0x0a192f, 0.025);

// 相机
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 15, 25);
camera.lookAt(0, 0, 0);

// 渲染器
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
document.getElementById('canvas-container').appendChild(renderer.domElement);

// 环境光与平行光
const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
dirLight.position.set(15, 25, 10);
dirLight.castShadow = true;
scene.add(dirLight);

// 3D 动态波浪水面 (Water Plane)
const waterGeo = new THREE.PlaneGeometry(60, 60, 32, 32);
const waterMat = new THREE.MeshStandardMaterial({
  color: 0x0077be,
  roughness: 0.2,
  metalness: 0.8,
  wireframe: false
});
const waterMesh = new THREE.Mesh(waterGeo, waterMat);
waterMesh.rotation.x = -Math.PI / 2;
scene.add(waterMesh);

// 窗口自适应
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// 主循环
let clock = new THREE.Clock();
function animate() {
  requestAnimationFrame(animate);
  const time = clock.getElapsedTime();
  
  // 水面微波波动动画
  const pos = waterGeo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const u = pos.getX(i);
    const v = pos.getY(i);
    pos.setZ(i, Math.sin(u * 0.4 + time * 2) * Math.cos(v * 0.4 + time * 2) * 0.4);
  }
  waterGeo.computeVertexNormals();
  pos.needsUpdate = true;

  renderer.render(scene, camera);
}
animate();
console.log('[GEA] Three.js WebGL Project Ready!');
`;
  fs.writeFileSync(path.join(targetOutputDir, 'src', 'main.js'), mainJs);

  // 4. 拷贝资产
  if (assetManifest && assetManifest.textures) {
    assetManifest.textures.forEach(t => {
      if (fs.existsSync(t.path)) {
        fs.copyFileSync(t.path, path.join(targetOutputDir, 'public', 'assets', 'textures', t.name));
      }
    });
  }

  return {
    success: true,
    engine: 'Three.js',
    targetDirectory: targetOutputDir
  };
}
