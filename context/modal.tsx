import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useState,
} from "react";

interface IModal {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

export const ModalContext = createContext<IModal>({
  showModal: false,
  setShowModal: () => {},
});

const ModalProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [showModal, setShowModal] = useState(false);

  const value = {
    showModal,
    setShowModal,
  };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};

export default ModalProvider;
