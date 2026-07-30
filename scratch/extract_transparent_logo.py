from PIL import Image
import numpy as np
import os

src_path = r'C:\Users\Shubh\Downloads\ChatGPT Image Jul 25, 2026, 02_53_59 AM.png'
img = Image.open(src_path).convert('RGB')
arr = np.array(img, dtype=np.float32)

# Print outer border averages
bg_sample = arr[50:150, 50:150, :]
mean_bg = bg_sample.mean(axis=(0,1))
print('BG sample mean:', mean_bg)

# Calculate difference from background
dist = np.linalg.norm(arr - mean_bg, axis=2)

# The gold logo has strong color deviation from grey (R, G, B differ from each other)
# In grey background, R ≈ G ≈ B
std_rgb = np.std(arr, axis=2) # standard deviation among R, G, B channels

# Combine: logo pixels have std_rgb > 8 OR dist > 35
is_logo = (std_rgb > 8.0) | (dist > 35.0)

# Create alpha: 0 for background, 255 for logo, smooth transition
alpha = np.clip((std_rgb - 4.0) / (12.0 - 4.0), 0.0, 1.0) * 255.0
# Also mask out pixels near background color
alpha[dist < 20.0] = 0.0

rgba = np.dstack([arr, alpha]).astype(np.uint8)
logo_img = Image.fromarray(rgba, 'RGBA')

# Find bounding box of alpha > 0
bbox = logo_img.getbbox()
print('True Logo Bounding Box:', bbox)

if bbox:
    cropped = logo_img.crop(bbox)
    
    # Add clean margin
    pad = 12
    w, h = cropped.size
    padded = Image.new('RGBA', (w + 2*pad, h + 2*pad), (0, 0, 0, 0))
    padded.paste(cropped, (pad, pad))

    out_dir = r'c:\Users\Shubh\Desktop\DIMISI Client\yaduvanshi_tours\public\images'
    os.makedirs(out_dir, exist_ok=True)

    padded.save(os.path.join(out_dir, 'logo-transparent.png'), 'PNG')
    padded.save(os.path.join(out_dir, 'logo.png'), 'PNG')
    padded.save(os.path.join(out_dir, 'logo.webp'), 'WEBP', quality=100)

    print(f'SUCCESS! Transparent logo saved: {padded.size[0]}x{padded.size[1]} (Aspect ratio: {padded.size[0]/padded.size[1]:.2f})')

    # Update Favicon
    cw, ch = cropped.size
    # Crown & Fleur-de-lis top mark
    emblem = cropped.crop((int(cw * 0.38), 0, int(cw * 0.62), int(ch * 0.50)))
    ebbox = emblem.getbbox()
    if ebbox:
        emblem = emblem.crop(ebbox)
    
    ew, eh = emblem.size
    max_dim = max(ew, eh) + 16
    fav_sq = Image.new('RGBA', (max_dim, max_dim), (0, 0, 0, 0))
    fav_sq.paste(emblem, ((max_dim - ew)//2, (max_dim - eh)//2))

    fav_path = r'c:\Users\Shubh\Desktop\DIMISI Client\yaduvanshi_tours\app\favicon.ico'
    sizes = [(16,16), (32,32), (48,48), (64,64)]
    fav_imgs = [fav_sq.resize(s, Image.LANCZOS) for s in sizes]
    fav_imgs[0].save(fav_path, format='ICO', sizes=[(i.width, i.height) for i in fav_imgs], append_images=fav_imgs[1:])
    print('Favicon updated with transparent emblem!')
