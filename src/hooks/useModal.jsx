import { useSelector, useDispatch } from "react-redux";
import { setModalStateSongCreate } from "../lib/redux/pages/viewSlice";

export function useModal() {
    const dispatch = useDispatch();
    const modalState = useSelector((state) => state.view.modal.modalStateSongCreate)

    const changeModalState = (state) => {
        dispatch(setModalStateSongCreate(state));
    }

    const closeModal = (type) => {
        type === 'songCreate' && changeModalState(false);
    }
    const openModal = (type) => {
        type === 'songCreate' && changeModalState(true);
    }
    
    return { closeModal, openModal}
}