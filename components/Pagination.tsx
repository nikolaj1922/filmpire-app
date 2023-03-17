import * as React from "react";
import { Stack, Pagination } from "@mui/material";
import { styled } from "@mui/system";
import { useRouter } from "next/router";

interface Props {
  route: string | string[] | undefined;
  isSearch?: boolean;
  isTVShow?: boolean;
  pageCount?: number;
}

const CustomPag = styled(Pagination)({
  ul: {
    "& .MuiPaginationItem-root": {
      color: "#fff",
    },
  },
});

const CustomPagination = ({
  route,
  isSearch = false,
  isTVShow = false,
  pageCount = 5,
}: Props) => {
  const router = useRouter();
  const { page } = router.query;

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    if (isSearch) {
      router.push(`/search/${route}/${page}`);
    } else {
      if (isTVShow) {
        router.push(`/tvshow/${route}/${page}`);
      } else {
        router.push(`/movies/${route}/${page}`);
      }
    }
  };

  return (
    <div className="mb-4 sm:mb-8">
      <Stack spacing={2}>
        <CustomPag
          count={pageCount > 10 ? 10 : pageCount}
          page={Number(page)}
          size="large"
          variant="text"
          color="error"
          shape="rounded"
          onChange={handleChangePage}
        />
      </Stack>
    </div>
  );
};

export default CustomPagination;
