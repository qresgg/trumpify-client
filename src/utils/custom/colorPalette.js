import ColorClassifier from "../../hooks/colorThief";

export default async function fetchColors(selectedObject) {
  let colors = {
    lightMuted: [204, 204, 204],
    darkMuted: [153, 153, 153], 
  };

  const imageUrl = selectedObject?.song_cover || selectedObject?.cover || selectedObject?.user_avatar_url;

  if (!imageUrl) return;

  try {
    const classifier = new ColorClassifier(imageUrl);
    const classifiedColors = await classifier.getClassifiedColorsObject();

    const light = Array.isArray(classifiedColors?.light) ? classifiedColors.light : [];
    const dark = Array.isArray(classifiedColors?.dark) ? classifiedColors.dark : [];
    const lightMuted = Array.isArray(classifiedColors?.lightMuted) ? classifiedColors.lightMuted : [];
    const darkMuted = Array.isArray(classifiedColors?.darkMuted) ? classifiedColors.darkMuted : [];

    colors.lightMuted = light[0] || lightMuted[0] || light[1] || [204, 204, 204];
    colors.darkMuted = dark[1] || darkMuted[0] || dark[0] || [153, 153, 153];

    return {
      background: `linear-gradient(to bottom, rgb(${colors.lightMuted[0]}, ${colors.lightMuted[1]}, ${colors.lightMuted[2]}), rgb(${colors.darkMuted[0]}, ${colors.darkMuted[1]}, ${colors.darkMuted[2]}))`,
    };
  } catch (error) {
    return {
      background: `linear-gradient(to bottom, rgb(${colors.lightMuted[0]}, ${colors.lightMuted[1]}, ${colors.lightMuted[2]}), rgb(${colors.darkMuted[0]}, ${colors.darkMuted[1]}, ${colors.darkMuted[2]}))`,
    };
  }
}
