# 05. AI Creative Asset Generation Prompts

**Project**: Portfolio for **Arif** (Freelance Senior Software Engineer & Web Architect)  
**Design Reference**: Replicated Pixel-by-Pixel from `C:\Users\USER\Documents\Builds\kolk`  
**Color Palette**: Warm Linen Ivory (`#FAF8F5`), Deep Espresso Obsidian (`#1C1917`), Soft Warm Alabaster (`#F4F1EB`), Rich Burnt Terracotta (`#C05621`).  
**Objective**: Production-ready prompts and specifications to generate bespoke visual assets, UI mockups, and performance telemetry graphics that align with Swiss-modernist editorial elegance and appeal directly to Indian business owners and founders.

---

## 1. Asset Strategy & Technical Constraints

We avoid generic stock photos of corporate handshakes. We generate **clean, architectural software visuals**: warm paper surfaces, elegant mobile layouts on Indian 4G networks, crisp Swiss typography, and high-contrast performance readouts.

### Technical File Specifications

| Asset Class | Format | Codec / Quality | Target File Size | Max Resolution | Frame Rate |
|---|---|---|---|---|---|
| **Case Study UI Mockups** | `.webp` / `.avif` | Lossless / Quality 80 | **< 120 KB** | 1920 × 1080 (16:9) | Static with Retina density |
| **Hero Telemetry Preview** | `.webp` / `.avif` | High Q / WebP | **< 80 KB** | 1200 × 800 (3:2) | Static with crisp borders |
| **Vector Reticles & Icons** | `.svg` | Vector | **< 4 KB** | Scalable | Crisp 1px strokes |

---

## 2. Midjourney v6.1 Prompts (Swiss-Modernist Aesthetic)

All prompts use Midjourney v6.1 with `--style raw` and exact Kolk color harmony.

---

### Asset 01: Hero Swiss Interface Mockup (Warm Linen & Espresso)
* **Placement**: Homepage Hero Section / Live Dogfooding Card
* **Tool**: Midjourney v6.1 (`--ar 16:9 --v 6.1 --style raw`)
* **Prompt**:
  > *"A hyper-clean Swiss-modernist website interface displayed on a warm linen ivory background (#FAF8F5). Minimalist typography in deep espresso obsidian (#1C1917), subtle burnt terracotta accents (#C05621), crisp hairline border grid, elegant paper shadow elevation. Monospace speed metrics showing '0.62s mobile load' and '100/100 PageSpeed'. Designed by Josef Müller-Brockmann meets modern Apple ergonomics, 8k resolution, immaculate layout, no humans, architectural precision --ar 16:9 --style raw --v 6.1"*
* **Negative Prompt**:
  > *"neon glow, cyberpunk, electric cyan, chaotic colors, 3D render character, messy desk, plastic textures, blurry text."*

---

### Asset 02: D2C E-Commerce Mobile Speed Transformation (Before & After)
* **Placement**: Case Study 1 (`D2C Apparel Mobile Speed Overhaul`)
* **Tool**: Midjourney v6.1 (`--ar 16:9 --v 6.1`)
* **Prompt (State A - Sluggish Legacy Site)**:
  > *"A cluttered, slow-loading mobile e-commerce website on a phone screen mockup. Heavy overlapping image banners, tiny unclickable buttons, intrusive popups, and a spinning loading spinner. Photographed on a matte surface with natural soft shadows --ar 16:9 --v 6.1"*
* **Prompt (State B - Arif's Sub-Second Next.js Storefront)**:
  > *"The exact same mobile e-commerce storefront reimagined with Swiss architectural elegance. Clean ivory white background, razor-sharp typography, ultra-clear product imagery, one-tap green WhatsApp purchase button, sub-second load time, zero clutter. Premium luxury look --ar 16:9 --v 6.1"*

---

### Asset 03: High-Ticket B2B Corporate Portal
* **Placement**: Case Study 2 (`B2B Manufacturing Rebuild`)
* **Tool**: Midjourney v6.1 (`--ar 16:9 --v 6.1 --style raw`)
* **Prompt**:
  > *"A prestigious, minimalist B2B enterprise website layout displayed in a browser window mockup. Clean architectural grid, warm neutral alabaster background (#F4F1EB), espresso obsidian typography, structured technical specification tables with hairline dividers, burnt terracotta accent badges. Sophisticated corporate design, high editorial fashion catalogue feel, ultra-sharp detail --ar 16:9 --style raw --v 6.1"*

---

### Asset 04: SaaS Product Launch Waitlist
* **Placement**: Case Study 3 (`High-Speed SaaS Launch`)
* **Tool**: Midjourney v6.1 (`--ar 16:9 --v 6.1 --style raw`)
* **Prompt**:
  > *"A modern tech startup landing page mockup with a minimalist interactive product interface. Warm off-white canvas, clean dark typography, subtle terracotta CTA buttons, floating preview cards with paper elevation shadows, sub-second performance badges. World-class venture-backed software aesthetic, 8k resolution --ar 16:9 --style raw --v 6.1"*

---

## 3. Post-Production & Compression Pipeline

Before committing any generated asset into the repository, run it through this optimization pipeline:

```bash
# 1. Convert PNG to high-efficiency AVIF (Quality 75)
npx @squoosh/cli --avif '{"cqLevel":28}' -d ./public/images input.png

# 2. Convert PNG to modern WebP (Quality 82)
npx @squoosh/cli --webp '{"quality":82}' -d ./public/images input.png
```

* **Size Gate**: No single hero or case study image asset may exceed **120 KB**.
* **Base64 Blur**: Next.js `<Image />` tags must include `placeholder="blur"` with a low-res base64 data string to guarantee zero layout shift (`CLS = 0.00`).
