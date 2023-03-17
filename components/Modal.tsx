import Modal from "@mui/material/Modal";
import { useContext, useState } from "react";
import { ModalContext } from "../context/modal";
import { IoMdClose } from "react-icons/io";
import ReactPlayer from "react-player/lazy";
import { BsFillVolumeMuteFill, BsFillVolumeUpFill } from "react-icons/bs";

interface Props {
  trailer: string;
}

export default function BasicModal({ trailer }: Props) {
  const { showModal, setShowModal } = useContext(ModalContext);
  const [muted, setMuted] = useState(true);
  const handleClose = () => setShowModal(false);

  return (
    <Modal
      open={showModal}
      onClose={handleClose}
      className="fixed !top-7 !left-0 !right-0 !z-50 mx-auto w-full max-w-5xl"
    >
      <>
        <button
          onClick={handleClose}
          className="btn-modal absolute right-5 top-5 !z-40 h-9 w-9 border-none bg-[#181818]"
        >
          <IoMdClose className="h-6 w-6" />
        </button>
        <div className="relative pt-[56.25%]">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${trailer}`}
            width="100%"
            height="100%"
            style={{
              position: "absolute",
              top: "0",
              left: "0",
            }}
            playing
            muted={muted}
          />
          <div className="absolute left-10 bottom-10">
            <button onClick={() => setMuted((prevState) => !prevState)}>
              {muted ? (
                <BsFillVolumeMuteFill className="btn-modal absolute left-3 bottom-3 !z-40 border-none bg-[#181818]/50 p-1" />
              ) : (
                <BsFillVolumeUpFill className="btn-modal absolute left-3 bottom-3 !z-40 border-none bg-[#181818]/50 p-1" />
              )}
            </button>
          </div>
        </div>
      </>
    </Modal>
  );
}
