import { useRouter } from "next/router";
import { IMovie, Genre } from "../../../types";
import { useState, useEffect, useContext } from "react";
import Banner from "../../../components/Banner";
import { requests } from "../../../requests";
import { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";
import axios, { AxiosError } from "axios";
import MoviesGrid from "../../../components/MoviesGrid";
import Pagination from "../../../components/Pagination";
import Head from "next/head";
import { getRandomIndex, genreCapitalize } from "../../../utils/helpers";
import { ModalContext } from "../../../context/modal";

interface Props {
  movies: IMovie[];
}

const GerneList = ({ movies }: Props) => {
  const router = useRouter();
  const { genre } = router.query;
  const genreTitle = genreCapitalize(genre as string);
  const { showModal } = useContext(ModalContext);
  const index = getRandomIndex(movies);

  return (
    <main className={`${showModal && "overflow-hidden !h-screen"}`}>
      <Head>
        <title>Filmpire - {genreTitle}</title>
      </Head>
      <div className="banner-container">
        <Banner movie={movies[index]} />
      </div>
      <section className="p-4 md:p-6 lg:p-8">
        <MoviesGrid
          movies={movies.slice(0, 16)}
          indexCut={index}
          genre={genreTitle}
          isTVShow={false}
        />
      </section>
      <section className="flex justify-center">
        <Pagination route={genre} totalPageCount={6} />
      </section>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const getSortListUrl = (value: Genre): string => {
    if (value === "action") return requests.fetchActionMovies;
    if (value === "adventure") return requests.fetchAdventureMovies;
    if (value === "animation") return requests.fetchAnimationMovies;
    if (value === "comedy") return requests.fetchComedyMovies;
    if (value === "crime") return requests.fetchCrimeMovies;
    if (value === "documentary") return requests.fetchDocumentaryMovies;
    if (value === "drama") return requests.fetchDramaMovies;
    if (value === "family") return requests.fetchFamilyMovies;
    if (value === "fantasy") return requests.fetchFantasyMovies;
    if (value === "history") return requests.fetchHistoryMovies;
    if (value === "horror") return requests.fetchHorrorMovies;
    if (value === "music") return requests.fetchMusicMovies;
    if (value === "mystery") return requests.fetchMysteryMovies;
    if (value === "romance") return requests.fetchRomanceMovies;
    if (value === "science fiction") return requests.fetchScienceMovies;
    if (value === "tv movie") return requests.fetchTVMovieMovies;
    if (value === "thriller") return requests.fetchThrillerMovies;
    if (value === "war") return requests.fetchWarMovies;
    if (value === "western") return requests.fetchWesternMovies;
    if (value === "top rated") return requests.fetchTopRated;
    if (value === "trending") return requests.fetchTrendingMovies;
    return "";
  };

  try {
    const { genre, page } = context.params as ParsedUrlQuery;
    const url = getSortListUrl(genre as Genre);

    const response = await axios(`${url as string}&page=${page || 1}`);

    return {
      props: {
        movies: response.data.results,
      },
    };
  } catch (err) {
    const error = err as AxiosError;
    console.log(error.response);
    return {
      notFound: true,
    };
  }
};

export default GerneList;
