import { useState } from "react";
import { IMovie } from "../types";
import { IMAGE_URL } from "../requests";
import { DocumentData } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { CircularProgress } from "@mui/material";

interface Props {
  movie: IMovie | DocumentData;
  isGenrePage: boolean;
  isTVShow?: boolean;
}

const Thumbnail = ({ movie, isGenrePage, isTVShow = false }: Props) => {
  const [isPosterLoaded, setIsPosterLoaded] = useState(false);

  const homePageUrl = `https://image.tmdb.org/t/p/w500${
    movie.backdrop_path || movie.poster_path
  }`;

  const genrePageUrl = `${IMAGE_URL}/${
    movie.backdrop_path || movie.poster_path
  }`;

  return (
    <Link href={isTVShow ? `/tvshow/${movie.id}` : `/movie/${movie.id}`}>
      <div
        className={`relative cursor-pointer transition duration-200 flex justify-center items-center ${
          isGenrePage
            ? "min-w-[120px]  ease-out h-44 sm:min-w-[180px] md:h-60 md:min-w-[260px] md:hover:scale-102 lg:h-64"
            : "h-28 min-w-[180px] ease-out md:h-36 md:min-w-[260px] md:hover:scale-105"
        } `}
      >
        <Image
          src={isGenrePage ? genrePageUrl : homePageUrl}
          alt={movie.title || movie.name}
          className={`rounded-sm object-cover ${
            isPosterLoaded ? "opacity-100" : "opacity-0"
          }`}
          fill
          sizes="100wh"
          onLoadingComplete={() => setIsPosterLoaded(true)}
        />
        {!isPosterLoaded && <CircularProgress color="primary" size={30} />}
      </div>
    </Link>
  );
};

export default Thumbnail;
