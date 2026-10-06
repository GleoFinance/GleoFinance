/* Generates every brand raster from one vector mark.
 *
 *   npm run brand
 *
 * Outputs:
 *   public/brand/gleo-mark.webp      512 px mark on transparent
 *   public/brand/gleo-plate.webp     512 px mark on the favicon plate
 *   src/app/icon.png                 512 px plate (browsers, PWA)
 *   src/app/apple-icon.png           180 px plate (iOS home screen)
 *   src/app/favicon.ico              16/32/48 px PNG entries in an ICO container
 *   src/app/opengraph-image.jpg      1200x630 social card
 *   src/app/twitter-image.jpg        same card for X
 *
 * To use the owner's own logo later, replace MARK_SVG below with the logo's
 * SVG (or load a PNG with sharp) and run the script again.
 */
import sharp from "sharp";
import { writeFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const ROOT = new URL("../", import.meta.url);
const out = (p) => fileURLToPath(new URL(p, ROOT));

const INK = "#0a1c24";
const FOG = "#e6eeeb";
const SEA = "#0c7a64";
const FLARE = "#e8612d";
// Mid-tone plate: about 3.8:1 against both a light (#f2f2f2) and a dark
// (#202124) browser tab strip, so the favicon reads in either theme.
const PLATE = "#138a72";

// The mark: a G drawn as a globe whose open side lets a payment (the dot) out.
const markPaths = (stroke, dot) => `
  <path d="M24.43 8.93 A11 11 0 1 0 27 16 H17.2" fill="none" stroke="${stroke}" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M16 5 C11.2 9.4 11.2 22.6 16 27" fill="none" stroke="${stroke}" stroke-width="1.3" stroke-linecap="round" opacity="0.55"/>
  <circle cx="26.6" cy="6.3" r="2.5" fill="${dot}"/>`;

export const MARK_SVG = (stroke = INK, dot = FLARE) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">${markPaths(stroke, dot)}</svg>`;

const plateSvg = (size, radius) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="${radius}" fill="${PLATE}"/>
  <g transform="translate(2.2 2.6) scale(0.86)">${markPaths("#ffffff", "#ffd2bd")}</g>
</svg>`;

function ico(pngs) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(pngs.length, 4);
  let offset = 6 + 16 * pngs.length;
  const entries = pngs.map(({ size, data }) => {
    const e = Buffer.alloc(16);
    e.writeUInt8(size >= 256 ? 0 : size, 0);
    e.writeUInt8(size >= 256 ? 0 : size, 1);
    e.writeUInt8(0, 2);
    e.writeUInt8(0, 3);
    e.writeUInt16LE(1, 4);
    e.writeUInt16LE(32, 6);
    e.writeUInt32LE(data.length, 8);
    e.writeUInt32LE(offset, 12);
    offset += data.length;
    return e;
  });
  return Buffer.concat([header, ...entries, ...pngs.map((p) => p.data)]);
}

const lines = Array.from({ length: 15 }, (_, i) => `<line x1="${i * 88}" y1="0" x2="${i * 88}" y2="630" stroke="${FOG}" stroke-opacity="0.07"/>`).join("") +
  Array.from({ length: 8 }, (_, i) => `<line x1="0" y1="${i * 88}" x2="1200" y2="${i * 88}" stroke="${FOG}" stroke-opacity="0.05"/>`).join("");

const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${INK}"/>
  ${lines}
  <path d="M860 250 C 920 110, 1060 100, 1130 190" fill="none" stroke="${SEA}" stroke-width="3" stroke-dasharray="8 10"/>
  <path d="M840 400 C 900 300, 1040 290, 1120 350" fill="none" stroke="${FOG}" stroke-opacity="0.35" stroke-width="2" stroke-dasharray="6 10"/>
  <circle cx="860" cy="250" r="9" fill="${SEA}"/><circle cx="1130" cy="190" r="9" fill="${FLARE}"/>
  <circle cx="840" cy="400" r="6" fill="${FOG}" fill-opacity="0.6"/><circle cx="1120" cy="350" r="6" fill="${FOG}" fill-opacity="0.6"/>
  <g transform="translate(80 84) scale(2.4)">${markPaths(FOG, FLARE)}</g>
  <text x="170" y="134" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="54" font-weight="700" fill="${FOG}">Gleo</text>
  <text x="80" y="330" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="76" font-weight="700" fill="${FOG}" letter-spacing="-2">Global Finance.</text>
  <text x="80" y="414" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="76" font-weight="700" fill="${FLARE}" letter-spacing="-2">No Borders.</text>
  <text x="80" y="512" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="25" fill="${FOG}" fill-opacity="0.75">Cross-border payments in seconds. Assets tokenized instantly.</text>
  <text x="80" y="548" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="25" fill="${FOG}" fill-opacity="0.75">DeFi reimagined. On Robinhood Chain.</text>
  <text x="1120" y="584" text-anchor="end" font-family="Menlo, monospace" font-size="20" fill="${FOG}" fill-opacity="0.55">gleo.finance · $GLEO</text>
</svg>`;

await mkdir(out("public/brand/"), { recursive: true });
await sharp(Buffer.from(MARK_SVG()), { density: 1200 }).resize(512, 512).webp({ quality: 92 }).toFile(out("public/brand/gleo-mark.webp"));
const plate = (size) => sharp(Buffer.from(plateSvg(size, 7)), { density: 1200 }).resize(size, size).png().toBuffer();
await sharp(await plate(512)).webp({ quality: 92 }).toFile(out("public/brand/gleo-plate.webp"));
await writeFile(out("src/app/icon.png"), await plate(512));
await writeFile(out("src/app/apple-icon.png"), await sharp(Buffer.from(plateSvg(180, 0)), { density: 600 }).resize(180, 180).png().toBuffer());
const sizes = [16, 32, 48];
await writeFile(out("src/app/favicon.ico"), ico(await Promise.all(sizes.map(async (size) => ({ size, data: await sharp(await plate(size)).ensureAlpha().png().toBuffer() })))));
const card = await sharp(Buffer.from(og), { density: 144 }).resize(1200, 630).jpeg({ quality: 88 }).toBuffer();
await writeFile(out("src/app/opengraph-image.jpg"), card);
await writeFile(out("src/app/twitter-image.jpg"), card);
await sharp(card).webp({ quality: 85 }).toFile(out("public/brand/og.webp"));
console.log("brand assets written");
