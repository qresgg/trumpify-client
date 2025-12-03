import ColorClassifier from "../helpful/getColorThief";

export default async function fetchColors(selectedObject, type = "built-in") {
    const defaultColors = {
        lightMuted: [204, 204, 204],
        darkMuted: [153, 153, 153],
    };

    const imageUrl =
        selectedObject?.song_cover ||
        selectedObject?.cover ||
        selectedObject?.user_avatar_url;

    if (!imageUrl) {
        return {
            background: `linear-gradient(to bottom,
        rgb(${defaultColors.lightMuted.join(",")}),
        rgb(${defaultColors.darkMuted.join(",")})
      )`,
        };
    }

    try {
        const classifier = new ColorClassifier(imageUrl);
        const c = await classifier.getClassifiedColorsObject();

        const light = Array.isArray(c?.light) ? c.light : [];
        const dark = Array.isArray(c?.dark) ? c.dark : [];
        const lightMuted = Array.isArray(c?.lightMuted) ? c.lightMuted : [];
        const darkMuted = Array.isArray(c?.darkMuted) ? c.darkMuted : [];

        const colors = {
            lightMuted:
                light[0] || lightMuted[0] || light[1] || defaultColors.lightMuted,
            darkMuted:
                dark[1] || darkMuted[0] || dark[0] || defaultColors.darkMuted,
        };

        if (type === "built-in") {
            return {
                background: `linear-gradient(to bottom,
          rgb(${colors.lightMuted.join(",")}),
          rgb(${colors.darkMuted.join(",")})
        )`,
            };
        }

        return {
            background: `linear-gradient(to bottom,
        rgb(${colors.darkMuted.join(",")})
      )`,
        };

    } catch (error) {
        return {
            background: `linear-gradient(to bottom,
        rgb(${defaultColors.lightMuted.join(",")}),
        rgb(${defaultColors.darkMuted.join(",")})
      )`,
        };
    }
}
