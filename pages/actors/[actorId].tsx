import React, { useContext } from "react";
import { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";
import axios, { AxiosError } from "axios";
import { API_KEY } from "../../requests";
import { IMovie, IPerson } from "../../types";
import Head from "next/head";
import PageSection from "../../components/PageSection";
import Image from "next/image";
import { IMAGE_URL, BASE_URL } from "../../requests";
import MoviesGrid from "../../components/MoviesGrid";
import { getFormattedData } from "../../utils/helpers";

interface Props {
  actorData: IPerson;
  moviesWithActor: IMovie[];
}

const Actor = ({ actorData, moviesWithActor }: Props) => {
  return (
    <div className="space-y-16 bg-mobile-moviepage-gradient-to-b sm:bg-moviepage-gradient-to-b">
      <Head>
        <title>Filmpire - {actorData.name}</title>
      </Head>
      <div className="relative flex space-y-4 space-x-4 flex-col p-4 top-20  sm:p-8 sm:top-16 md:flex-row md:p-16 md:space-x-6 md:top-12 lg:top-16 lg:px-24 lg:space-x-8 lg:pr-32">
        <div className="relative h-[280px] w-[100%] sm:h-[350px] md:basis-1/3 md:h-[480px] justify-self-end">
          <Image
            src={`${IMAGE_URL}/${actorData.profile_path}`}
            alt={`${actorData.name}`}
            fill
            sizes="100wh"
            className="rounded-sm object-contain md:object-right-top"
          />
        </div>
        <div className="flex flex-col space-y-8 sm:basis-2/3">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold !p-0">
            {actorData.name}
          </h1>
          <PageSection subheader="Born">
            {getFormattedData(new Date(actorData.birthday))}
          </PageSection>
          {actorData.deathday && (
            <PageSection subheader="Death">{actorData.deathday}</PageSection>
          )}
          <PageSection subheader="Birth place">
            {actorData.place_of_birth}
          </PageSection>
          <PageSection subheader="Biography">{actorData.biography}</PageSection>
        </div>
      </div>
      <div className="space-y-8 py-8 px-4  md:p-24">
        <h3 className="text-center font-light text-5xl">Movies</h3>
        {moviesWithActor.length > 0 ? (
          <MoviesGrid movies={moviesWithActor.slice(0, 10)} />
        ) : (
          <p>Not found</p>
        )}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { actorId } = context.params as ParsedUrlQuery;

    const actorData = axios(
      `${BASE_URL}/person/${actorId}?api_key=${API_KEY}&language=en-US`
    );
    const moviesWithActor = axios(
      `${BASE_URL}/discover/movie?with_cast=${actorId}&page=1&api_key=${API_KEY}`
    );

    const [actorDataRes, moviesWithActorRes] = await axios.all([
      actorData,
      moviesWithActor,
    ]);

    return {
      props: {
        actorData: actorDataRes.data,
        moviesWithActor: moviesWithActorRes.data.results,
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

export default Actor;
