from PIL import Image
import os
from pathlib import Path

def optimize_image(input_path, output_path, max_size=(800, 800)):
    try:
        with Image.open(input_path) as img:
            # Calculate new size while maintaining aspect ratio
            img.thumbnail(max_size, Image.Resampling.LANCZOS)
            
            # Save with format-specific optimized settings
            if output_path.suffix.lower() in ['.jpg', '.jpeg']:
                # Convert to RGB for JPG
                if img.mode in ['RGBA', 'P']:
                    img = img.convert('RGB')
                img.save(output_path, 
                        format='JPEG',
                        quality=85, 
                        optimize=True,
                        progressive=True)
            else:  # PNG
                # Preserve transparency for PNGs
                img.save(output_path, 
                        format='PNG',
                        optimize=True)
            
            print(f"Optimized {input_path.name}")
    except Exception as e:
        print(f"Error processing {input_path.name}: {str(e)}")

def main():
    input_dir = Path('mainimg')
    output_dir = input_dir / 'optimized'
    output_dir.mkdir(exist_ok=True)
    
    for file_path in input_dir.glob('*'):
        if file_path.suffix.lower() in ['.jpg', '.jpeg', '.png'] and file_path.is_file():
            output_path = output_dir / file_path.name
            optimize_image(file_path, output_path)

if __name__ == '__main__':
    main()
