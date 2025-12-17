import ColorClassifier from "../helpful/getColorThief";

export default class GradientColorExtractor {
    constructor(selectedObject) {
        this.selectedObject = selectedObject;

        this.defaultColors = {
            lightMuted: [204, 204, 204],
            darkMuted: [153, 153, 153],
        };

        this.imageUrl =
            selectedObject?.song_cover ||
            selectedObject?.cover ||
            selectedObject?.user_avatar_url;

        this._colors = null;
    }

    async _process() {
        if (this._colors) return this._colors;

        if (!this.imageUrl) {
            this._colors = {
                lightMuted: this.defaultColors.lightMuted,
                darkMuted: this.defaultColors.darkMuted,
            };
            return this._colors;
        }

        try {
            const classifier = new ColorClassifier(this.imageUrl);
            const c = await classifier.getClassifiedColorsObject();

            const light = Array.isArray(c?.light) ? c.light : [];
            const dark = Array.isArray(c?.dark) ? c.dark : [];
            const lightMuted = Array.isArray(c?.lightMuted) ? c.lightMuted : [];
            const darkMuted = Array.isArray(c?.darkMuted) ? c.darkMuted : [];

            this._colors = {
                lightMuted:
                    light[0] || lightMuted[0] || light[1] || this.defaultColors.lightMuted,
                darkMuted:
                    dark[1] || darkMuted[0] || dark[0] || this.defaultColors.darkMuted,
            };

            return this._colors;
        } catch (err) {
            this._colors = {
                lightMuted: this.defaultColors.lightMuted,
                darkMuted: this.defaultColors.darkMuted,
            };
            return this._colors;
        }
    }

    async getGradient() {
        const { lightMuted, darkMuted } = await this._process();

        return `linear-gradient(to bottom, rgb(${lightMuted.join(",")}), rgb(${darkMuted.join(",")}))`;
    }

    async getLight() {
        const { lightMuted } = await this._process();
        return `rgb(${lightMuted.join(",")})`;
    }

    async getDark() {
        const { darkMuted } = await this._process();
        return `rgb(${darkMuted.join(",")})`;
    }

    async getAll() {
        return await this._process();
    }
}
