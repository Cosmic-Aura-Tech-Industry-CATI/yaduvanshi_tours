import subprocess
import imageio_ffmpeg
import os
import cv2

ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
src = r"C:\Users\Shubh\Downloads\fortuner-himalaya.mp4"
public_videos = r"c:\Users\Shubh\Desktop\DIMISI Client\yaduvanshi_tours\public\videos"
public_images = r"c:\Users\Shubh\Desktop\DIMISI Client\yaduvanshi_tours\public\images"

os.makedirs(public_videos, exist_ok=True)
os.makedirs(public_images, exist_ok=True)

dst_mp4 = os.path.join(public_videos, "hero-new.mp4")
dst_webm = os.path.join(public_videos, "hero-new.webm")
dst_mobile = os.path.join(public_videos, "hero-new-mobile.mp4")
poster_jpg = os.path.join(public_images, "hero-poster.jpg")
poster_webp = os.path.join(public_images, "hero-poster.webp")

print("1. Extracting poster from frame 0...")
cap = cv2.VideoCapture(src)
ret, frame = cap.read()
if ret:
    cv2.imwrite(poster_jpg, frame, [int(cv2.IMWRITE_JPEG_QUALITY), 95])
    cv2.imwrite(poster_webp, frame, [int(cv2.IMWRITE_WEBP_QUALITY), 95])
cap.release()

# Video duration: 15.04s.
# We apply seamless loop crossfade (duration 0.8s) so end blends into beginning smoothly.
print("2. Encoding seamless hero-new.mp4...")
filter_str = (
    "[0:v]split=2[v0][v1];"
    "[v0]trim=start=0.8:end=15.04,setpts=PTS-STARTPTS,fps=24[a];"
    "[v1]trim=start=0.0:end=0.8,setpts=PTS-STARTPTS,fps=24[b];"
    "[a][b]xfade=transition=fade:duration=0.8:offset=13.44[outv]"
)

cmd_mp4 = [
    ffmpeg, "-y",
    "-i", src,
    "-filter_complex", filter_str,
    "-map", "[outv]",
    "-c:v", "libx264",
    "-crf", "22",
    "-preset", "slow",
    "-pix_fmt", "yuv420p",
    "-movflags", "+faststart",
    "-an",
    dst_mp4
]
res = subprocess.run(cmd_mp4, capture_output=True, text=True)
if res.returncode != 0:
    print("MP4 creation failed:", res.stderr)
else:
    print(f"MP4 created successfully! Size: {os.path.getsize(dst_mp4)} bytes ({os.path.getsize(dst_mp4)/(1024*1024):.2f} MB)")

if os.path.exists(dst_mp4) and os.path.getsize(dst_mp4) > 1000:
    print("3. Encoding compressed hero-new.webm fallback...")
    cmd_webm = [
        ffmpeg, "-y",
        "-i", dst_mp4,
        "-c:v", "libvpx-vp9",
        "-b:v", "0",
        "-crf", "32",
        "-an",
        dst_webm
    ]
    res_webm = subprocess.run(cmd_webm, capture_output=True, text=True)
    if res_webm.returncode != 0:
        print("WebM VP9 failed, trying libvpx...")
        cmd_webm_vpx = [
            ffmpeg, "-y",
            "-i", dst_mp4,
            "-c:v", "libvpx",
            "-b:v", "1200k",
            "-an",
            dst_webm
        ]
        res_webm2 = subprocess.run(cmd_webm_vpx, capture_output=True, text=True)
        if res_webm2.returncode == 0:
            print(f"WebM created! Size: {os.path.getsize(dst_webm)} bytes ({os.path.getsize(dst_webm)/(1024*1024):.2f} MB)")
        else:
            print("WebM failed:", res_webm2.stderr)
    else:
        print(f"WebM created! Size: {os.path.getsize(dst_webm)} bytes ({os.path.getsize(dst_webm)/(1024*1024):.2f} MB)")

    # Mobile version (lower bitrate 720p / under 3MB)
    print("4. Encoding mobile optimized hero-new-mobile.mp4...")
    cmd_mobile = [
        ffmpeg, "-y",
        "-i", dst_mp4,
        "-c:v", "libx264",
        "-crf", "26",
        "-preset", "slow",
        "-pix_fmt", "yuv420p",
        "-movflags", "+faststart",
        "-an",
        dst_mobile
    ]
    res_mobile = subprocess.run(cmd_mobile, capture_output=True, text=True)
    if res_mobile.returncode == 0:
        print(f"Mobile MP4 created! Size: {os.path.getsize(dst_mobile)} bytes ({os.path.getsize(dst_mobile)/(1024*1024):.2f} MB)")

    # Now extract first frame of dst_mp4 so poster matches the exact first frame
    cap = cv2.VideoCapture(dst_mp4)
    ret, frame = cap.read()
    if ret:
        cv2.imwrite(poster_jpg, frame, [int(cv2.IMWRITE_JPEG_QUALITY), 95])
        cv2.imwrite(poster_webp, frame, [int(cv2.IMWRITE_WEBP_QUALITY), 95])
        print(f"Saved matching hero-poster.jpg: {os.path.getsize(poster_jpg)} bytes")
    cap.release()
