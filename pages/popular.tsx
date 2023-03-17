import { useRouter } from "next/router";
import { IMovie } from "../types";
import {  useContext } from "react";
import Banner from "../components/Banner";
import { requests } from "../requests";
import { GetServerSideProps } from "next";
import axios, { AxiosError } from "axios";
import MoviesGrid from "../components/MoviesGrid";
import Head from "next/head";
import { getRandomIndex } from "../utils/helpers";
import { ModalContext } from "../context/modal";

interface Props {
  movies: IMovie[];
}

const PopularList = ({ movies }: Props) => {
  const { showModal } = useContext(ModalContext);
  const index = getRandomIndex(movies);

  return (
    <main className={`${showModal && "overflow-hidden !h-screen"}`}>
      <Head>
        <title>Filmpire - Treding</title>
      </Head>
      <div className="banner-container">
        <Banner movie={movies[index]} />
      </div>
      <section className="p-4 md:p-6 lg:p-8">
        <MoviesGrid
          movies={movies.slice(0, 19)}
          indexCut={index}
          genre={"Trending"}
          popular={true}
        />
      </section>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const response = await axios(requests.fetchTrendingMovies);

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

export default PopularList;
