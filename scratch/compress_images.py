from PIL import Image
import os
import glob

def compress_image(file_path, max_width=1200, quality=80):
    try:
        img = Image.open(file_path)
        orig_size = os.path.getsize(file_path)
        
        # Resize if width is larger than max_width
        w, h = img.size
        if w > max_width:
            ratio = max_width / float(w)
            new_h = int(h * ratio)
            img = img.resize((max_width, new_h), Image.Resampling.LANCZOS)
            print(f"Resized {os.path.basename(file_path)} from {w}x{h} to {max_width}x{new_h}")
            
        # Save back as WebP
        # If it's a PNG, we'll save it as WebP at the end
        ext = os.path.splitext(file_path)[1].lower()
        if ext == '.png':
            new_path = os.path.splitext(file_path)[0] + '.webp'
            img.save(new_path, 'WEBP', quality=quality)
            new_size = os.path.getsize(new_path)
            print(f"Converted PNG to WebP: {os.path.basename(file_path)} ({orig_size/1024:.1f} KB) -> {os.path.basename(new_path)} ({new_size/1024:.1f} KB)")
        else:
            img.save(file_path, 'WEBP', quality=quality)
            new_size = os.path.getsize(file_path)
            print(f"Compressed WebP: {os.path.basename(file_path)} ({orig_size/1024:.1f} KB) -> ({new_size/1024:.1f} KB) [Saved {((orig_size-new_size)/orig_size)*100:.1f}%]")
    except Exception as e:
        print(f"Error compressing {file_path}: {e}")

if __name__ == '__main__':
    tours_dir = r'c:\Users\Shubh\Desktop\DIMISI Client\yaduvanshi_tours\public\tours'
    weddings_dir = r'c:\Users\Shubh\Desktop\DIMISI Client\yaduvanshi_tours\public\weddings'
    dest_dir = r'c:\Users\Shubh\Desktop\DIMISI Client\yaduvanshi_tours\public\destinations'
    
    # 1. Compress tours
    print("--- Compressing Tours ---")
    for f in glob.glob(os.path.join(tours_dir, '*.webp')):
        compress_image(f)
        
    for f in glob.glob(os.path.join(tours_dir, '*.png')):
        compress_image(f)
        
    # 2. Compress weddings
    print("\n--- Compressing Weddings ---")
    for f in glob.glob(os.path.join(weddings_dir, '*.webp')):
        compress_image(f, max_width=1600) # Keep slightly higher resolution for weddings if needed, but still compress
        
    # 3. Compress destinations
    print("\n--- Compressing Destinations ---")
    for f in glob.glob(os.path.join(dest_dir, '*.png')):
        compress_image(f)
    for f in glob.glob(os.path.join(dest_dir, '*.webp')):
        compress_image(f)
