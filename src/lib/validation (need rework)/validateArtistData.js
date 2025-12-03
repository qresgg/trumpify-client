import * as Yup from 'yup';
import { artistSchema } from './schema/artistSchema';

export const validateArtistData = async (data) => {
  try {
    const partialSchema = Yup.object(
      Object.keys(data).reduce((acc, key) => {
        if (artistSchema.fields[key]) {
          acc[key] = artistSchema.fields[key];
        }
        return acc;
      }, {})
    );

    await partialSchema.validate(data);

    return { isValid: true };
  } catch (error) {
    return { isValid: false, error: error.message };
  }
};
