export const generateDisplacementMap = ({
  width,
  height,
  radius = 12,
  border = 0.07,
  alpha = 0.93,
  lightness = 50,
  blur = 11,
  blend = 'difference',
}) => {
  const borderPx = Math.min(width, height) * (border * 0.5)

  const svg = `
    <svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="red" x1="100%" y1="0%" x2="0%" y2="0%">
          <stop offset="0%" stop-color="#000"/>
          <stop offset="100%" stop-color="red"/>
        </linearGradient>
        <linearGradient id="blue" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#000"/>
          <stop offset="100%" stop-color="blue"/>
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="${width}" height="${height}" fill="black"/>
      <rect x="0" y="0" width="${width}" height="${height}" rx="${radius}" fill="url(#red)"/>
      <rect x="0" y="0" width="${width}" height="${height}" rx="${radius}"
        fill="url(#blue)" style="mix-blend-mode: ${blend}"/>
      <rect
        x="${borderPx}" y="${borderPx}"
        width="${width - borderPx * 2}" height="${height - borderPx * 2}"
        rx="${radius}"
        fill="hsl(0 0% ${lightness}% / ${alpha})"
        style="filter:blur(${blur}px)"
      />
    </svg>
  `

  const encoded = encodeURIComponent(svg)
  return `data:image/svg+xml,${encoded}`
}
