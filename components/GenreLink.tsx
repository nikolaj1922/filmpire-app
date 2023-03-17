import Link from "next/link";

interface Props {
  title?: string;
}

const GenreLink = ({ title }: Props) => {
  return (
    <Link href={`/movies/${title?.toLowerCase()}/1`}>
      <h1 className="text-lg md:text-2xl lg:3xl font-semibold mb-2 text-filmpire-link hover:text-filmpire-linkhover inline-block cursor-pointer transition-all duration-300">
        {title}
      </h1>
    </Link>
  );
};

export default GenreLink;
