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

const INK = "#0f0f0f";
const PAPER = "#ffffff";
const YELLOW = "#fdda24";
const LAVENDER = "#b7ace8";
// Mid-tone teal plate: about 3.7:1 against a light (#f2f2f2) and 3.9:1
// against a dark (#202124) browser tab strip, so the favicon reads in both.
const PLATE = "#00899a";

// The mark: a G drawn as a globe whose open side lets a payment (the dot) out.
const markPaths = (stroke, dot) => `
  <path d="M24.43 8.93 A11 11 0 1 0 27 16 H17.2" fill="none" stroke="${stroke}" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M16 5 C11.2 9.4 11.2 22.6 16 27" fill="none" stroke="${stroke}" stroke-width="1.3" stroke-linecap="round" opacity="0.55"/>
  <circle cx="26.6" cy="6.3" r="2.5" fill="${dot}"/>`;

export const MARK_SVG = (stroke = INK, dot = YELLOW) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">${markPaths(stroke, dot)}</svg>`;

const plateSvg = (size, radius) => `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="${radius}" fill="${PLATE}"/>
  <g transform="translate(2.2 2.6) scale(0.86)">${markPaths("#ffffff", YELLOW)}</g>
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

// Halftone dots fading in towards the right edge, echoing the home hero.
const dots = [];
for (let y = 7; y < 630; y += 14) {
  for (let x = 7; x < 1200; x += 14) {
    if (x < 900 || (y > 526 && x < 1120)) continue;
    const r = Math.min(4.2, 4.6 * ((x - 900) / 300));
    if (r > 0.4) dots.push(`<circle cx="${x}" cy="${y}" r="${r.toFixed(2)}" fill="${YELLOW}"/>`);
  }
}

const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${PAPER}"/>
  ${dots.join("")}
  <g transform="translate(96 84) scale(2.2)">${markPaths(INK, YELLOW)}</g>
  <text x="178" y="130" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="48" font-weight="500" fill="${INK}" letter-spacing="-1.5">Gleo</text>
  <text x="96" y="318" font-family="Georgia, 'Times New Roman', serif" font-size="80" fill="${INK}" letter-spacing="-2.4">Cross-border payments</text>
  <text x="96" y="410" font-family="Georgia, 'Times New Roman', serif" font-size="80" fill="${INK}" letter-spacing="-2.4">meet stablecoins</text>
  <rect x="96" y="452" width="250" height="6" fill="${LAVENDER}"/>
  <text x="96" y="520" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="26" fill="${INK}" fill-opacity="0.7">USDG transfers, tokenized stocks and open DeFi on Robinhood Chain.</text>
  <rect x="834" y="546" width="270" height="44" rx="22" fill="${INK}"/>
  <text x="858" y="575" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="19" fill="${PAPER}">gleo.finance · $GLEO</text>
  <circle cx="1082" cy="568" r="16" fill="${YELLOW}"/>
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
