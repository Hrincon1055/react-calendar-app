import { useSelector, useDispatch } from "react-redux";
import { onOpenDateModal, onCloseDateModal } from "../store";

export const useUiStore = () => {
  // HOOKS
  const dispatch = useDispatch();
  const { isDateModalOpen } = useSelector((state) => state.ui);
  // FUNCIONES
  const openDateModal = () => {
    dispatch(onOpenDateModal());
  };
  const closeDateModal = () => {
    dispatch(onCloseDateModal());
  };
  const toggleDateModal = () => {
    isDateModalOpen ? openDateModal() : closeDateModal();
  };
  // RETORNO
  return {
    isDateModalOpen,
    openDateModal,
    closeDateModal,
    toggleDateModal,
  };
};
