from PIL import Image
import numpy as np
import os

src_path = r'C:\Users\Shubh\Downloads\ChatGPT Image Jul 25, 2026, 03_46_06 PM.png'
img = Image.open(src_path)

# Crop outer margins to focus on content
w, h = img.size
cropped = img.crop((40, 140, w - 40, h - 140))

out_dir = r'c:\Users\Shubh\Desktop\DIMISI Client\yaduvanshi_tours\public\images'
os.makedirs(out_dir, exist_ok=True)

# Replace logo.webp and logo.png
cropped.convert('RGB').save(os.path.join(out_dir, 'logo.webp'), 'WEBP', quality=95)
cropped.convert('RGB').save(os.path.join(out_dir, 'logo.png'), 'PNG')

print(f'Successfully replaced logo.webp & logo.png with ChatGPT Image Jul 25, 2026, 03_46_06 PM.png! Size: {cropped.size}')

# Update Favicon
cw, ch = cropped.size
emblem = cropped.crop((int(cw * 0.40), 0, int(cw * 0.60), int(ch * 0.48)))
ew, eh = emblem.size
max_dim = max(ew, eh) + 12
fav_sq = Image.new('RGB', (max_dim, max_dim), (12, 21, 25)) # match dark bg
fav_sq.paste(emblem, ((max_dim - ew)//2, (max_dim - eh)//2))

fav_path = r'c:\Users\Shubh\Desktop\DIMISI Client\yaduvanshi_tours\app\favicon.ico'
sizes = [(16,16), (32,32), (48,48), (64,64)]
fav_imgs = [fav_sq.resize(s, Image.LANCZOS) for s in sizes]
fav_imgs[0].save(fav_path, format='ICO', sizes=[(i.width, i.height) for i in fav_imgs], append_images=fav_imgs[1:])
print('Favicon updated successfully!')
