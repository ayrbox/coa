import os
import glob
from PIL import Image

def process_image(img_path, mask_path, out_path):
    if not os.path.exists(img_path) or not os.path.exists(mask_path):
        print(f"Skipping {img_path} or {mask_path} not found")
        return
    
    img = Image.open(img_path).convert("RGBA")
    mask = Image.open(mask_path).convert("L")
    
    if img.size != mask.size:
        print(f"Size mismatch: {img_path}")
        return
        
    img_data = img.load()
    mask_data = mask.load()
    
    width, height = img.size
    for y in range(height):
        for x in range(width):
            # In VB6, black in mask typically means keep, white means transparent (for vbSrcAnd)
            # Or vice versa. Let's check mask color. If mask is white (>128), it's background -> alpha=0.
            if mask_data[x, y] > 128:
                img_data[x, y] = (0, 0, 0, 0)
            else:
                r, g, b, a = img_data[x, y]
                img_data[x, y] = (r, g, b, 255)
                
    img.save(out_path)
    print(f"Saved {out_path}")

def main():
    out_dir = "chopper-web/public/assets"
    os.makedirs(out_dir, exist_ok=True)
    
    # 1. Player
    for i in range(5):
        suf = str(i) if i > 0 else ""
        suf2 = suf if suf != "0" else ""
        if i == 0: suf2 = ""
        process_image(f"Choper{suf2}.bmp", f"MaskChoper{suf2}.bmp", f"{out_dir}/player_{i}.png")
        
    # 2. Enemy
    for i in range(2):
        suf = str(i) if i > 0 else ""
        process_image(f"AttackingChoper{suf}.bmp", f"MaskAttackingChoper{suf}.bmp", f"{out_dir}/enemy_{i}.png")
        
    # 3. Bullet
    process_image("Bullet.bmp", "MaskBullet.bmp", f"{out_dir}/bullet.png")
    
    # 4. Small explosion
    for i in range(1, 18):
        suf = str(i) if i > 0 else ""
        if i == 0: suf = ""
        process_image(f"Explode/Explode{suf}.bmp", f"Explode/MaskExplode{suf}.bmp", f"{out_dir}/explode_{i-1}.png")
        
    # 5. Big explosion
    for i in range(1, 18):
        suf = str(i) if i > 0 else ""
        if i == 0: suf = ""
        process_image(f"Big Explode/Explode{suf}.bmp", f"Big Explode/MaskExplode{suf}.bmp", f"{out_dir}/big_explode_{i-1}.png")

    # 6. Background
    bg = Image.open("Mountain.jpg")
    bg.save(f"{out_dir}/Mountain.jpg")

if __name__ == "__main__":
    main()
