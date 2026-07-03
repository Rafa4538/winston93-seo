// 2026-07-03: Script one-shot para generar public/og-image.jpg (1200x630).
// Logo institucional centrado sobre fondo de marca #013BDF.

import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const width = 1200
const height = 630
const logoPath = path.join(root, 'public', 'images', 'logos', 'logo_winston.png')
const outPath = path.join(root, 'public', 'og-image.jpg')

const logo = await sharp(logoPath)
  .resize({ width: 720, height: 200, fit: 'inside', withoutEnlargement: true })
  .png()
  .toBuffer()

const logoMeta = await sharp(logo).metadata()
const logoW = logoMeta.width || 720
const logoH = logoMeta.height || 200
const left = Math.round((width - logoW) / 2)
const top = Math.round((height - logoH) / 2) - 30

const svgText = Buffer.from(`
  <svg width="${width}" height="${height}">
    <text x="50%" y="${top + logoH + 60}" text-anchor="middle"
      font-family="Arial, Helvetica, sans-serif" font-size="36" font-weight="700" fill="#FFFFFF">
      Instituto Winston Churchill
    </text>
    <text x="50%" y="${top + logoH + 110}" text-anchor="middle"
      font-family="Arial, Helvetica, sans-serif" font-size="24" fill="#E3FB07">
      Working for a Brighter Future
    </text>
  </svg>
`)

await sharp({
  create: {
    width,
    height,
    channels: 3,
    background: { r: 1, g: 59, b: 223 },
  },
})
  .composite([
    { input: logo, left, top },
    { input: svgText, top: 0, left: 0 },
  ])
  .jpeg({ quality: 90 })
  .toFile(outPath)

console.log('OG image created:', outPath)
