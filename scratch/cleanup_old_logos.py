import os, glob

img_dir = r'c:\Users\Shubh\Desktop\DIMISI Client\yaduvanshi_tours\public\images'

# List of files we want to remove if they exist (old non-transparent or duplicate logo versions)
to_remove = ['brand-logo.png', 'brand-logo.webp', 'logo-transparent.png']

for name in to_remove:
    path = os.path.join(img_dir, name)
    if os.path.exists(path):
        os.remove(path)
        print(f'Removed old file: {name}')

print('Current active logo files in public/images:')
for f in os.listdir(img_dir):
    if 'logo' in f:
        p = os.path.join(img_dir, f)
        print(f'  - {f} ({os.path.getsize(p)/1024:.1f} KB)')
