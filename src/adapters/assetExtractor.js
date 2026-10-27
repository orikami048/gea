import fs from 'fs';
import path from 'path';

const ASSET_EXTENSIONS = {
  texture: ['.png', '.jpg', '.jpeg', '.webp', '.svg', '.hdr', '.exr'],
  audio: ['.mp3', '.ogg', '.wav', '.m4a'],
  atlas: ['.atlas', '.plist', '.fnt'],
  model: ['.json', '.gltf', '.glb', '.bin', '.obj', '.fbx']
};

function getAllFiles(dirPath, arrayOfFiles = []) {
  if (!fs.existsSync(dirPath)) return arrayOfFiles;
  const files = fs.readdirSync(dirPath);

  files.forEach(file => {
    const fullPath = path.join(dirPath, file);
    try {
      if (fs.statSync(fullPath).isDirectory()) {
        arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
      } else {
        arrayOfFiles.push(fullPath);
      }
    } catch (e) {}
  });

  return arrayOfFiles;
}

export async function extractGameAssets(sourceDir, outputDir) {
  if (!fs.existsSync(sourceDir)) {
    throw new Error(`Source directory does not exist: ${sourceDir}`);
  }

  const allFiles = getAllFiles(sourceDir);
  const result = {
    textures: [],
    audios: [],
    atlases: [],
    totalCount: 0
  };

  const targetDirs = {
    texture: path.join(outputDir, 'textures'),
    audio: path.join(outputDir, 'audio'),
    atlas: path.join(outputDir, 'atlas')
  };

  Object.values(targetDirs).forEach(d => fs.mkdirSync(d, { recursive: true }));

  allFiles.forEach(file => {
    const ext = path.extname(file).toLowerCase();
    const basename = path.basename(file);

    if (ASSET_EXTENSIONS.texture.includes(ext)) {
      const dest = path.join(targetDirs.texture, basename);
      fs.copyFileSync(file, dest);
      result.textures.push({ name: basename, path: dest, size: fs.statSync(file).size });
      result.totalCount++;
    } else if (ASSET_EXTENSIONS.audio.includes(ext)) {
      const dest = path.join(targetDirs.audio, basename);
      fs.copyFileSync(file, dest);
      result.audios.push({ name: basename, path: dest, size: fs.statSync(file).size });
      result.totalCount++;
    } else if (ASSET_EXTENSIONS.atlas.includes(ext)) {
      const dest = path.join(targetDirs.atlas, basename);
      fs.copyFileSync(file, dest);
      result.atlases.push({ name: basename, path: dest, size: fs.statSync(file).size });
      result.totalCount++;
    }
  });

  return result;
}
