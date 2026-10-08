import math
from PIL import Image, ImageDraw, ImageFont
import os

os.makedirs("public", exist_ok=True)
os.makedirs("app", exist_ok=True)

# 1. Create pure SVG icon
svg_content = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <rect width="64" height="64" rx="14" fill="#1C1917"/>
  <!-- Hairline Swiss inner border -->
  <rect x="0.5" y="0.5" width="63" height="63" rx="13.5" fill="none" stroke="#FAF8F5" stroke-opacity="0.12" stroke-width="1"/>
  <!-- Geometric 'A' lettermark -->
  <path d="M18 46 L28.5 17 L35.5 17 L46 46 L40 46 L37.2 38 L26.8 38 L24 46 Z M28.6 33 L35.4 33 L32 23.2 Z" fill="#FAF8F5"/>
  <!-- Signature Terracotta Accent Dot -->
  <circle cx="48" cy="44" r="3.2" fill="#C05621"/>
</svg>
'''

with open("public/icon.svg", "w", encoding="utf-8") as f:
    f.write(svg_content)

with open("app/icon.svg", "w", encoding="utf-8") as f:
    f.write(svg_content)

# 2. Render high-res master PNG (512x512) with Pillow for supersampling
size = 512
img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
draw = ImageDraw.Draw(img)

# Background rounded rectangle
bg_color = (28, 25, 23, 255) # #1C1917
radius = 112
draw.rounded_rectangle([(0, 0), (size - 1, size - 1)], radius=radius, fill=bg_color)

# Subtle 1px inner border
border_color = (250, 248, 245, 30)
draw.rounded_rectangle([(2, 2), (size - 3, size - 3)], radius=radius - 2, outline=border_color, width=3)

# Letter 'A' coordinates scaled to 512
scale = 512 / 64
def s(pt):
    return (pt[0] * scale, pt[1] * scale)

poly_a_outer = [s((18, 46)), s((28.5, 17)), s((35.5, 17)), s((46, 46)), s((40, 46)), s((37.2, 38)), s((26.8, 38)), s((24, 46))]
draw.polygon(poly_a_outer, fill=(250, 248, 245, 255)) # #FAF8F5

# Cut out inner hole of A with bg_color
poly_a_inner = [s((28.6, 33)), s((35.4, 33)), s((32, 23.2))]
draw.polygon(poly_a_inner, fill=bg_color)

# Terracotta Dot
dot_center = s((48, 44))
dot_r = 3.2 * scale
dot_bbox = [(dot_center[0] - dot_r, dot_center[1] - dot_r), (dot_center[0] + dot_r, dot_center[1] + dot_r)]
draw.ellipse(dot_bbox, fill=(192, 86, 33, 255)) # #C05621

# Save 512x512 and other sizes
img.save("public/icon-512.png", "PNG")

# 192x192
img_192 = img.resize((192, 192), Image.Resampling.LANCZOS)
img_192.save("public/icon-192.png", "PNG")

# Apple touch icon 180x180
img_180 = img.resize((180, 180), Image.Resampling.LANCZOS)
img_180.save("public/apple-touch-icon.png", "PNG")

# 32x32 favicon
img_32 = img.resize((32, 32), Image.Resampling.LANCZOS)
img_32.save("public/favicon-32x32.png", "PNG")
img_32.save("public/favicon.png", "PNG")

# Multi-resolution ICO (16, 32, 48)
img_16 = img.resize((16, 16), Image.Resampling.LANCZOS)
img_48 = img.resize((48, 48), Image.Resampling.LANCZOS)
img.save("public/favicon.ico", format="ICO", sizes=[(16, 16), (32, 32), (48, 48)])
img.save("app/favicon.ico", format="ICO", sizes=[(16, 16), (32, 32), (48, 48)])

print("Successfully generated all favicon and icon formats!")
