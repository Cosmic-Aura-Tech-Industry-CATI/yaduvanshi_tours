from PIL import Image
import os
import shutil

# Src files from artifacts
manoj_src = r"C:\Users\Shubh\.gemini\antigravity-ide\brain\03d6b604-ba7d-4859-ac7a-4eef609882f8\manoj_yadav_founder_1785425261876.png"
anirudh_src = r"C:\Users\Shubh\.gemini\antigravity-ide\brain\03d6b604-ba7d-4859-ac7a-4eef609882f8\anirudh_yadav_legacy_1785425277344.png"

# Target files in public images
dest_dir = r"c:\Users\Shubh\Desktop\DIMISI Client\yaduvanshi_tours\public\images"
manoj_dest = os.path.join(dest_dir, "manoj-yadav.webp")
anirudh_dest = os.path.join(dest_dir, "anirudh-yadav.webp")

def convert_to_webp(src, dest):
    try:
        img = Image.open(src)
        # Resize to a clean 800x800 square or similar layout boundary (aspect ratio preservation)
        # If it's portrait/landscape, we preserve it but limit max width to 800px
        w, h = img.size
        max_w = 800
        if w > max_w:
            ratio = max_w / float(w)
            new_h = int(h * ratio)
            img = img.resize((max_w, new_h), Image.Resampling.LANCZOS)
            print(f"Resized image to {max_w}x{new_h}")
            
        img.save(dest, 'WEBP', quality=85)
        print(f"Successfully converted and saved {src} -> {dest}")
    except Exception as e:
        print(f"Error converting {src}: {e}")

if __name__ == '__main__':
    convert_to_webp(manoj_src, manoj_dest)
    convert_to_webp(anirudh_src, anirudh_dest)
