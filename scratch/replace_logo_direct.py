from PIL import Image
import os

src_path = r'C:\Users\Shubh\Downloads\ChatGPT Image Jul 25, 2026, 02_53_59 AM.png'
img = Image.open(src_path)

print('Original image size:', img.size)

# Convert image
img_rgb = img.convert('RGB')

# Crop to tight bounding box of content (removing outer grey/white margin if any)
# Let's crop inner logo area (or keep pristine image)
# Original image is 1536x1024
# Let's inspect where logo artwork sits (X: 56 to 1456, Y: 157 to 867)
w, h = img.size
cropped = img_rgb.crop((40, 140, w - 40, h - 140))

out_dir = r'c:\Users\Shubh\Desktop\DIMISI Client\yaduvanshi_tours\public\images'
os.makedirs(out_dir, exist_ok=True)

# Save directly as logo.webp and logo.png
cropped.save(os.path.join(out_dir, 'logo.webp'), 'WEBP', quality=95)
cropped.save(os.path.join(out_dir, 'logo.png'), 'PNG')

print('Saved logo.webp & logo.png directly from ChatGPT Image Jul 25, 2026, 02_53_59 AM.png!')
print('New logo dimensions:', cropped.size)
