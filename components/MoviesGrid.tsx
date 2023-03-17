import { IMovie } from "../types";
import Thumbnail from "./Thumbnail";
import GenreLink from "./GenreLink";
import { DocumentData } from "firebase/firestore";

interface Props {
  movies: IMovie[] | DocumentData[];
  genre?: string;
  indexCut?: number;
  isTVShow?: boolean;
  popular?: boolean;
}

const MoviesGrid = ({
  movies,
  indexCut,
  genre = "",
  isTVShow,
  popular = false,
}: Props) => {
  return (
    <div className="space-y-2">
      {genre && !popular && (
        <div className="pl-2 md:pl-4">
          <GenreLink title={genre} />
        </div>
      )}
      <div className="grid gap-4 transition-all duration-200 px-2 sm:grid-cols-2 md:gap-6 md:px-4 lg:grid-cols-3  ">
        {movies.map((movie, index) => {
          if (index !== indexCut) {
            return isTVShow || movie?.media_type === "tv" || !!movie?.number_of_episodes ? (
              <Thumbnail
                key={movie.id}
                movie={movie}
                isGenrePage={true}
                isTVShow={true}
              />
            ) : (
              <Thumbnail key={movie.id} movie={movie} isGenrePage={true} />
            );
          }
        })}
      </div>
    </div>
  );
};

export default MoviesGrid;
