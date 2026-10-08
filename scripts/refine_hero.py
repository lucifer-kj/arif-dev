import os
from PIL import Image, ImageDraw, ImageFont

INPUT_IMAGE_PATH = "C:/Users/USER/.gemini/antigravity/brain/ad82cf6d-f7d2-4897-a662-bc7e037a8cbd/.user_uploaded/media_1791488181735_147e6b68.png"
OUTPUT_DIR = "c:/Users/USER/Documents/Builds/website/public"
BRAIN_DIR = "C:/Users/USER/.gemini/antigravity/brain/ad82cf6d-f7d2-4897-a662-bc7e037a8cbd"

COLOR_LINEN = (250, 248, 245)
COLOR_OBSIDIAN = (28, 25, 23)
COLOR_TERRACOTTA = (192, 86, 33)
COLOR_CARD_BG = (24, 21, 19, 245)
COLOR_BORDER = (250, 248, 245, 42)
COLOR_GREEN = (46, 204, 113)
COLOR_YELLOW = (241, 196, 15)
COLOR_RED = (231, 76, 60)
COLOR_CODE_KEYWORD = (220, 115, 82)
COLOR_CODE_STRING = (142, 192, 124)
COLOR_CODE_PROP = (131, 165, 152)
COLOR_CODE_TEXT = (235, 220, 205)
COLOR_CODE_MUTED = (146, 131, 116)

def get_fonts(scale=2):
    font_code = ImageFont.truetype("C:/Windows/Fonts/consola.ttf", 14 * scale)
    font_code_bold = ImageFont.truetype("C:/Windows/Fonts/consolab.ttf", 14 * scale)
    font_code_sm = ImageFont.truetype("C:/Windows/Fonts/consola.ttf", 12 * scale)
    font_sans_bold = ImageFont.truetype("C:/Windows/Fonts/segoeuib.ttf", 11 * scale)
    font_micro = ImageFont.truetype("C:/Windows/Fonts/consola.ttf", 10 * scale)
    return font_code, font_code_bold, font_code_sm, font_sans_bold, font_micro

