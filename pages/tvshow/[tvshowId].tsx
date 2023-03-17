import { GetServerSideProps } from "next";
import { BASE_URL, API_KEY } from "../../requests";
import { ParsedUrlQuery } from "querystring";
import axios, { AxiosError } from "axios";
import Banner from "../../components/Banner";
import ActorList from "../../components/ActorList";
import Row from "../../components/Row";
import Head from "next/head";
import PageSection from "../../components/PageSection";
import { useContext } from "react";
import { ModalContext } from "../../context/modal";
import { IMovie, ICreditCast } from "../../types";

interface Props {
  movie: IMovie;
  credits: ICreditCast[];
  similar: IMovie[];
}

const Movie = ({ movie, credits, similar }: Props) => {
  const { showModal } = useContext(ModalContext);

  return (
    <main className={`h-screen ${showModal && "overflow-hidden !h-screen"}`}>
      <Head>
        <title>
          Filmpire - {movie?.title || movie?.name || movie?.original_name}
        </title>
      </Head>
      <div className="banner-container">
        <Banner movie={movie} isMoviePage={true} isTVShow={true} />
      </div>
      <div className="max-w-[90%] px-6 mb-3 space-y-4 md:space-y-8 md:px-10 lg:px-12 lg:space-y-10 transition-all">
        <PageSection subheader="Overview">
          <p className="text-lg md:text-xl lg:text-2xl lg:!mt-3">
            {movie.overview}
          </p>
        </PageSection>
        <PageSection subheader="Actors">
          <div>
            <ActorList actorList={credits.slice(0, 6)} />
          </div>
        </PageSection>
        {similar.length > 0 && <PageSection subheader="Similar Movies" />}
      </div>
      {similar.length > 0 && (
        <div className="pl-4">
          <Row movies={similar} isTVShow={true} />
        </div>
      )}
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { tvshowId } = context.params as ParsedUrlQuery;

    const movieData = axios(
      `${BASE_URL}/tv/${tvshowId}?api_key=${API_KEY}&language=en-US`
    );
    const creditsData = axios(
      `${BASE_URL}/tv/${tvshowId}/credits?api_key=${API_KEY}&language=en-US`
    );
    const similarMovies = axios(
      `${BASE_URL}/tv/${tvshowId}/similar?api_key=${API_KEY}&language=en-US`
    );

    const [movie, credits, similar] = await axios.all([
      movieData,
      creditsData,
      similarMovies,
    ]);

    return {
      props: {
        movie: movie.data,
        credits: credits.data.cast,
        similar: similar.data.results,
      },
    };
  } catch (err) {
    const error = err as AxiosError;
    console.log(error);
    return {
      notFound: true,
    };
  }
};

export default Movie;
