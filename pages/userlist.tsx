import Head from "next/head";
import MoviesGrid from "../components/MoviesGrid";
import { collection, DocumentData, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import useAuth from "../hooks/useAuth";
import { IMovie } from "../types";

const UserList = () => {
  const { user } = useAuth();
  const [movieList, setMovieList] = useState<IMovie[] | DocumentData[]>([]);

  useEffect(() => {
    if (!user?.uid) return;

    return onSnapshot(collection(db, "users"), (snapshot) =>
      setMovieList(
        snapshot.docs
          .filter((doc) => doc.id === user?.uid)
          .map((doc) => {
            return [...doc.data().userList];
          })
          .flat()
      )
    );
  }, [db, user?.uid]);

  return (
    <main className="h-full">
      <Head>
        <title>Filmpire - My List</title>
        <meta name="description" content="Best movie search app" />
      </Head>
      <div className="relative top-24 md:top-32">
        <div className="">
          <h1 className="text-filmpire-link text-3xl sm:text-4xl md:text-4xl lg:text-6xl font-light ml-10 sm:ml-16 md:ml-20">
            My List
          </h1>
          <section className="p-4 md:p-6 lg:p-8">
            <MoviesGrid movies={movieList} />
          </section>
        </div>
      </div>
    </main>
  );
};

export default UserList;
