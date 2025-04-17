import ColorClassifier from "../colorThief";

export default async function fetchColors (selectedObject){
    let colors = { lightMuted: '#ccc', darkMuted: '#999' };
    if (selectedObject?.song_cover || selectedObject?.cover || selectedObject?.user_avatar_url) {
      try {
        const classifier = new ColorClassifier(selectedObject?.song_cover || selectedObject?.cover || selectedObject?.user_avatar_url);
        const classifiedColors = await classifier.getClassifiedColorsObject();
        colors = ({
          lightMuted: classifiedColors.light[0] || '#ccc',
          darkMuted: classifiedColors.dark[0] || '#999',
        });

        return {
            background: `linear-gradient(to bottom, rgb(${colors.lightMuted[0]}, ${colors.lightMuted[1]}, ${colors.lightMuted[2]}), rgb(${colors.darkMuted[0]}, ${colors.darkMuted[1]}, ${colors.darkMuted[2]}))`,
          }
      } catch (error) {
        console.error('Error in color analysis:', error);
      }
    }
};