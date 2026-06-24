import sharp from 'sharp';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');

// 1. Generate og-default.png (1200x630)
const ogWidth = 1200;
const ogHeight = 630;
const ogSvg = `<svg width="${ogWidth}" height="${ogHeight}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#D97706"/>
      <stop offset="100%" style="stop-color:#B45309"/>
    </linearGradient>
  </defs>
  <rect width="${ogWidth}" height="${ogHeight}" fill="url(#bg)"/>
  <rect x="60" y="60" width="${ogWidth - 120}" height="${ogHeight - 120}" rx="24" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="2"/>
  <text x="600" y="260" font-family="Arial, Helvetica, sans-serif" font-size="72" font-weight="bold" fill="white" text-anchor="middle">Auto-Entrepreneur</text>
  <text x="600" y="350" font-family="Arial, Helvetica, sans-serif" font-size="72" font-weight="bold" fill="white" text-anchor="middle">Maroc</text>
  <text x="600" y="440" font-family="Arial, Helvetica, sans-serif" font-size="30" fill="rgba(255,255,255,0.85)" text-anchor="middle">Calculateur charges, factures et suivi CA</text>
  <rect x="480" y="470" width="240" height="4" rx="2" fill="rgba(255,255,255,0.4)"/>
  <text x="600" y="540" font-family="Arial, Helvetica, sans-serif" font-size="22" fill="rgba(255,255,255,0.7)" text-anchor="middle">autoentrepreneurmaroc.ma</text>
</svg>`;

await sharp(Buffer.from(ogSvg)).png().toFile(join(publicDir, 'og-default.png'));
console.log('Created og-default.png');

// 2. Generate icon-192.png
const iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="82" fill="#D97706"/>
  <text x="256" y="348" font-family="Arial, Helvetica, sans-serif" font-size="320" font-weight="bold" fill="white" text-anchor="middle">A</text>
</svg>`;

await sharp(Buffer.from(iconSvg)).resize(192, 192).png().toFile(join(publicDir, 'icon-192.png'));
console.log('Created icon-192.png');

// 3. Generate icon-512.png
await sharp(Buffer.from(iconSvg)).resize(512, 512).png().toFile(join(publicDir, 'icon-512.png'));
console.log('Created icon-512.png');

// 4. Generate favicon.ico from the icon (32x32 PNG used as .ico)
await sharp(Buffer.from(iconSvg)).resize(32, 32).png().toFile(join(publicDir, 'favicon.ico'));
console.log('Created favicon.ico');

console.log('All assets generated successfully.');
