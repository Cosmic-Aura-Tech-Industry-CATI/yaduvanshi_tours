from PIL import Image
import os

src = r"C:\Users\Shubh\Downloads\ChatGPT Image Jul 30, 2026, 11_33_18 PM.png"
dest = r"c:\Users\Shubh\Desktop\DIMISI Client\yaduvanshi_tours\public\images\contact-hero-bg.webp"

try:
    img = Image.open(src)
    w, h = img.size
    max_w = 1920
    if w > max_w:
        ratio = max_w / float(w)
        new_h = int(h * ratio)
        img = img.resize((max_w, new_h), Image.Resampling.LANCZOS)
        print(f"Resized contact hero image to {max_w}x{new_h}")
        
    img.save(dest, 'WEBP', quality=82)
    print(f"Successfully converted and saved {src} -> {dest}")
except Exception as e:
    print(f"Error converting contact hero image: {e}")
