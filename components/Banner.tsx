import { IMovie } from "../types";
import Link from "next/link";
import GenreLink from "./GenreLink";
import { useEffect, useState, useContext } from "react";
import { Element } from "../types";
import { BANNER_URL, API_KEY } from "../requests";
import Image from "next/image";
import { FaInfoCircle, FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import { collection, onSnapshot } from "firebase/firestore";
import useAuth from "../hooks/useAuth";
import Modal from "../components/Modal";
import { ModalContext } from "../context/modal";
import TrailerButton from "./TrailerButton";
import { handleList } from "../utils/helpers";
import { db } from "../firebase";
import { Toaster } from "react-hot-toast";
import { CircularProgress } from "@mui/material";
import { grey } from "@mui/material/colors";

interface Props {
  movie: IMovie | null;
  isMoviePage?: boolean;
  isTVShow?: boolean;
}

const Banner = ({ movie, isMoviePage = false, isTVShow = false }: Props) => {
  const date = new Date(movie?.release_date as string);
  const [trailer, setTrailer] = useState("");
  const { user } = useAuth();
  const { showModal, setShowModal } = useContext(ModalContext);
  const [addedToList, setAddedToList] = useState(false);
  const [movieList, setMovieList] = useState<IMovie[]>([]);
  const [isPosterLoaded, setIsPosterLoaded] = useState(false);

  useEffect(() => {
    if (!user?.uid) return;

    return onSnapshot(collection(db, "users"), (snapshot) =>
      setMovieList(
        snapshot.docs
          .filter((doc) => doc.id === user?.uid)
          .map((doc) => {
            return [...doc.data().userList];
          })
          .flat()
      )
    );
  }, [db, user?.uid]);

  useEffect(() => {
    setAddedToList(
      movieList.some((movieFromList) => movieFromList.id === movie?.id)
    );
  }, [movieList]);

  useEffect(() => {
    if (!movie) return;

    async function fetchMovie() {
      const data = await fetch(
        `https://api.themoviedb.org/3/${
          movie?.media_type === "tv" ? "tv" : "movie"
        }/${
          movie?.id
        }?api_key=${API_KEY}&language=en-US&append_to_response=videos`
      ).then((response) => response.json());
      if (data?.videos) {
        const index = data.videos.results.findIndex(
          (element: Element) => element.type === "Trailer"
        );
        setTrailer(data.videos?.results[index]?.key);
      }
    }

    fetchMovie();
  }, [movie]);

  return (
    <div className={`flex flex-col justify-end h-full px-2`}>
      <Toaster position="bottom-center" />
      {!isPosterLoaded && (
        <CircularProgress color="primary" className="mx-auto" size={45} />
      )}
      <div className="absolute top-0 left-0 h-full -z-10 w-screen">
        <Image
          src={`${BANNER_URL}/${movie?.backdrop_path || movie?.poster_path}`}
          alt={`${movie?.title}`}
          fill
          sizes="100wh"
          style={{ objectFit: "cover" }}
          className={`object-top ${
            isPosterLoaded ? "opacity-100" : "opacity-0"
          }`}
          priority
          onLoadingComplete={() => setIsPosterLoaded(true)}
        />
      </div>
      {isMoviePage ? (
        <div className="inline-block p-1 md:p-4 lg:p-6 space-y-2 m-4 md:m-6 lg:m-4">
          {!isTVShow && (
            <div className="flex space-x-2 md:space-x-6">
              {movie?.genres?.map((genre) => (
                <GenreLink key={genre.id} title={genre.name} />
              ))}
            </div>
          )}
          <div className="flex flex-col space-y-2 md:space-y-4 ">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-shadow-md mb-2">
              {movie?.title || movie?.name || movie?.original_name}{" "}
            </h1>
            <div className="space-x-3 md:space-x-6 flex items-center !m-0">
              {trailer && <TrailerButton />}
              <button
                onClick={() => {
                  setAddedToList((prevState) => !prevState);
                  handleList(user!, movie!, addedToList);
                }}
              >
                {!addedToList ? (
                  <span className="btn-secondary">
                    <FaPlusCircle /> Add to list
                  </span>
                ) : (
                  <span className="btn-secondary">
                    <FaMinusCircle /> Remove from list
                  </span>
                )}
              </button>
            </div>
            <div>
              {!isNaN(date.getFullYear()) && (
                <span className="page-span">{date.getFullYear()}&nbsp;</span>
              )}
              {!isNaN(date.getFullYear()) && (
                <span className="page-span">&sdot;</span>
              )}
              {movie?.runtime && (
                <span className="page-span">&nbsp;{movie?.runtime}min</span>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="sm:max-w-lg md:max-w-2xl lg:max-w-4xl justify-end md:p-4 lg:p-6 space-y-4 m-4 md:m-5">
          <div className="inline-block space-y-1 md:space-y-2">
            <h1 className="text-2xl font-bold md:text-4xl lg:text-5xl">
              {movie?.title || movie?.name || movie?.original_name}
            </h1>
            <p className="text-xs md:text-lg lg:text-xl text-shadow-md">
              {(movie?.overview?.length as number) > 100
                ? `${movie?.overview.substring(0, 300)}...`
                : movie?.overview}
            </p>
          </div>
          <div className="space-x-3 md:space-x-6 flex items-center">
            {trailer && <TrailerButton />}
            <Link
              href={
                isTVShow || movie?.media_type === "tv"
                  ? `/tvshow/${movie?.id}`
                  : `/movie/${movie?.id}`
              }
              className="btn-secondary"
            >
              <FaInfoCircle /> More Info
            </Link>
          </div>
        </div>
      )}
      {showModal && <Modal trailer={trailer} />}
    </div>
  );
};

export default Banner;
