import readline from 'readline';
import { detectGameEngine } from './adapters/engineDetector.js';
import { extractGameAssets } from './adapters/assetExtractor.js';
import { exportToCocosProject } from './adapters/cocosExporter.js';

/**
 * GEA Model Context Protocol (MCP) stdio Server
 * 符合 Anthropic MCP 标准契约
 */
const TOOLS = [
  {
    name: 'gea_inspect_target',
    description: 'Inspect a game directory or bundle, automatically detecting the underlying engine (Cocos Creator, Unity WebGL, Phaser, Pixi, etc.).',
    inputSchema: {
      type: 'object',
      properties: {
        targetPath: {
          type: 'string',
          description: 'Absolute or relative path to the game directory or bundle.'
        }
      },
      required: ['targetPath']
    }
  },
  {
    name: 'gea_extract_assets',
    description: 'Extract and classify textures (PNG/JPG/WebP), audio (MP3/OGG/WAV), and atlases from a target game package into structured directories.',
    inputSchema: {
      type: 'object',
      properties: {
        sourcePath: {
          type: 'string',
          description: 'Path to the game assets directory.'
        },
        outputPath: {
          type: 'string',
          description: 'Destination directory to store the unpacked assets.'
        }
      },
      required: ['sourcePath', 'outputPath']
    }
  },
  {
    name: 'gea_export_to_cocos',
    description: 'Directly port and reconstruct extracted game assets into a standardized Cocos Creator 3.x project structure ready to open and build.',
    inputSchema: {
      type: 'object',
      properties: {
        assetSourceDir: {
          type: 'string',
          description: 'Directory containing extracted textures and audio.'
        },
        cocosProjectDir: {
          type: 'string',
          description: 'Target directory for the newly generated Cocos Creator project.'
        },
        configData: {
          type: 'object',
          description: 'Optional game configuration or balance numbers extracted from the original game.'
        }
      },
      required: ['assetSourceDir', 'cocosProjectDir']
    }
  }
];

export function startMcpServer() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
  });

  rl.on('line', async (line) => {
    if (!line.trim()) return;
    try {
      const msg = JSON.parse(line);
      const { id, method, params } = msg;

      if (method === 'initialize') {
        sendResponse(id, {
          protocolVersion: '2024-11-05',
          capabilities: { tools: {} },
          serverInfo: { name: 'gea-mcp', version: '1.0.0' }
        });
      } else if (method === 'tools/list') {
        sendResponse(id, { tools: TOOLS });
      } else if (method === 'tools/call') {
        const { name, arguments: args } = params;
        let result = {};

        if (name === 'gea_inspect_target') {
          result = await detectGameEngine(args.targetPath);
        } else if (name === 'gea_extract_assets') {
          result = await extractGameAssets(args.sourcePath, args.outputPath);
        } else if (name === 'gea_export_to_cocos') {
          const assets = await extractGameAssets(args.assetSourceDir, args.assetSourceDir);
          result = await exportToCocosProject(assets, args.configData || {}, args.cocosProjectDir);
        } else {
          throw new Error(`Unknown tool: ${name}`);
        }

        sendResponse(id, {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2)
            }
          ]
        });
      }
    } catch (err) {
      console.error('[GEA MCP Error]', err.message);
    }
  });

  function sendResponse(id, result) {
    process.stdout.write(JSON.stringify({ jsonrpc: '2.0', id, result }) + '\n');
  }
}

if (process.argv[1]?.endsWith('server.js')) {
  startMcpServer();
}
