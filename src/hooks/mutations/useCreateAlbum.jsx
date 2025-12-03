import { useMutation } from '@tanstack/react-query';
import { createAlbum } from '../../services/artist/artistService';

export const useCreateAlbum = () => {
    return useMutation({
        mutationFn: createAlbum,
    })
}