import { useRouter } from "next/router";
import { IMovie, Genre } from "../../../types";
import { useContext } from "react";
import Banner from "../../../components/Banner";
import { requests } from "../../../requests";
import { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";
import axios, { AxiosError } from "axios";
import MoviesGrid from "../../../components/MoviesGrid";
import CustomPagination from "../../../components/Pagination";
import Head from "next/head";
import { getRandomIndex, genreCapitalize } from "../../../utils/helpers";
import { ModalContext } from "../../../context/modal";

interface Props {
  movies: IMovie[];
}

const GerneList = ({ movies }: Props) => {
  const router = useRouter();
  const { genre } = router.query;
  const { showModal  } = useContext(ModalContext);
  const genreTitle = genreCapitalize(genre as string);
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
        <MoviesGrid movies={movies} indexCut={index} genre={genreTitle} />
      </section>
      <section className="flex justify-center">
        <CustomPagination route={genre} />
      </section>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const getSortListUrl = (value: Genre): string => {
    if (value === "top rated") return requests.fetchTopRatedTVShows;
    if (value === "trending") return requests.fetchTrendingTVShows;
    return "";
  };

  try {
    const { genre, page } = context.params as ParsedUrlQuery;
    const url = getSortListUrl(genre as Genre);

    const response = await axios(
      `${url as string}&page=${page || 1}`
    );

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
