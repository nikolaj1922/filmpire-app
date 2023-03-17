import { GetServerSideProps } from "next";
import { ParsedUrlQuery } from "querystring";
import React, { useContext } from "react";
import { BASE_URL, API_KEY } from "../../../requests";
import axios, { AxiosError } from "axios";
import { IMovie } from "../../../types";
import Banner from "../../../components/Banner";
import MoviesGrid from "../../../components/MoviesGrid";
import CustomPagination from "../../../components/Pagination";
import { useRouter } from "next/router";
import { ModalContext } from "../../../context/modal";

interface Props {
  searchData: IMovie[];
  pageCount: number;
}

const Search = ({ searchData, pageCount }: Props) => {
  const router = useRouter();
  const { query } = router.query;
  const { showModal } = useContext(ModalContext);

  return (
    <main className={`${showModal && "overflow-hidden !h-screen"}`}>
      <div>
        {searchData.length ? (
          <>
            <div className="banner-container">
              <Banner movie={searchData[0]} />
            </div>
            <section className="p-4 md:p-6 lg:p-8">
              <MoviesGrid movies={searchData.slice(0, 19)} indexCut={0} />
            </section>

            {pageCount > 1 && (
              <section className="flex justify-center">
                <CustomPagination
                  route={query}
                  isSearch={true}
                  pageCount={pageCount}
                />
              </section>
            )}
          </>
        ) : (
          <div className="text-center text-xl h-[88vh] md:h-[85vh] flex justify-center items-center">
            <p>
              Nothing found :(
              <br />
              Please, try again!
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { query, page } = context.params as ParsedUrlQuery;

    const searchDataRes = await axios(
      `${BASE_URL}/search/movie?query=${query}&page=${
        page || 1
      }&api_key=${API_KEY}`
    );

    return {
      props: {
        searchData: searchDataRes.data.results,
        pageCount: searchDataRes.data.total_pages,
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

export default Search;
