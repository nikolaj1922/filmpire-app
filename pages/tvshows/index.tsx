import axios, { AxiosError } from "axios";
import Head from "next/head";
import Banner from "../../components/Banner";
import Row from "../../components/Row";
import { requests } from "../../requests";
import { IMovie } from "../../types";
import { useState, useEffect, useContext } from "react";
import { getRandomIndex } from "../../utils/helpers";
import { ModalContext } from "../../context/modal";

interface Props {
  trending: IMovie[];
  topRated: IMovie[];
}

const Home = ({ trending, topRated }: Props) => {
  const [bannerMovie, setBannerMovie] = useState<IMovie | null>(null);
  const { showModal } = useContext(ModalContext);

  useEffect(() => {
    setBannerMovie(trending[getRandomIndex(trending)]);
  }, []);

  return (
    <main
      className={`md:mb-6 h-screen ${showModal && "overflow-hidden !h-screen"}`}
    >
      <Head>
        <title>Filmpire</title>
        <meta name="description" content="Best movie search app" />
      </Head>
      <div className="banner-container">
        <Banner movie={bannerMovie} isTVShow={true} />
      </div>
      <section className="!m-0 space-y-2 md:space-y-16 lg:space-y-18">
        <Row title="Trending Now" movies={trending} isTVShow={true} />
        <Row title="Top Rated" movies={topRated} isTVShow={true} />
      </section>
    </main>
  );
};

export const getServerSideProps = async () => {
  try {
    const trending = axios(requests.fetchTrendingTVShows);
    const topRated = axios(requests.fetchTopRatedTVShows);

    const [trendingRes, topRatedRes] = await axios.all([trending, topRated]);

    if (!trendingRes || !topRatedRes) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        trending: trendingRes.data.results,
        topRated: topRatedRes.data.results,
      },
    };
  } catch (err) {
    const error = err as AxiosError;
    console.log(error.response);
  }
};

export default Home;