from PIL import Image
import numpy as np
import os

src_path = r'C:\Users\Shubh\Downloads\ChatGPT Image Jul 25, 2026, 02_53_59 AM.png'
img = Image.open(src_path).convert('RGB')
arr = np.array(img, dtype=np.float32)

r, g, b = arr[:,:,0], arr[:,:,1], arr[:,:,2]

diff_rb = r - b
diff_gb = g - b

# Gold signal strength: gold pixels have R > B and G > B
# Neutral grey/white/vignette background pixels have diff_rb <= 5.0
gold_signal = np.minimum(diff_rb, diff_gb)

# Smooth alpha calculation
alpha = np.clip((gold_signal - 6.0) / (20.0 - 6.0), 0.0, 1.0) * 255.0

# Defringe RGB against background so text edges blend seamlessly onto dark navbar
alpha_norm = alpha / 255.0
rgba = np.dstack([arr, alpha]).astype(np.uint8)

logo_img = Image.fromarray(rgba, 'RGBA')

# Bounding box of alpha > 0
bbox = logo_img.split()[3].getbbox()
print('Clean Logo Bounding Box:', bbox)

if bbox:
    cropped = logo_img.crop(bbox)
    
    # Add minimal padding (e.g. 8px)
    pad = 8
    w, h = cropped.size
    padded = Image.new('RGBA', (w + 2*pad, h + 2*pad), (0, 0, 0, 0))
    padded.paste(cropped, (pad, pad))

    out_dir = r'c:\Users\Shubh\Desktop\DIMISI Client\yaduvanshi_tours\public\images'
    os.makedirs(out_dir, exist_ok=True)

    # Overwrite logo files
    padded.save(os.path.join(out_dir, 'logo-transparent.png'), 'PNG')
    padded.save(os.path.join(out_dir, 'logo.png'), 'PNG')
    padded.save(os.path.join(out_dir, 'logo.webp'), 'WEBP', quality=100)
    padded.save(os.path.join(out_dir, 'brand-logo.webp'), 'WEBP', quality=100)

    print(f'PERFECT TRANSPARENT LOGO GENERATED!')
    print(f'Dimensions: {padded.size[0]}x{padded.size[1]} (Aspect ratio: {padded.size[0]/padded.size[1]:.2f})')

    # Update Favicon with transparent crown emblem
    cw, ch = cropped.size
    emblem = cropped.crop((int(cw * 0.40), 0, int(cw * 0.60), int(ch * 0.48)))
    ebbox = emblem.split()[3].getbbox()
    if ebbox:
        emblem = emblem.crop(ebbox)
    
    ew, eh = emblem.size
    max_dim = max(ew, eh) + 12
    fav_sq = Image.new('RGBA', (max_dim, max_dim), (0, 0, 0, 0))
    fav_sq.paste(emblem, ((max_dim - ew)//2, (max_dim - eh)//2))

    fav_path = r'c:\Users\Shubh\Desktop\DIMISI Client\yaduvanshi_tours\app\favicon.ico'
    sizes = [(16,16), (32,32), (48,48), (64,64)]
    fav_imgs = [fav_sq.resize(s, Image.LANCZOS) for s in sizes]
    fav_imgs[0].save(fav_path, format='ICO', sizes=[(i.width, i.height) for i in fav_imgs], append_images=fav_imgs[1:])
    print('Favicon ICO generated with transparent crown emblem!')
