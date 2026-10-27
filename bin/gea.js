#!/usr/bin/env node
import path from 'path';
import { fileURLToPath } from 'url';
import { detectGameEngine } from '../src/adapters/engineDetector.js';
import { extractGameAssets } from '../src/adapters/assetExtractor.js';
import { exportToCocosProject } from '../src/adapters/cocosExporter.js';
import { startMcpServer } from '../src/server.js';

const args = process.argv.slice(2);
const command = args[0];

async function main() {
  if (!command || command === '--help' || command === '-h') {
    console.log(`
🎮 GEA (Game Engineer Anything) - CLI & MCP Tool v1.0.0
Inspired by morluto/rea: Reverse engineer games, extract assets, and port to Cocos.

Usage:
  gea inspect <targetDir>                     Detect game engine (Cocos/Unity/Phaser/etc.)
  gea extract <targetDir> -o <outputDir>      Extract & classify textures, audios, atlases
  gea port <assetsDir> -o <cocosProjectDir>   Port extracted assets into a Cocos Creator 3.x project
  gea mcp                                     Launch Model Context Protocol (MCP) stdio server

Examples:
  npx gea inspect ./my-h5-game
  npx gea extract ./my-h5-game -o ./unpacked-assets
  npx gea port ./unpacked-assets -o ./CocosProject
    `);
    process.exit(0);
  }

  if (command === 'mcp') {
    startMcpServer();
    return;
  }

  if (command === 'inspect') {
    const target = args[1] || '.';
    const absPath = path.resolve(process.cwd(), target);
    console.log(`🔍 Inspecting target: ${absPath}...`);
    const report = await detectGameEngine(absPath);
    console.log('\n📊 Engine Detection Report:');
    console.log(JSON.stringify(report, null, 2));
    return;
  }

  if (command === 'extract') {
    const target = args[1] || '.';
    const outIdx = args.indexOf('-o');
    const out = outIdx !== -1 && args[outIdx + 1] ? args[outIdx + 1] : './gea-extracted';
    const absSrc = path.resolve(process.cwd(), target);
    const absOut = path.resolve(process.cwd(), out);

    console.log(`📦 Extracting assets from ${absSrc} to ${absOut}...`);
    const res = await extractGameAssets(absSrc, absOut);
    console.log(`✅ Success! Extracted ${res.totalCount} assets (${res.textures.length} textures, ${res.audios.length} audios).`);
    return;
  }

  if (command === 'port') {
    const target = args[1] || '.';
    const outIdx = args.indexOf('-o');
    const out = outIdx !== -1 && args[outIdx + 1] ? args[outIdx + 1] : './CocosProject';
    const absSrc = path.resolve(process.cwd(), target);
    const absOut = path.resolve(process.cwd(), out);

    console.log(`🚀 Porting assets to Cocos Creator project at ${absOut}...`);
    const manifest = await extractGameAssets(absSrc, absSrc);
    const res = await exportToCocosProject(manifest, {}, absOut);
    console.log(`🎉 Cocos Creator project created successfully at: ${res.targetDirectory}`);
    return;
  }

  console.error(`Unknown command: ${command}. Use "gea --help" for assistance.`);
  process.exit(1);
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
