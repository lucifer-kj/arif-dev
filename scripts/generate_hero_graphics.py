import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

INPUT_IMAGE_PATH = "C:/Users/USER/.gemini/antigravity/brain/ad82cf6d-f7d2-4897-a662-bc7e037a8cbd/.user_uploaded/media_1791488181735_147e6b68.png"
OUTPUT_DIR = "C:/Users/USER/.gemini/antigravity/brain/ad82cf6d-f7d2-4897-a662-bc7e037a8cbd"

# Brand palette
COLOR_LINEN = (250, 248, 245)         # #FAF8F5
COLOR_OBSIDIAN = (28, 25, 23)          # #1C1917
COLOR_TERRACOTTA = (192, 86, 33)      # #C05621
COLOR_TERRACOTTA_LIGHT = (222, 110, 52)
COLOR_CARD_BG = (24, 21, 19, 245)      # Deep obsidian card
COLOR_BORDER = (250, 248, 245, 38)     # Hairline border
COLOR_GREEN = (46, 204, 113)
COLOR_YELLOW = (241, 196, 15)
COLOR_RED = (231, 76, 60)
COLOR_CODE_KEYWORD = (220, 115, 82)    # Warm terracotta keyword
COLOR_CODE_STRING = (142, 192, 124)    # Greenish string
COLOR_CODE_PROP = (131, 165, 152)      # Cyan/blueish prop
COLOR_CODE_TEXT = (235, 220, 205)      # Linen text
COLOR_CODE_MUTED = (146, 131, 116)     # Muted comment

def get_fonts(scale=2):
    font_code = ImageFont.truetype("C:/Windows/Fonts/consola.ttf", 15 * scale)
    font_code_bold = ImageFont.truetype("C:/Windows/Fonts/consolab.ttf", 15 * scale)
    font_code_sm = ImageFont.truetype("C:/Windows/Fonts/consola.ttf", 13 * scale)
    font_sans = ImageFont.truetype("C:/Windows/Fonts/segoeui.ttf", 13 * scale)
    font_sans_bold = ImageFont.truetype("C:/Windows/Fonts/segoeuib.ttf", 12 * scale)
    font_micro = ImageFont.truetype("C:/Windows/Fonts/consola.ttf", 11 * scale)
    return font_code, font_code_bold, font_code_sm, font_sans, font_sans_bold, font_micro

