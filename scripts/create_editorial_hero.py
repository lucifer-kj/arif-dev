import os
import math
from PIL import Image, ImageDraw, ImageFont, ImageFilter

CUTOUT_PATH = "C:/Users/USER/.gemini/antigravity/brain/ad82cf6d-f7d2-4897-a662-bc7e037a8cbd/arif_white_shirt_cutout.png"
OUTPUT_DIR = "c:/Users/USER/Documents/Builds/website/public"
BRAIN_DIR = "C:/Users/USER/.gemini/antigravity/brain/ad82cf6d-f7d2-4897-a662-bc7e037a8cbd"

COLOR_LINEN = (250, 248, 243)         # #FAF8F3
COLOR_CHARCOAL = (23, 21, 19)         # #171513
COLOR_TERRACOTTA = (192, 86, 33)      # #C05621
COLOR_TEXT_WHITE = (250, 248, 245)
COLOR_CODE_KEYWORD = (230, 125, 88)   # Terracotta keyword
COLOR_CODE_STRING = (148, 202, 134)   # Soft green
COLOR_CODE_PROP = (145, 185, 218)     # Soft blue-gray
COLOR_CODE_MUTED = (160, 150, 140)    # Gray comment

def clean_upper_torso(cutout_img):
    w, h = cutout_img.size
    cropped = cutout_img.crop((20, 35, 680, 640))
    cw, ch = cropped.size
    
    r, g, b, a = cropped.split()
    draw_a = ImageDraw.Draw(a)
    
    # Smoothly erase bottom-left obstruction
    draw_a.polygon([(0, ch - 160), (135, ch), (0, ch)], fill=0)
    
    # Smooth horizontal feather on bottom 40px
    fade_h = 40
    for y in range(ch - fade_h, ch):
        factor = (ch - y) / float(fade_h)
        for x in range(cw):
            curr_alpha = a.getpixel((x, y))
            new_alpha = int(curr_alpha * (factor ** 1.4))
            a.putpixel((x, y), new_alpha)
            
    cropped.putalpha(a)
    return cropped

def create_code_card_image(scale=2):
    card_w = 430 * scale
    card_h = 305 * scale
    
    card = Image.new("RGBA", (card_w, card_h), (0, 0, 0, 0))
    draw = ImageDraw.Draw(card)
    
    # Background: dark charcoal #171513 with thin #C05621 border
    draw.rounded_rectangle(
        [0, 0, card_w, card_h],
        radius=14 * scale,
        fill=(22, 20, 18, 252),
        outline=(192, 86, 33, 190),
        width=max(1, int(1.5 * scale))
    )
    
    # Header bar
    header_h = 34 * scale
    draw.line([0, header_h, card_w, header_h], fill=(192, 86, 33, 75), width=max(1, 1 * scale))
    
    # Traffic-light controls
    dot_r = 4 * scale
    dot_y = header_h // 2
    draw.ellipse([16 * scale - dot_r, dot_y - dot_r, 16 * scale + dot_r, dot_y + dot_r], fill=(231, 76, 60))
    draw.ellipse([29 * scale - dot_r, dot_y - dot_r, 29 * scale + dot_r, dot_y + dot_r], fill=(241, 196, 15))
    draw.ellipse([42 * scale - dot_r, dot_y - dot_r, 42 * scale + dot_r, dot_y + dot_r], fill=(46, 204, 113))
    
    font_micro = ImageFont.truetype("C:/Windows/Fonts/consola.ttf", 11 * scale)
    draw.text((56 * scale, 10 * scale), "arif.ts  </>", fill=(192, 86, 33, 230), font=font_micro)
    draw.text((card_w - 78 * scale, 10 * scale), "[ TypeScript ]", fill=(135, 130, 125), font=font_micro)
    
    font_code = ImageFont.truetype("C:/Windows/Fonts/consola.ttf", 13 * scale)
    font_code_bold = ImageFont.truetype("C:/Windows/Fonts/consolab.ttf", 13 * scale)
    
    lines = [
        [("const ", COLOR_CODE_KEYWORD, True), ("arif", COLOR_CODE_PROP, False), (" = {", COLOR_TEXT_WHITE, False)],
        [("  role: ", COLOR_CODE_MUTED, False), ('"Software Engineer"', COLOR_CODE_STRING, False), (",", COLOR_TEXT_WHITE, False)],
        [("  builds: [", COLOR_CODE_MUTED, False)],
        [('    "Web Applications"', COLOR_CODE_STRING, False), (",", COLOR_TEXT_WHITE, False)],
        [('    "AI Automations"', COLOR_CODE_STRING, False), (",", COLOR_TEXT_WHITE, False)],
        [('    "Digital Systems"', COLOR_CODE_STRING, False)],
        [("  ],", COLOR_CODE_MUTED, False)],
        [("  stack: [", COLOR_CODE_MUTED, False), ('"Next.js"', COLOR_CODE_STRING, False), (", ", COLOR_TEXT_WHITE, False), ('"TypeScript"', COLOR_CODE_STRING, False), (", ", COLOR_TEXT_WHITE, False), ('"React"', COLOR_CODE_STRING, False), ("],", COLOR_TEXT_WHITE, False)],
        [("  mindset: ", COLOR_CODE_MUTED, False), ('"Ship useful things."', COLOR_CODE_STRING, False)],
        [("};", COLOR_TEXT_WHITE, False)],
    ]
    
    line_y = header_h + 14 * scale
    for line in lines:
        curr_x = 20 * scale
        for chunk_text, chunk_color, is_bold in line:
            f = font_code_bold if is_bold else font_code
            draw.text((curr_x, line_y), chunk_text, fill=chunk_color, font=f)
            bbox = draw.textbbox((curr_x, line_y), chunk_text, font=f)
            curr_x = bbox[2]
        line_y += 21 * scale
        
    return card

