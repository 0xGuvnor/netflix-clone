import Image from "next/image";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../constants/movie";
import { Movie } from "../typings";
import { FaPlay } from "react-icons/fa";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { useRecoilState } from "recoil";
import { modalState, movieState } from "../atoms/modalAtom";

interface Props {
  trendingNow: Movie[];
}

const Banner = ({ trendingNow }: Props) => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [modalMovie, setModalMovie] = useRecoilState(movieState);

  useEffect(() => {
    setMovie(trendingNow[Math.floor(Math.random() * trendingNow.length)]);
  }, [trendingNow]);

  return (
    <div className="flex flex-col py-16 space-y-2 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12 select-none">
      <div className="absolute top-0 left-0 h-[95vh] w-screen -z-10">
        <Image
          src={`${baseUrl}${movie?.poster_path || movie?.backdrop_path}`}
          alt="Movie Banner"
          fill
          sizes="100vw"
          priority
          quality={100}
          className="object-cover"
        />
      </div>

      <h1 className="text-2xl max-w-[75%] font-bold text-shadow-md lg:text-5xl md:text-4xl">
        {movie?.title || movie?.name || movie?.original_name}
      </h1>
      <p className="max-w-xs text-xs text-left text-shadow-md md:max-w-lg md:text-base lg:max-w-2xl lg:text-lg">
        {movie?.overview}
      </p>

      <div className="flex max-w-xs space-x-3 md:max-w-lg">
        <button className="w-1/2 text-black bg-white bannerBtn">
          <FaPlay className="w-4 h-4 text-black md:w-7 md:h-7" />
          Play
        </button>
        <button
          onClick={() => {
            setShowModal(true);
            setModalMovie(movie);
          }}
          className="bannerBtn bg-[gray]/70 w-1/2"
        >
          <IoMdInformationCircleOutline className="w-5 h-5 md:h-8 md:w-8" />
          More Info
        </button>
      </div>
    </div>
  );
};

export default Banner;