def draw_code_card(draw, x, y, w, h, lines, title="architect.config.ts", scale=2):
    # Card background with rounded corners
    draw.rounded_rectangle([x, y, x + w, y + h], radius=16 * scale, fill=COLOR_CARD_BG, outline=COLOR_BORDER, width=max(1, 1 * scale))
    
    # Title bar
    header_h = 36 * scale
    draw.line([x, y + header_h, x + w, y + header_h], fill=COLOR_BORDER, width=max(1, 1 * scale))
    
    # Window controls (macOS style dots)
    dot_r = 5 * scale
    dot_y = y + (header_h // 2)
    draw.ellipse([x + 18 * scale - dot_r, dot_y - dot_r, x + 18 * scale + dot_r, dot_y + dot_r], fill=COLOR_RED)
    draw.ellipse([x + 34 * scale - dot_r, dot_y - dot_r, x + 34 * scale + dot_r, dot_y + dot_r], fill=COLOR_YELLOW)
    draw.ellipse([x + 50 * scale - dot_r, dot_y - dot_r, x + 50 * scale + dot_r, dot_y + dot_r], fill=COLOR_GREEN)
    
    # Title text
    font_micro = ImageFont.truetype("C:/Windows/Fonts/consola.ttf", 12 * scale)
    draw.text((x + 72 * scale, y + 10 * scale), title, fill=(160, 155, 150), font=font_micro)
    
    # Code content
    font_code, font_code_bold, font_code_sm, _, _, _ = get_fonts(scale)
    line_y = y + header_h + 16 * scale
    for line in lines:
        curr_x = x + 20 * scale
        for chunk_text, chunk_color, is_bold in line:
            f = font_code_bold if is_bold else font_code_sm
            draw.text((curr_x, line_y), chunk_text, fill=chunk_color, font=f)
            bbox = draw.textbbox((curr_x, line_y), chunk_text, font=f)
            curr_x = bbox[2]
        line_y += 22 * scale

def draw_pill(draw, x, y, text, dot_color=COLOR_TERRACOTTA, scale=2):
    font_sans = ImageFont.truetype("C:/Windows/Fonts/segoeuib.ttf", 12 * scale)
    bbox = draw.textbbox((0, 0), text, font=font_sans)
    text_w = bbox[2] - bbox[0]
    pill_w = text_w + 44 * scale
    pill_h = 30 * scale
    
    # Pill background
    draw.rounded_rectangle([x, y, x + pill_w, y + pill_h], radius=pill_h // 2, fill=(28, 25, 23, 240), outline=(250, 248, 245, 45), width=max(1, 1 * scale))
    
    # Pulsing signal dot
    dot_r = 4 * scale
    draw.ellipse([x + 16 * scale - dot_r, y + pill_h // 2 - dot_r, x + 16 * scale + dot_r, y + pill_h // 2 + dot_r], fill=dot_color)
    
    # Pill text
    draw.text((x + 28 * scale, y + 6 * scale), text, fill=(250, 248, 245), font=font_sans)
    return pill_w, pill_h

def draw_reticle(draw, cx, cy, radius, scale=2):
    # Outer circle
    draw.ellipse([cx - radius, cy - radius, cx + radius, cy + radius], outline=(192, 86, 33, 180), width=max(1, 2 * scale))
    # Inner circle
    inner_r = radius * 0.72
    draw.ellipse([cx - inner_r, cy - inner_r, cx + inner_r, cy + inner_r], outline=(28, 25, 23, 140), width=max(1, 1 * scale))
    # Core circle
    core_r = radius * 0.45
    draw.ellipse([cx - core_r, cy - core_r, cx + core_r, cy + core_r], outline=(192, 86, 33, 90), width=max(1, 1 * scale))
    
    # Crosshair ticks
    tick_len = 16 * scale
    draw.line([cx, cy - radius - tick_len, cx, cy - radius + tick_len], fill=(192, 86, 33, 220), width=max(1, 2 * scale))
    draw.line([cx, cy + radius - tick_len, cx, cy + radius + tick_len], fill=(192, 86, 33, 220), width=max(1, 2 * scale))
    draw.line([cx - radius - tick_len, cy, cx - radius + tick_len, cy], fill=(192, 86, 33, 220), width=max(1, 2 * scale))
    draw.line([cx + radius - tick_len, cy, cx + radius + tick_len, cy], fill=(192, 86, 33, 220), width=max(1, 2 * scale))
    
    # Precision degree marks
    font_micro = ImageFont.truetype("C:/Windows/Fonts/consola.ttf", 10 * scale)
    draw.text((cx + 10 * scale, cy - radius - 20 * scale), "000° SYS.REF", fill=(192, 86, 33, 200), font=font_micro)
    draw.text((cx + radius + 10 * scale, cy - 14 * scale), "090° EAST", fill=(192, 86, 33, 200), font=font_micro)
    draw.text((cx - radius - 80 * scale, cy - 14 * scale), "270° WEST", fill=(192, 86, 33, 200), font=font_micro)

def create_variant_1(orig_img, scale=2):
    """Variant 1: Swiss Precision Reticle (Natural Facing Right)"""
    w, h = 1280 * scale, 960 * scale
    canvas = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    draw = ImageDraw.Draw(canvas)
    
    sub_w = int(1024 * scale * 0.95)
    sub_h = int(752 * scale * 0.95)
    subject = orig_img.resize((sub_w, sub_h), Image.Resampling.LANCZOS)
    
    sub_x = w - sub_w + (40 * scale)
    sub_y = h - sub_h
    
    head_cx = sub_x + int(sub_w * 0.62)
    head_cy = sub_y + int(sub_h * 0.40)
    circle_r = int(320 * scale)
    
    disc_draw = ImageDraw.Draw(canvas)
    disc_draw.ellipse([head_cx - circle_r, head_cy - circle_r, head_cx + circle_r, head_cy + circle_r], fill=(192, 86, 33, 40))
    disc_draw.ellipse([head_cx - circle_r + 20*scale, head_cy - circle_r + 20*scale, head_cx + circle_r - 20*scale, head_cy + circle_r - 20*scale], fill=(28, 25, 23, 60))
    draw_reticle(draw, head_cx, head_cy, circle_r, scale=scale)
    
    canvas.alpha_composite(subject, (sub_x, sub_y))
    
    code_lines = [
        [("const ", COLOR_CODE_KEYWORD, True), ("architect", COLOR_CODE_PROP, False), (" = {", COLOR_CODE_TEXT, False)],
        [("  name: ", COLOR_CODE_MUTED, False), ('"Arif"', COLOR_CODE_STRING, False), (",", COLOR_CODE_TEXT, False)],
        [("  practice: ", COLOR_CODE_MUTED, False), ('"Solo Practitioner"', COLOR_CODE_STRING, False), (",", COLOR_CODE_TEXT, False)],
        [("  stack: [", COLOR_CODE_MUTED, False), ('"Next.js"', COLOR_CODE_STRING, False), (", ", COLOR_CODE_TEXT, False), ('"TS"', COLOR_CODE_STRING, False), (", ", COLOR_CODE_TEXT, False), ('"Tailwind"', COLOR_CODE_STRING, False), ("],", COLOR_CODE_TEXT, False)],
        [("  agencyMarkup: ", COLOR_CODE_MUTED, False), ("0.00", COLOR_CODE_KEYWORD, True), (",", COLOR_CODE_TEXT, False)],
        [("  clientOwnership: ", COLOR_CODE_MUTED, False), ('"100%"', COLOR_CODE_STRING, False), (",", COLOR_CODE_TEXT, False)],
        [("};", COLOR_CODE_TEXT, False)],
        [("await ", COLOR_CODE_KEYWORD, True), ("architect.", COLOR_CODE_TEXT, False), ("shipProduction", COLOR_CODE_PROP, True), ("();", COLOR_CODE_TEXT, False)],
    ]
    card_w = 400 * scale
    card_h = 260 * scale
    card_x = 40 * scale
    card_y = 180 * scale
    draw_code_card(draw, card_x, card_y, card_w, card_h, code_lines, title="arif.architect.ts", scale=scale)
    
    draw_pill(draw, 50 * scale, 120 * scale, "ZERO AGENCY MIDDLEMEN · DIRECT ACCESS", dot_color=COLOR_GREEN, scale=scale)
    draw_pill(draw, 70 * scale, 470 * scale, "SUB-SECOND PERFORMANCE ON 4G/5G", dot_color=COLOR_TERRACOTTA, scale=scale)
    
    return canvas

def create_variant_2(orig_img, scale=2):
    """Variant 2: Bold Terracotta Halo Disc (Mirrored Facing Left)"""
    w, h = 1280 * scale, 960 * scale
    canvas = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    draw = ImageDraw.Draw(canvas)
    
    mirrored_img = orig_img.transpose(Image.Transpose.FLIP_LEFT_RIGHT)
    sub_w = int(1024 * scale * 0.95)
    sub_h = int(752 * scale * 0.95)
    subject = mirrored_img.resize((sub_w, sub_h), Image.Resampling.LANCZOS)
    
    sub_x = -40 * scale
    sub_y = h - sub_h
    
    head_cx = sub_x + int(sub_w * 0.38)
    head_cy = sub_y + int(sub_h * 0.40)
    circle_r = int(330 * scale)
    
    # Rich Terracotta Eclipse Disc
    draw.ellipse([head_cx - circle_r, head_cy - circle_r, head_cx + circle_r, head_cy + circle_r], fill=(192, 86, 33, 230))
    draw.ellipse([head_cx - circle_r, head_cy - circle_r, head_cx + circle_r, head_cy + circle_r], outline=(28, 25, 23, 255), width=max(1, 4 * scale))
    outer_r = circle_r + 28 * scale
    draw.ellipse([head_cx - outer_r, head_cy - outer_r, head_cx + outer_r, head_cy + outer_r], outline=(28, 25, 23, 90), width=max(1, 1 * scale))
    
    canvas.alpha_composite(subject, (sub_x, sub_y))
    
    code_lines = [
        [("// Production Deployment Pipeline", COLOR_CODE_MUTED, False)],
        [("export async function ", COLOR_CODE_KEYWORD, True), ("buildOutcome", COLOR_CODE_PROP, True), ("() {", COLOR_CODE_TEXT, False)],
        [("  const site = await deploy({", COLOR_CODE_TEXT, False)],
        [("    ttfb: ", COLOR_CODE_MUTED, False), ('"< 200ms"', COLOR_CODE_STRING, False), (",", COLOR_CODE_TEXT, False)],
        [("    coreWebVitals: ", COLOR_CODE_MUTED, False), ("99", COLOR_CODE_KEYWORD, True), (",", COLOR_CODE_TEXT, False)],
        [("    conversion: ", COLOR_CODE_MUTED, False), ('"WhatsApp Direct"', COLOR_CODE_STRING, False), (",", COLOR_CODE_TEXT, False)],
        [("    codeOwnership: ", COLOR_CODE_MUTED, False), ('"Client 100%"', COLOR_CODE_STRING, False), (",", COLOR_CODE_TEXT, False)],
        [("  });", COLOR_CODE_TEXT, False)],
        [("  return site.launch();", COLOR_CODE_TEXT, False)],
        [("}", COLOR_CODE_TEXT, False)],
    ]
    card_w = 420 * scale
    card_h = 280 * scale
    card_x = w - card_w - 40 * scale
    card_y = 190 * scale
    draw_code_card(draw, card_x, card_y, card_w, card_h, code_lines, title="production.pipeline.ts", scale=scale)
    
    draw_pill(draw, w - card_w - 20 * scale, 130 * scale, "ACCEPTING SELECT CLIENTS · 2026", dot_color=COLOR_GREEN, scale=scale)
    draw_pill(draw, w - card_w - 20 * scale, 500 * scale, "DIRECT WHATSAPP CONVERSION RAILS", dot_color=COLOR_TERRACOTTA, scale=scale)
    
    return canvas

def create_variant_3(orig_img, scale=2):
    """Variant 3: Architectural Espresso Disc & Terracotta Orbit (Mirrored Facing Left)"""
    w, h = 1280 * scale, 960 * scale
    canvas = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    draw = ImageDraw.Draw(canvas)
    
    mirrored_img = orig_img.transpose(Image.Transpose.FLIP_LEFT_RIGHT)
    sub_w = int(1024 * scale * 0.95)
    sub_h = int(752 * scale * 0.95)
    subject = mirrored_img.resize((sub_w, sub_h), Image.Resampling.LANCZOS)
    
    sub_x = 0
    sub_y = h - sub_h
    
    head_cx = sub_x + int(sub_w * 0.38)
    head_cy = sub_y + int(sub_h * 0.40)
    circle_r = int(320 * scale)
    
    draw.ellipse([head_cx - circle_r, head_cy - circle_r, head_cx + circle_r, head_cy + circle_r], fill=(28, 25, 23, 240))
    draw.ellipse([head_cx - circle_r + 6*scale, head_cy - circle_r + 6*scale, head_cx + circle_r - 6*scale, head_cy + circle_r - 6*scale], outline=(192, 86, 33, 255), width=max(1, 3 * scale))
    orbit_r = circle_r + 36 * scale
    draw.ellipse([head_cx - orbit_r, head_cy - orbit_r, head_cx + orbit_r, head_cy + orbit_r], outline=(192, 86, 33, 100), width=max(1, 1 * scale))
    
    font_micro = ImageFont.truetype("C:/Windows/Fonts/consola.ttf", 10 * scale)
    draw.text((head_cx - orbit_r + 20*scale, head_cy - 12*scale), "22.5726° N, 88.3639° E", fill=(192, 86, 33, 220), font=font_micro)
    draw.text((head_cx + orbit_r - 120*scale, head_cy - 12*scale), "SEC.01 // ARCHITECT", fill=(192, 86, 33, 220), font=font_micro)
    
    canvas.alpha_composite(subject, (sub_x, sub_y))
    
    code_lines = [
        [("<SeniorWebArchitect />", COLOR_CODE_KEYWORD, True)],
        [("  speed: ", COLOR_CODE_MUTED, False), ('"Sub-second on Jio/Airtel"', COLOR_CODE_STRING, False)],
        [("  architecture: ", COLOR_CODE_MUTED, False), ('"Next.js App Router"', COLOR_CODE_STRING, False)],
        [("  database: ", COLOR_CODE_MUTED, False), ('"Zero Runtime DB Overhead"', COLOR_CODE_STRING, False)],
        [("  ownership: ", COLOR_CODE_MUTED, False), ('"100% Client Code & Assets"', COLOR_CODE_STRING, False)],
        [("  contact: ", COLOR_CODE_MUTED, False), ('"+91 74396 11032"', COLOR_CODE_STRING, False)],
    ]
    card_w = 430 * scale
    card_h = 230 * scale
    card_x = w - card_w - 40 * scale
    card_y = 220 * scale
    draw_code_card(draw, card_x, card_y, card_w, card_h, code_lines, title="architect.spec.tsx", scale=scale)
    
    draw_pill(draw, w - card_w - 20 * scale, 150 * scale, "FREELANCE SENIOR SOFTWARE ENGINEER", dot_color=COLOR_GREEN, scale=scale)
    draw_pill(draw, w - card_w - 20 * scale, 480 * scale, "100% CODE OWNERSHIP & IP HANDOVER", dot_color=COLOR_TERRACOTTA, scale=scale)
    
    return canvas

def create_variant_4(orig_img, scale=2):
    """Variant 4: Deep Obsidian Disc (Natural Facing Right)"""
    w, h = 1280 * scale, 960 * scale
    canvas = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    draw = ImageDraw.Draw(canvas)
    
    sub_w = int(1024 * scale * 0.95)
    sub_h = int(752 * scale * 0.95)
    subject = orig_img.resize((sub_w, sub_h), Image.Resampling.LANCZOS)
    
    sub_x = w - sub_w + (40 * scale)
    sub_y = h - sub_h
    
    head_cx = sub_x + int(sub_w * 0.62)
    head_cy = sub_y + int(sub_h * 0.40)
    circle_r = int(320 * scale)
    
    draw.ellipse([head_cx - circle_r, head_cy - circle_r, head_cx + circle_r, head_cy + circle_r], fill=(28, 25, 23, 245))
    draw.ellipse([head_cx - circle_r, head_cy - circle_r, head_cx + circle_r, head_cy + circle_r], outline=(192, 86, 33, 255), width=max(1, 3 * scale))
    
    out_r = circle_r + 24 * scale
    draw.ellipse([head_cx - out_r, head_cy - out_r, head_cx + out_r, head_cy + out_r], outline=(28, 25, 23, 100), width=max(1, 1 * scale))
    
    canvas.alpha_composite(subject, (sub_x, sub_y))
    
    code_lines = [
        [("import { ", COLOR_CODE_TEXT, False), ("Architect", COLOR_CODE_KEYWORD, True), (" } from ", COLOR_CODE_TEXT, False), ('"@arif/engine"', COLOR_CODE_STRING, False)],
        [("// Core benchmark setup", COLOR_CODE_MUTED, False)],
        [("const project = new Architect({", COLOR_CODE_TEXT, False)],
        [("  speed: ", COLOR_CODE_MUTED, False), ('"LCP < 1.2s"', COLOR_CODE_STRING, False), (",", COLOR_CODE_TEXT, False)],
        [("  target: ", COLOR_CODE_MUTED, False), ('"Indian D2C & Tech Founders"', COLOR_CODE_STRING, False), (",", COLOR_CODE_TEXT, False)],
        [("  conversion: ", COLOR_CODE_MUTED, False), ('"WhatsApp Direct Rails"', COLOR_CODE_STRING, False), (",", COLOR_CODE_TEXT, False)],
        [("});", COLOR_CODE_TEXT, False)],
    ]
    card_w = 410 * scale
    card_h = 240 * scale
    card_x = 40 * scale
    card_y = 200 * scale
    draw_code_card(draw, card_x, card_y, card_w, card_h, code_lines, title="engine.benchmark.ts", scale=scale)
    
    draw_pill(draw, 50 * scale, 130 * scale, "SOLO PRACTITIONER · NOT AN AGENCY", dot_color=COLOR_GREEN, scale=scale)
    draw_pill(draw, 70 * scale, 470 * scale, "CRAFTED FOR AIRTEL & JIO 4G/5G SPEED", dot_color=COLOR_TERRACOTTA, scale=scale)
    
    return canvas

def make_preview_on_linen(rgba_img):
    w, h = rgba_img.size
    bg = Image.new("RGB", (w, h), COLOR_LINEN)
    bg_draw = ImageDraw.Draw(bg)
    
    grid_spacing = 96
    for gx in range(0, w, grid_spacing):
        bg_draw.line([gx, 0, gx, h], fill=(230, 225, 218), width=1)
    for gy in range(0, h, grid_spacing):
        bg_draw.line([0, gy, w, gy], fill=(230, 225, 218), width=1)
        
    bg.paste(rgba_img, (0, 0), rgba_img)
    return bg

def main():
    print("Loading image...")
    orig = Image.open(INPUT_IMAGE_PATH).convert("RGBA")
    
    variants = [
        ("variant_1_swiss_reticle", create_variant_1),
        ("variant_2_mirrored_terracotta_halo", create_variant_2),
        ("variant_3_mirrored_obsidian_halo", create_variant_3),
        ("variant_4_obsidian_disc", create_variant_4)
    ]
    
    for name, func in variants:
        print(f"Generating {name}...")
        img_2x = func(orig, scale=2)
        final_w, final_h = img_2x.width // 2, img_2x.height // 2
        final_transparent = img_2x.resize((final_w, final_h), Image.Resampling.LANCZOS)
        
        # Save transparent PNG
        png_path = os.path.join(OUTPUT_DIR, f"hero_{name}.png")
        final_transparent.save(png_path, "PNG")
        print(f"Saved: {png_path}")
        
        # Save preview on Linen background
        preview = make_preview_on_linen(final_transparent)
        jpg_path = os.path.join(OUTPUT_DIR, f"preview_hero_{name}.jpg")
        preview.save(jpg_path, "JPEG", quality=95)
        print(f"Saved preview: {jpg_path}")

if __name__ == "__main__":
    main()
