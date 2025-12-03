import ColorThief from 'colorthief';

class ColorClassifier {
  constructor(imageUrl) {
    this.imageUrl = imageUrl;
    this.colorThief = new ColorThief();
  }

  async loadImage() {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.src = this.imageUrl;
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error('Failed to load image'));
    });
  }

  async getClassifiedColorsObject() {
    try {
      const imageElement = await this.loadImage();
      const palette = this.colorThief.getPalette(imageElement, 10);
      const classifiedColors = { light: [], dark: [], lightMuted: [], darkMuted: [], default: [] };

      palette.forEach(color => {
        const type = this.classifyColor(color);
        classifiedColors[type].push(color);
      });

      return classifiedColors;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  classifyColor(rgb) {
    const [r, g, b] = rgb;
    const brightness = (r + g + b) / 3;
    const saturation = Math.max(r, g, b) - Math.min(r, g, b);

    if (brightness > 200 && saturation < 50) return 'light';
    if (brightness < 100 && saturation < 50) return 'dark';
    if (brightness > 200 && saturation >= 50) return 'lightMuted';
    if (brightness < 100 && saturation >= 50) return 'darkMuted';
    return 'default';
  }
}

export default ColorClassifier;