def draw_code_card(draw, x, y, w, h, lines, title="architect.spec.tsx", scale=2):
    # Card background with subtle shadow border
    draw.rounded_rectangle([x, y, x + w, y + h], radius=14 * scale, fill=COLOR_CARD_BG, outline=COLOR_BORDER, width=max(1, 1 * scale))
    
    # Title bar
    header_h = 32 * scale
    draw.line([x, y + header_h, x + w, y + header_h], fill=COLOR_BORDER, width=max(1, 1 * scale))
    
    # Window controls
    dot_r = 4 * scale
    dot_y = y + (header_h // 2)
    draw.ellipse([x + 16 * scale - dot_r, dot_y - dot_r, x + 16 * scale + dot_r, dot_y + dot_r], fill=COLOR_RED)
    draw.ellipse([x + 30 * scale - dot_r, dot_y - dot_r, x + 30 * scale + dot_r, dot_y + dot_r], fill=COLOR_YELLOW)
    draw.ellipse([x + 44 * scale - dot_r, dot_y - dot_r, x + 44 * scale + dot_r, dot_y + dot_r], fill=COLOR_GREEN)
    
    # Title text
    font_micro = ImageFont.truetype("C:/Windows/Fonts/consola.ttf", 11 * scale)
    draw.text((x + 62 * scale, y + 9 * scale), title, fill=(160, 155, 150), font=font_micro)
    
    # Code content
    font_code, font_code_bold, font_code_sm, _, _ = get_fonts(scale)
    line_y = y + header_h + 14 * scale
    for line in lines:
        curr_x = x + 16 * scale
        for chunk_text, chunk_color, is_bold in line:
            f = font_code_bold if is_bold else font_code_sm
            draw.text((curr_x, line_y), chunk_text, fill=chunk_color, font=f)
            bbox = draw.textbbox((curr_x, line_y), chunk_text, font=f)
            curr_x = bbox[2]
        line_y += 19 * scale

def draw_pill(draw, x, y, text, dot_color=COLOR_TERRACOTTA, scale=2):
    font_sans_bold = ImageFont.truetype("C:/Windows/Fonts/segoeuib.ttf", 10 * scale)
    bbox = draw.textbbox((0, 0), text, font=font_sans_bold)
    text_w = bbox[2] - bbox[0]
    pill_w = text_w + 38 * scale
    pill_h = 26 * scale
    
    draw.rounded_rectangle([x, y, x + pill_w, y + pill_h], radius=pill_h // 2, fill=(24, 21, 19, 240), outline=(250, 248, 245, 45), width=max(1, 1 * scale))
    
    dot_r = 3 * scale
    draw.ellipse([x + 14 * scale - dot_r, y + pill_h // 2 - dot_r, x + 14 * scale + dot_r, y + pill_h // 2 + dot_r], fill=dot_color)
    draw.text((x + 24 * scale, y + 6 * scale), text, fill=(250, 248, 245), font=font_sans_bold)
    return pill_w, pill_h

def build_refined_hero(is_obsidian=True, scale=2):
    orig = Image.open(INPUT_IMAGE_PATH).convert("RGBA")
    # Mirror horizontally so Arif looks left toward the hero headline
    mirrored = orig.transpose(Image.Transpose.FLIP_LEFT_RIGHT)
    
    # Canvas
    w, h = 1000 * scale, 800 * scale
    canvas = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    draw = ImageDraw.Draw(canvas)
    
    # Subject sizing
    sub_w = int(mirrored.width * scale * 0.90)
    sub_h = int(mirrored.height * scale * 0.90)
    subject = mirrored.resize((sub_w, sub_h), Image.Resampling.LANCZOS)
    
    # Position subject anchored to bottom-left
    sub_x = -20 * scale
    sub_y = h - sub_h
    
    # Circle center behind Arif's head
    head_cx = sub_x + int(sub_w * 0.40)
    head_cy = sub_y + int(sub_h * 0.40)
    circle_r = int(280 * scale)
    
    if is_obsidian:
        # Variant 3: Deep Obsidian Disc with Terracotta rim
        draw.ellipse([head_cx - circle_r, head_cy - circle_r, head_cx + circle_r, head_cy + circle_r], fill=(28, 25, 23, 240))
        draw.ellipse([head_cx - circle_r + 4*scale, head_cy - circle_r + 4*scale, head_cx + circle_r - 4*scale, head_cy + circle_r - 4*scale], outline=(192, 86, 33, 255), width=max(1, 3 * scale))
        orbit_r = circle_r + 28 * scale
        draw.ellipse([head_cx - orbit_r, head_cy - orbit_r, head_cx + orbit_r, head_cy + orbit_r], outline=(192, 86, 33, 90), width=max(1, 1 * scale))
        
        font_micro = ImageFont.truetype("C:/Windows/Fonts/consola.ttf", 9 * scale)
        draw.text((head_cx - orbit_r + 16*scale, head_cy - 10*scale), "22.5726° N, 88.3639° E", fill=(192, 86, 33, 220), font=font_micro)
        draw.text((head_cx + orbit_r - 95*scale, head_cy - 10*scale), "SEC.01 // ARCHITECT", fill=(192, 86, 33, 220), font=font_micro)
    else:
        # Variant 2: Burnt Terracotta Disc with Obsidian rim
        draw.ellipse([head_cx - circle_r, head_cy - circle_r, head_cx + circle_r, head_cy + circle_r], fill=(192, 86, 33, 235))
        draw.ellipse([head_cx - circle_r, head_cy - circle_r, head_cx + circle_r, head_cy + circle_r], outline=(28, 25, 23, 255), width=max(1, 4 * scale))
        outer_r = circle_r + 24 * scale
        draw.ellipse([head_cx - outer_r, head_cy - outer_r, head_cx + outer_r, head_cy + outer_r], outline=(28, 25, 23, 85), width=max(1, 1 * scale))
    
    # Alpha composite subject over circle
    canvas.alpha_composite(subject, (sub_x, sub_y))
    
    # BRING CODING TAB CLOSER:
    # Notice: Arif's right ear/shoulder ends around x = 500*scale.
    # We place the code card at x = 520*scale (snug right next to his shoulder/hair, partially overlapping the halo)
    card_x = int(510 * scale)
    card_y = int(170 * scale)
    card_w = int(360 * scale)
    card_h = int(220 * scale)
    
    code_lines = [
        [("<SeniorWebArchitect />", COLOR_CODE_KEYWORD, True)],
        [("  speed: ", COLOR_CODE_MUTED, False), ('"Sub-second (Jio/Airtel)"', COLOR_CODE_STRING, False)],
        [("  stack: ", COLOR_CODE_MUTED, False), ('"Next.js App Router"', COLOR_CODE_STRING, False)],
        [("  ownership: ", COLOR_CODE_MUTED, False), ('"100% Client Code & IP"', COLOR_CODE_STRING, False)],
        [("  middlemen: ", COLOR_CODE_MUTED, False), ("0", COLOR_CODE_KEYWORD, True), (",", COLOR_CODE_TEXT, False)],
        [("  whatsapp: ", COLOR_CODE_MUTED, False), ('"+91 74396 11032"', COLOR_CODE_STRING, False)],
    ]
    
    # Code card
    draw_code_card(draw, card_x, card_y, card_w, card_h, code_lines, title="architect.spec.tsx", scale=scale)
    
    # Pills positioned snugly aligned with the card
    draw_pill(draw, card_x + 10 * scale, card_y - 36 * scale, "FREELANCE SENIOR SOFTWARE ENGINEER", dot_color=COLOR_GREEN, scale=scale)
    draw_pill(draw, card_x + 10 * scale, card_y + card_h + 14 * scale, "DIRECT WHATSAPP CONVERSION RAILS", dot_color=COLOR_TERRACOTTA, scale=scale)
    
    # Downsample 2x to 1x for crisp anti-aliasing
    final_w, final_h = canvas.width // 2, canvas.height // 2
    final_img = canvas.resize((final_w, final_h), Image.Resampling.LANCZOS)
    
    # Tightly crop transparent edges with 10px margin
    bbox = final_img.getbbox()
    if bbox:
        pad = 10
        crop_box = (
            max(0, bbox[0] - pad),
            max(0, bbox[1] - pad),
            min(final_img.width, bbox[2] + pad),
            min(final_img.height, bbox[3] + pad),
        )
        final_img = final_img.crop(crop_box)
        
    return final_img

def main():
    print("Generating refined hero graphics...")
    # Refined Variant 3 (Obsidian disc)
    v3 = build_refined_hero(is_obsidian=True, scale=2)
    v3_path = os.path.join(OUTPUT_DIR, "hero_refined_v3_obsidian.png")
    v3.save(v3_path, "PNG")
    print("Saved:", v3_path)
    
    # Also save as default hero.png for direct usage
    hero_path = os.path.join(OUTPUT_DIR, "hero.png")
    v3.save(hero_path, "PNG")
    print("Saved default hero:", hero_path)
    
    # Save preview JPG for brain
    bg3 = Image.new("RGB", v3.size, COLOR_LINEN)
    bg3.paste(v3, (0, 0), v3)
    bg3.save(os.path.join(BRAIN_DIR, "preview_hero_refined_v3.jpg"), "JPEG", quality=95)
    
    # Refined Variant 2 (Terracotta disc)
    v2 = build_refined_hero(is_obsidian=False, scale=2)
    v2_path = os.path.join(OUTPUT_DIR, "hero_refined_v2_terracotta.png")
    v2.save(v2_path, "PNG")
    print("Saved:", v2_path)
    
    bg2 = Image.new("RGB", v2.size, COLOR_LINEN)
    bg2.paste(v2, (0, 0), v2)
    bg2.save(os.path.join(BRAIN_DIR, "preview_hero_refined_v2.jpg"), "JPEG", quality=95)
    print("Done!")

if __name__ == "__main__":
    main()
