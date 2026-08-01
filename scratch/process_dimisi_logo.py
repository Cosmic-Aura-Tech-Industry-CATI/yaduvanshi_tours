from PIL import Image
import numpy as np
import os

src_path = r'c:\Users\Shubh\Desktop\DIMISI Client\yaduvanshi_tours\public\images\dimisi-logo.png'
img = Image.open(src_path).convert('RGB')
arr = np.array(img, dtype=np.float32)

# Sample background from corners (white/light background)
corners = np.concatenate([
    arr[:20, :20, :].reshape(-1, 3),
    arr[:20, -20:, :].reshape(-1, 3),
    arr[-20:, :20, :].reshape(-1, 3),
    arr[-20:, -20:, :].reshape(-1, 3),
])
mean_bg = corners.mean(axis=0)
print(f'BG sample mean: {mean_bg}')

# Distance from background color
dist = np.linalg.norm(arr - mean_bg, axis=2)

# Alpha: pixels close to white bg -> transparent
# Logo is metallic silver/grey with strong texture
# Use a threshold that keeps the metallic logo detail
threshold_low = 15.0
threshold_high = 45.0

alpha = np.clip((dist - threshold_low) / (threshold_high - threshold_low), 0.0, 1.0) * 255.0
alpha = alpha.astype(np.uint8)

rgba = np.dstack([arr.astype(np.uint8), alpha])
logo_img = Image.fromarray(rgba, 'RGBA')

# Crop to bounding box
bbox = logo_img.getbbox()
print(f'Bounding Box: {bbox}')

if bbox:
    cropped = logo_img.crop(bbox)
    
    # Add small margin
    pad = 8
    w, h = cropped.size
    padded = Image.new('RGBA', (w + 2*pad, h + 2*pad), (0, 0, 0, 0))
    padded.paste(cropped, (pad, pad))

    out_dir = r'c:\Users\Shubh\Desktop\DIMISI Client\yaduvanshi_tours\public\images'
    
    padded.save(os.path.join(out_dir, 'dimisi-logo.png'), 'PNG')
    padded.save(os.path.join(out_dir, 'dimisi-logo.webp'), 'WEBP', quality=95)

    print(f'SUCCESS! Transparent DIMISI logo saved: {padded.size[0]}x{padded.size[1]}')
else:
    print('ERROR: No bounding box found')
