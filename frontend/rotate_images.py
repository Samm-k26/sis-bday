from PIL import Image
import os

images = {
    'media__1783843954320.jpg': 180, # Great Times
    'media__1783843967420.jpg': 90,  # Good Vibes (rotate 270 degrees in CSS means 90 degrees CCW, or is it 270 CW? PIL rotate is CCW. CSS rotate is CW. So 270 CW = 90 CCW)
    'media__1783843971210.jpg': 90,  # Forever
    'media__1783843963476.jpg': 180, # Together
    'media__1783843821090.jpg': 180, # Celebrations
}

for img_name, angle in images.items():
    path = f"/home/swajal/sis-bday/frontend/public/images/{img_name}"
    if os.path.exists(path):
        with Image.open(path) as img:
            # PIL rotate is counter-clockwise. CSS rotate is clockwise.
            # So angle 180 is same. Angle 270 CW = 90 CCW.
            rotated = img.rotate(-angle, expand=True) # negative angle for CW
            rotated.save(path)
            print(f"Rotated {img_name} by {angle} CW")
    else:
        print(f"Not found: {path}")
