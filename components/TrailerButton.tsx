import { useContext } from "react";
import { ModalContext } from "../context/modal";import { FaPlay } from "react-icons/fa";


const TrailerButton = () => {
  const { setShowModal } = useContext(ModalContext)

  return (
    <button
      className="btn-trailer"
      onClick={() => {
        setShowModal(true);
      }}
    >
      <FaPlay />
      Trailer
    </button>
  );
};

export default TrailerButton;
