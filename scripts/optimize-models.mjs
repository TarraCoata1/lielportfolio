import { NodeIO } from '@gltf-transform/core';
import { ALL_EXTENSIONS } from '@gltf-transform/extensions';
import { dedup, prune, weld, simplify, textureCompress, meshopt } from '@gltf-transform/functions';
import { MeshoptDecoder, MeshoptEncoder, MeshoptSimplifier } from 'meshoptimizer';
import sharp from 'sharp';
import { readdir, mkdir, stat, writeFile } from 'node:fs/promises';

await Promise.all([MeshoptDecoder.ready, MeshoptEncoder.ready, MeshoptSimplifier.ready]);
const io = new NodeIO().registerExtensions(ALL_EXTENSIONS).registerDependencies({ 'meshopt.decoder': MeshoptDecoder, 'meshopt.encoder': MeshoptEncoder });
await mkdir('public/models/web', { recursive: true });
const report = [];
for (const file of (await readdir('source-assets/models')).filter(f => f.endsWith('.glb'))) {
  const input = `source-assets/models/${file}`;
  const output = `public/models/web/${file}`;
  const doc = await io.read(input);
  await doc.transform(dedup(), weld(), simplify({ simplifier: MeshoptSimplifier, ratio: 0.35, error: 0.001 }), prune(), textureCompress({ encoder: sharp, targetFormat: 'webp', resize: [1024, 1024], quality: 85 }), meshopt({ encoder: MeshoptEncoder, level: 'medium' }));
  await io.write(output, doc);
  const row = { file, sourceBytes: (await stat(input)).size, webBytes: (await stat(output)).size };
  report.push(row);
  console.log(`${file}: ${(row.sourceBytes/1e6).toFixed(1)} → ${(row.webBytes/1e6).toFixed(2)} MB`);
}
await writeFile('public/models/web/report.json', JSON.stringify(report, null, 2));