def draw_cinematic_halo(canvas, cx, cy, radius, scale=2):
    halo = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    halo_draw = ImageDraw.Draw(halo)
    
    # 1. Soft diffused outer glow
    glow_r = int(radius * 1.30)
    for step in range(glow_r, radius, -6 * scale):
        alpha = int(32 * (1.0 - (step - radius) / float(glow_r - radius)))
        halo_draw.ellipse(
            [cx - step, cy - step, cx + step, cy + step],
            fill=(192, 86, 33, alpha)
        )
        
    # 2. Main gradient disc: darker burnt orange (#8C3712) at outer edge -> vibrant terracotta (#C05621) at center
    steps = 45
    for i in range(steps):
        r = int(radius * (1.0 - i / float(steps)))
        t = i / float(steps)
        r_col = int(145 + (192 - 145) * t)
        g_col = int(55 + (86 - 55) * t)
        b_col = int(18 + (33 - 18) * t)
        alpha = int(220 + 25 * t)
        halo_draw.ellipse([cx - r, cy - r, cx + r, cy + r], fill=(r_col, g_col, b_col, alpha))
        
    # 3. Editorial hairline accent rim
    halo_draw.ellipse(
        [cx - radius, cy - radius, cx + radius, cy + radius],
        outline=(230, 115, 55, 230),
        width=max(1, int(1.5 * scale))
    )
    
    # 4. Subtle Swiss precision orbit
    orbit_r = int(radius * 1.12)
    halo_draw.ellipse(
        [cx - orbit_r, cy - orbit_r, cx + orbit_r, cy + orbit_r],
        outline=(192, 86, 33, 75),
        width=max(1, 1 * scale)
    )
    
    canvas.alpha_composite(halo)

def main():
    print("Loading white shirt cutout...")
    raw = Image.open(CUTOUT_PATH).convert("RGBA")
    torso = clean_upper_torso(raw)
    
    scale = 2
    w, h = 1180 * scale, 760 * scale
    canvas = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    
    torso_h = int(580 * scale)
    torso_w = int(torso.width * (torso_h / float(torso.height)))
    torso_scaled = torso.resize((torso_w, torso_h), Image.Resampling.LANCZOS)
    
    torso_x = int(w - torso_w - 20 * scale)
    torso_y = int(h - torso_h)
    
    head_cx = torso_x + int(torso_w * 0.44)
    head_cy = torso_y + int(torso_h * 0.36)
    halo_radius = int(240 * scale)
    
    print("Drawing halo...")
    draw_cinematic_halo(canvas, head_cx, head_cy, halo_radius, scale=scale)
    
    print("Rendering code card...")
    code_card = create_code_card_image(scale=scale)
    tilted_card = code_card.rotate(-2.5, expand=True, resample=Image.Resampling.BICUBIC)
    
    # Position card clearly to the left of his head/hair so 100% of text is legible
    card_x = int(torso_x - tilted_card.width + 120 * scale)
    card_y = int(35 * scale)
    
    # Soft drop shadow for floating card
    shadow = Image.new("RGBA", (tilted_card.width + 40 * scale, tilted_card.height + 40 * scale), (0, 0, 0, 0))
    s_draw = ImageDraw.Draw(shadow)
    s_draw.rectangle([20 * scale, 20 * scale, 20 * scale + tilted_card.width, 20 * scale + tilted_card.height], fill=(28, 25, 23, 75))
    shadow = shadow.filter(ImageFilter.GaussianBlur(radius=14 * scale))
    canvas.alpha_composite(shadow, (card_x - 12 * scale, card_y - 6 * scale))
    
    # Paste tilted code card
    canvas.alpha_composite(tilted_card, (card_x, card_y))
    
    # Paste Arif over halo and gracefully beside the card
    print("Compositing Arif...")
    canvas.alpha_composite(torso_scaled, (torso_x, torso_y))
    
    # Downsample 2x to 1x
    final_w, final_h = canvas.width // 2, canvas.height // 2
    final_img = canvas.resize((final_w, final_h), Image.Resampling.LANCZOS)
    
    # Auto-crop transparent margins with 10px padding
    bbox = final_img.getbbox()
    if bbox:
        pad = 8
        final_img = final_img.crop((
            max(0, bbox[0] - pad),
            max(0, bbox[1] - pad),
            min(final_img.width, bbox[2] + pad),
            min(final_img.height, bbox[3] + pad),
        ))
        
    print(f"Final Hero Asset Dimensions: {final_img.size}")
    
    hero_png = os.path.join(OUTPUT_DIR, "hero.png")
    final_img.save(hero_png, "PNG")
    print("Saved:", hero_png)
    
    bg = Image.new("RGB", final_img.size, COLOR_LINEN)
    bg.paste(final_img, (0, 0), final_img)
    preview_path = os.path.join(BRAIN_DIR, "preview_hero_white_shirt_editorial.jpg")
    bg.save(preview_path, "JPEG", quality=95)
    print("Saved preview:", preview_path)

if __name__ == "__main__":
    main()
