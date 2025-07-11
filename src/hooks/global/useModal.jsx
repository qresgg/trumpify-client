import { useSelector, useDispatch } from "react-redux";
import {
  setModalView
} from "../../lib/redux/pages/viewSlice";

export function useModal() {
  const dispatch = useDispatch();
  // const modalState = useSelector((state) => state.view.modal.modalStateSongCreate);
  const modal = useSelector((state) => state.view.modal);

  const modalActions = {
    songCreate: 'modalStateSongCreate',
    userPage: 'modalStateUserPage', 
    showCropperUserPage: 'modalStateShowCropperUserPage',
    showCropperCover: 'modalStateShowCropperCover',
    showCropperArtistConfig: 'modalStateShowCropperArtistConfig',
    searchMenu: 'modalStateSearchMenu',
    dropDownMenu: 'modalStateDropDownMenu'
  };

  const changeModalState = (isOpen, type) => {
    dispatch(setModalView({ view: modalActions[type], value: isOpen}))
  };

  const openModal = (type) => changeModalState(true, type);
  const closeModal = (type) => changeModalState(false, type);

  return {
    openModal,
    closeModal
  };
}
