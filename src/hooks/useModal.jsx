import { useSelector, useDispatch } from "react-redux";
import {
  setModalStateSongCreate,
  setModalStateUserPage,
  setModalStateShowCropperUserPage,
} from "../lib/redux/pages/viewSlice";

export function useModal() {
  const dispatch = useDispatch();
  // const modalState = useSelector((state) => state.view.modal.modalStateSongCreate);

  const modalActions = {
    songCreate: setModalStateSongCreate,
    userPage: setModalStateUserPage, 
    showCropperUserPage: setModalStateShowCropperUserPage,
  };

  const changeModalState = (isOpen, type) => {
    const action = modalActions[type];
    if (action) dispatch(action(isOpen));
  };

  const openModal = (type) => changeModalState(true, type);
  const closeModal = (type) => changeModalState(false, type);

  return {
    openModal,
    closeModal
  };
}
