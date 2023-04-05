import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ICreditCast } from "../types";
import { IMAGE_URL } from "../requests";
import { CircularProgress } from "@mui/material";

interface Props {
  actorList: ICreditCast[];
}

const ActorList = ({ actorList }: Props) => {
  const [isPosterLoaded, setIsPosterLoaded] = useState(false);

  return (
    <div className="w-[95%] gap-2 mb-2 grid grid-cols-3 sm:grid-cols-5 sm:w-[70%] md:grid-cols-6 md:w-[70%] md:mb-6 lg:w-[70%] xl:grid-cols-6">
      {actorList.map((actor) => {
        if (actor.profile_path) {
          return (
            <Link key={actor.id} href={`/actors/${actor.id}`}>
              <div className="h-32 mb-8 sm:mb-8 md:h-28 md:mb-4 lg:h-36 xl:h-40 cursor-pointer  text-filmpire-link hover:text-filmpire-linkhover md:space-y-1 transition-all duration-200">
                <div className="relative lg:w-[85%] h-full md:hover:scale-105 transition-all duration-200 flex justify-center items-center">
                  <Image
                    key={actor.id}
                    src={`${IMAGE_URL}/${actor.profile_path}`}
                    alt={actor.name}
                    className="rounded-sm object-cover object-top"
                    sizes="100wh"
                    fill
                    onLoadingComplete={() => setIsPosterLoaded(true)}
                  />
                  {!isPosterLoaded && (
                    <CircularProgress color="primary" size={30} />
                  )}
                </div>
                <h4 className="w-[90%] file:sm:text-sm md:text-md lg:text-lg font-light py-1 truncate">
                  {actor.name}
                </h4>
              </div>
            </Link>
          );
        }
      })}
    </div>
  );
};

export default ActorList;
