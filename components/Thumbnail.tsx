import { DocumentData } from "firebase/firestore";
import Image from "next/image";
import React from "react";
import { useRecoilState } from "recoil";
import { modalState, movieState } from "../atoms/modalAtom";
import { Movie } from "../typings";

interface Props {
  movie: Movie | DocumentData;
}

const Thumbnail = ({ movie }: Props) => {
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [modalMovie, setModalMovie] = useRecoilState(movieState);

  return (
    <div
      onClick={() => {
        setModalMovie(movie);
        setShowModal(true);
      }}
      className="relative snap-center min-w-[180px] h-28 cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105"
    >
      <Image
        src={`https://image.tmdb.org/t/p/w500${
          movie.backdrop_path || movie.poster_path
        }`}
        alt={`${movie.title} Movie Thumbnail`}
        fill
        sizes="40vw"
        priority
        className="object-cover rounded-sm md:rounded"
      />
    </div>
  );
};

export default Thumbnail;
