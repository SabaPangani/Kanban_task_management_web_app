import { Dispatch, SetStateAction } from "react";

export type ModalType = {
  isModalOpen: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
};
