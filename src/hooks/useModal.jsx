import { useSelector, useDispatch } from "react-redux";
import { setModalState } from "../lib/redux/pages/viewSlice";

export function useModal() {
    const dispatch = useDispatch();
    const modalState = useSelector((state) => state.view.modal.modalState)

    const changeModalState = (state) => {
        dispatch(setModalState(state));
    }

    const closeModal = () => {
        changeModalState(false);
    }
    const openModal = () => {
        changeModalState(true);
    }
    
    return { closeModal, openModal}
}