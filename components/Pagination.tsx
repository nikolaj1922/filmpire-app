import { useState } from "react";
import { useRouter } from "next/router";

interface Props {
  route: string | string[] | undefined;
  isSearch?: boolean;
  isTVShow?: boolean;
  totalPageCount?: number;
}

const Pagination = ({
  route,
  totalPageCount,
  isSearch = false,
  isTVShow = false,
}: Props) => {
  const pages = new Array(totalPageCount || 6).fill(0);
  const router = useRouter();
  const { page } = router.query;

  const handleChangePage = (page: number) => {
    if (isSearch) {
      router.push(`/search/${route}/${page}`);
      return;
    }
    if (isTVShow) {
      router.push(`/tvshows/${route}/${page}`);
      return;
    }
    router.push(`/movies/${route}/${page}`);
  };

  return (
    <div className="flex items-center py-6 space-x-1">
      {pages.map((p, i) => {
        if (i !== 0)
          return (
            <button
              className={`px-4 py-2 bg-[#141414] cursor-pointer hover:bg-[#fff]/50 transition duration-200 rounded-sm ${
                i === Number(page) && "!bg-red-500"
              }`}
              onClick={() => handleChangePage(i)}
              key={i}
            >
              {i}
            </button>
          );
      })}
    </div>
  );
};

export default Pagination;
