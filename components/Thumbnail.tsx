import { IMovie } from "../types";
import Image from "next/image";
import { IMAGE_URL } from "../requests";
import Link from "next/link";
import { DocumentData } from "firebase/firestore";

interface Props {
  movie: IMovie | DocumentData;
  isGenrePage: boolean;
  isTVShow?: boolean;
}

const Thumbnail = ({ movie, isGenrePage, isTVShow = false }: Props) => {
  const homePageUrl = `https://image.tmdb.org/t/p/w500${
    movie.backdrop_path || movie.poster_path
  }`;

  const genrePageUrl = `${IMAGE_URL}/${
    movie.backdrop_path || movie.poster_path
  }`;

  return (
    <Link href={isTVShow ? `/tvshows/${movie.id}` : `/movie/${movie.id}`}>
      <div
        className={`relative cursor-pointer transition duration-200 ${
          isGenrePage
            ? "min-w-[120px]  ease-out h-44 sm:min-w-[180px] md:h-60 md:min-w-[260px] md:hover:scale-102 lg:h-64"
            : "h-28 min-w-[180px] ease-out md:h-36 md:min-w-[260px] md:hover:scale-105"
        } `}
      >
        <Image
          src={isGenrePage ? genrePageUrl : homePageUrl}
          alt={movie.title || movie.name}
          className="rounded-sm object-cover"
          fill
          sizes="100wh"
        />
        {/* <div className="h-full w-full z-10 relative group">
          <h1 className="hidden group-hover:inline-block absolute bottom-5 left-5 text-2xl font-bold text-filmpire-link transition-all duration-300">
            {movie?.title || movie?.name || movie?.original_name}
          </h1>
        </div> */}
      </div>
    </Link>
  );
};

export default Thumbnail;
