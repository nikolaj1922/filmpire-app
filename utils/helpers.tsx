import { IMovie, Genre } from "../types";
import { requests } from "../requests";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "../firebase";
import { User } from "firebase/auth";
import toast from "react-hot-toast";

const toastStyle = {
  background: "white",
  color: "black",
  fontWeight: "bold",
  fontSize: "16px",
  padding: "15px",
  borderRadius: "9999px",
  maxWidth: "1000px",
};

export const getRandomIndex = (movies: IMovie[]): number =>
  Math.floor(Math.random() * (Math.floor(movies.length - 1) - 0 + 1) + 0);

export const getSortListUrl = (value: Genre): string => {
  if (value === "action") return requests.fetchActionMovies;
  if (value === "comedy") return requests.fetchComedyMovies;
  if (value === "documentary") return requests.fetchDocumentaryMovies;
  if (value === "horror") return requests.fetchHorrorMovies;
  if (value === "romance") return requests.fetchRomanceMovies;
  if (value === "top rated") return requests.fetchTopRated;
  if (value === "trending") return requests.fetchTrendingMovies;
  return "";
};

export const genreCapitalize = (genre: string): string => {
  const genreArray = genre?.split(" ");

  if (genreArray.length === 1) {
    const result = genre.charAt(0).toUpperCase() + genre.slice(1);
    return result;
  }

  return genreArray
    .map((i) => i.charAt(0).toUpperCase() + i.slice(1))
    .join(" ");
};

export const getFormattedData = (date: Date): string => {
  const yyyy: string | number = date.getFullYear();
  let mm: string | number = date.getMonth() + 1;
  let dd: string | number = date.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  const formattedDate = dd + "." + mm + "." + yyyy;
  return formattedDate;
};

export const handleList = async (
  user: User,
  movie: IMovie,
  addedToList: boolean
) => {
  const docRef = doc(db, "users", user.uid);
  try {
    if (addedToList) {
      toast(
        `${
          movie?.title || movie?.name || movie?.original_name
        } has been removed from My List`,
        {
          duration: 2500,
          style: toastStyle,
        }
      );
      await updateDoc(docRef, {
        userList: arrayRemove(movie),
      });
    } else {
      toast(
        `${
          movie?.title || movie?.name || movie?.original_name
        } has been added to My List`,
        {
          duration: 2500,
          style: toastStyle,
        }
      );
      await updateDoc(docRef, {
        userList: arrayUnion(movie),
      });
    }
  } catch (err: any) {
    console.log(err);
  }
};

export const genres = [
  "Action",
  "Adventure",
  "Animation",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Family",
  "Fantasy",
  "History",
  "Horror",
  "Music",
  "Mystery",
  "Romance",
  "Science Fiction",
  "TV Movie",
  "Thriller",
  "War",
  "Western",
];
