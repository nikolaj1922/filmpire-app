import axios, { AxiosError } from "axios";
import Head from "next/head";
import Banner from "../components/Banner";
import Row from "../components/Row";
import { requests } from "../requests";
import { IMovie } from "../types";
import { useContext } from "react";
import { getRandomIndex } from "../utils/helpers";
import { ModalContext } from "../context/modal";

interface Props {
  trending: IMovie[];
  topRated: IMovie[];
  action: IMovie[];
  animation: IMovie[];
  comedy: IMovie[];
  crime: IMovie[];
  documentary: IMovie[];
  drama: IMovie[];
  family: IMovie[];
  horror: IMovie[];
  romance: IMovie[];
}

const Home = ({
  trending,
  topRated,
  action,
  animation,
  comedy,
  crime,
  documentary,
  drama,
  horror,
  romance,
}: Props) => {
  const { showModal } = useContext(ModalContext);
  return (
    <main
      className={`md:mb-6 relative h-screen ${
        showModal && "overflow-hidden !h-screen"
      }`}
    >
      <Head>
        <title>Filmpire</title>
        <meta name="description" content="Best movie search app" />
      </Head>
      <div className="banner-container">
        <Banner movie={trending[getRandomIndex(trending)]} />
      </div>
      <section className="!m-0 space-y-2 md:space-y-16 lg:space-y-18">
        <Row movies={topRated} title="Top Rated" />
        <Row movies={action} title="Action" />
        <Row movies={animation} title="Animation" />
        <Row movies={comedy} title="Comedy" />
        <Row movies={crime} title="Crime" />
        <Row movies={documentary} title="Documentary" />
        <Row movies={drama} title="Drama" />
        <Row movies={horror} title="Horror" />
        <Row movies={romance} title="Romance" />
      </section>
    </main>
  );
};

export const getServerSideProps = async () => {
  try {
    const trending = axios(requests.fetchTrendingMovies);
    const topRated = axios(requests.fetchTopRated);
    const action = axios(requests.fetchActionMovies);
    const animation = axios(requests.fetchAnimationMovies);
    const comedy = axios(requests.fetchComedyMovies);
    const crime = axios(requests.fetchCrimeMovies);
    const documentary = axios(requests.fetchDocumentaryMovies);
    const drama = axios(requests.fetchDramaMovies);
    const horror = axios(requests.fetchHorrorMovies);
    const romance = axios(requests.fetchRomanceMovies);

    const [
      trendingRes,
      topRatedRes,
      actionRes,
      animationRes,
      comedyRes,
      crimeRes,
      documentaryRes,
      dramaRes,
      horrorRes,
      romanceRes,
    ] = await axios.all([
      trending,
      topRated,
      action,
      animation,
      comedy,
      crime,
      documentary,
      drama,
      horror,
      romance,
    ]);

    return {
      props: {
        trending: trendingRes.data.results,
        topRated: topRatedRes.data.results,
        action: actionRes.data.results,
        animation: animationRes.data.results,
        comedy: comedyRes.data.results,
        crime: crimeRes.data.results,
        documentary: documentaryRes.data.results,
        drama: dramaRes.data.results,
        horror: horrorRes.data.results,
        romance: romanceRes.data.results,
      },
    };
  } catch (err) {
    const error = err as AxiosError;
    console.log(error.response);
  }
};

export default Home;
