/* Generates every brand raster from the owner's logo and banner.
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
 * Since 6 Oct 2026 the mark is the owner's logo: scripts/owner/gleo-logo.png
 * (transparent, trimmed and padded square) and scripts/owner/gleo-banner.jpg
 * (the owner's 1500x500 banner). The site draws the mark from the WebP as a
 * CSS mask, so it can take any text colour.
 */
import sharp from "sharp";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const ROOT = new URL("../", import.meta.url);
const out = (p) => fileURLToPath(new URL(p, ROOT));

const INK = "#0f0f0f";
const PAPER = "#ffffff";
const YELLOW = "#fdda24";
const LAVENDER = "#b7ace8";

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

const LOGO = await readFile(out("scripts/owner/gleo-logo.png"));
const BANNER = await readFile(out("scripts/owner/gleo-banner.jpg"));
const logo = (size) => sharp(LOGO).resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
// White plate with a hairline: the black globe reads on a light tab strip, the plate itself on a dark one.
const plateOf = async (size, rounded = true) => {
  const r = rounded ? Math.round(size * 0.22) : 0;
  const bg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><rect x="0.5" y="0.5" width="${size - 1}" height="${size - 1}" rx="${r}" fill="${PAPER}" stroke="${INK}" stroke-opacity="0.18"/></svg>`);
  return sharp(bg).composite([{ input: await logo(Math.round(size * (size <= 16 ? 0.94 : 0.8))), gravity: "center" }]).png().toBuffer();
};

// Halftone dots fading in towards the right edge, echoing the home hero.
const dots = [];
for (let y = 7; y < 630; y += 14) {
  for (let x = 7; x < 1200; x += 14) {
    if (x < 900 || y < 430) continue;
    const r = Math.min(4.2, 4.6 * ((x - 900) / 300));
    if (r > 0.4) dots.push(`<circle cx="${x}" cy="${y}" r="${r.toFixed(2)}" fill="${YELLOW}"/>`);
  }
}

// Social card: the owner's banner (globe + "Gleo Finance") on white, one line of copy and the domain pill.
const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${PAPER}"/>
  ${dots.join("")}
  <rect x="96" y="448" width="250" height="6" fill="${LAVENDER}"/>
  <text x="96" y="510" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="27" fill="${INK}" fill-opacity="0.75">Cross-border USDG payments, tokenized stocks and open DeFi.</text>
  <rect x="834" y="546" width="270" height="44" rx="22" fill="${INK}"/>
  <text x="858" y="575" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="19" fill="${PAPER}">gleo.finance · $GLEO</text>
  <circle cx="1082" cy="568" r="16" fill="${YELLOW}"/>
</svg>`;

await mkdir(out("public/brand/"), { recursive: true });
await sharp(await logo(512)).webp({ quality: 95, alphaQuality: 100 }).toFile(out("public/brand/gleo-mark.webp"));
await sharp(await plateOf(512)).webp({ quality: 92 }).toFile(out("public/brand/gleo-plate.webp"));
await writeFile(out("src/app/icon.png"), await plateOf(512));
await writeFile(out("src/app/apple-icon.png"), await plateOf(180, false));
const sizes = [16, 32, 48];
await writeFile(out("src/app/favicon.ico"), ico(await Promise.all(sizes.map(async (size) => ({ size, data: await sharp(await plateOf(size)).ensureAlpha().png().toBuffer() })))));
const strip = await sharp(BANNER).resize(1200, 400).png().toBuffer();
const card = await sharp(Buffer.from(og), { density: 144 }).resize(1200, 630).composite([{ input: strip, left: 0, top: 20 }]).jpeg({ quality: 88 }).toBuffer();
await writeFile(out("src/app/opengraph-image.jpg"), card);
await writeFile(out("src/app/twitter-image.jpg"), card);
await sharp(card).webp({ quality: 85 }).toFile(out("public/brand/og.webp"));
await sharp(BANNER).webp({ quality: 90 }).toFile(out("public/brand/gleo-banner.webp"));
console.log("brand assets written (owner logo)");
