import fs from 'fs';
import path from 'path';

/**
 * 引擎特征指纹库
 */
const ENGINE_FINGERPRINTS = [
  {
    name: 'Cocos Creator (3.x / 2.x)',
    type: 'cocos',
    markers: ['cc.', 'CocosCreator', 'cocos-js', 'cocos-creator-js', 'application.js', 'src/settings.json', 'assets/main']
  },
  {
    name: 'Unity WebGL',
    type: 'unity',
    markers: ['createUnityInstance', 'UnityLoader', 'unityFramework', '.wasm.unityweb', 'Build/']
  },
  {
    name: 'Phaser.js',
    type: 'phaser',
    markers: ['Phaser.Game', 'Phaser.AUTO', 'phaser.min.js']
  },
  {
    name: 'Pixi.js / PlayCanvas',
    type: 'pixi',
    markers: ['PIXI.Application', 'pc.Application']
  },
  {
    name: 'Pure Web Canvas / Custom H5',
    type: 'custom_canvas',
    markers: ['getContext("2d")', 'requestAnimationFrame']
  }
];

export async function detectGameEngine(targetPath) {
  if (!fs.existsSync(targetPath)) {
    throw new Error(`Target path does not exist: ${targetPath}`);
  }

  const stat = fs.statSync(targetPath);
  const filesToCheck = [];

  if (stat.isDirectory()) {
    // 收集根目录及浅层文件
    const items = fs.readdirSync(targetPath);
    for (const item of items) {
      const full = path.join(targetPath, item);
      if (fs.statSync(full).isFile() && (item.endsWith('.js') || item.endsWith('.html') || item.endsWith('.json'))) {
        filesToCheck.push(full);
      }
    }
  } else {
    filesToCheck.push(targetPath);
  }

  // 扫描特征
  const matches = {};
  for (const f of filesToCheck) {
    try {
      const content = fs.readFileSync(f, 'utf-8').slice(0, 500000); // 截取前 500KB 扫描特征
      for (const engine of ENGINE_FINGERPRINTS) {
        for (const marker of engine.markers) {
          if (content.includes(marker)) {
            matches[engine.name] = (matches[engine.name] || 0) + 1;
          }
        }
      }
    } catch (e) {}
  }

  // 判定最佳匹配
  let detected = 'Unknown / Proprietary Engine';
  let maxScore = 0;
  for (const [name, score] of Object.entries(matches)) {
    if (score > maxScore) {
      maxScore = score;
      detected = name;
    }
  }

  return {
    target: targetPath,
    engine: detected,
    confidence: maxScore > 2 ? 'HIGH' : (maxScore > 0 ? 'MEDIUM' : 'LOW'),
    scannedFilesCount: filesToCheck.length,
    timestamp: new Date().toISOString()
  };
}
