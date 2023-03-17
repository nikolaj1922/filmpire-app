import Link from "next/link";

interface Props {
  title?: string;
  isTVShow?: boolean;
}

const GenreLink = ({ title, isTVShow }: Props) => {
  return (
    <Link
      href={
        isTVShow
          ? `/tvshows/${title?.toLowerCase()}/1`
          : `/movies/${title?.toLowerCase()}/1`
      }
    >
      <h1 className="text-lg md:text-2xl lg:3xl font-semibold mb-2 text-filmpire-link hover:text-filmpire-linkhover inline-block cursor-pointer transition-all duration-300">
        {title}
      </h1>
    </Link>
  );
};

export default GenreLink;
