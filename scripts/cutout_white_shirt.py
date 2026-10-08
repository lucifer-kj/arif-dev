import os
from PIL import Image
from rembg import remove

INPUT_PATH = "C:/Users/USER/.gemini/antigravity/brain/ad82cf6d-f7d2-4897-a662-bc7e037a8cbd/.user_uploaded/media_1791487961266_d05f36a6.jpg"
OUTPUT_DIR = "C:/Users/USER/.gemini/antigravity/brain/ad82cf6d-f7d2-4897-a662-bc7e037a8cbd"

def main():
    print("Reading input image...")
    inp = Image.open(INPUT_PATH)
    print("Removing background with rembg...")
    out = remove(inp)
    
    out_path = os.path.join(OUTPUT_DIR, "arif_white_shirt_cutout.png")
    out.save(out_path, "PNG")
    print("Saved cutout to:", out_path)

if __name__ == "__main__":
    main()
