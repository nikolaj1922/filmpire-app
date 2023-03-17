import { IMovie } from "../types";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import Thumbnail from "./Thumbnail";
import { useRef, useState } from "react";
import GenreLink from "./GenreLink";

interface Props {
  movies: IMovie[];
  title?: string;
  indexCut?: number;
  isTVShow?: boolean;
}

const Row = ({ movies, title, indexCut, isTVShow = false }: Props) => {
  const rowRef = useRef<HTMLDivElement | null>(null);
  const [isMoved, setIsMoved] = useState(false);

  const handleScroll = (direction: string) => {
    setIsMoved(true);
    if (rowRef.current) {
      const { clientWidth, scrollLeft } = rowRef.current;
      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;

      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <div className="h-40 pl-4 md:pl-6 lg-px-8 transition-all">
      {title && (
        <div className="pl-2 md:pl-6">
          <GenreLink title={title} isTVShow={isTVShow} />
        </div>
      )}
      <div className="group relative">
        <BsChevronLeft
          className={`absolute left-2 top-0 bottom-0 m-auto z-40 h-9 w-9 opacity-0 group-hover:opacity-100 cursor-pointer transition hover:scale-125 ${
            !isMoved && "hidden"
          }`}
          onClick={() => handleScroll("left")}
        />
        <div
          ref={rowRef}
          className="flex items-center space-x-1.5 overflow-x-scroll md:space-x-2.5 md:p-2 scrollbar-hide"
        >
          {movies.map((movie, index) => {
            if (index !== indexCut) {
              return (
                <Thumbnail
                  key={movie.id}
                  movie={movie}
                  isGenrePage={false}
                  isTVShow={isTVShow}
                />
              );
            }
          })}
        </div>
        <BsChevronRight
          className="absolute right-2 top-0 bottom-0 m-auto z-40 h-9 w-9 opacity-0 group-hover:opacity-100 cursor-pointer transition hover:scale-125"
          onClick={() => handleScroll("right")}
        />
      </div>
    </div>
  );
};

export default Row;
