import Image from "next/image";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../constants/movie";
import { Movie } from "../typings";
import { FaPlay } from "react-icons/fa";
import { IoMdInformationCircleOutline } from "react-icons/io";

interface Props {
  trendingNow: Movie[];
}

const Banner = ({ trendingNow }: Props) => {
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    setMovie(trendingNow[Math.floor(Math.random() * trendingNow.length)]);
  }, [trendingNow]);

  return (
    <div className="flex flex-col py-16 space-y-2 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12">
      <div className="absolute top-0 left-0 h-[95vh] w-screen -z-10">
        {movie && (
          <Image
            src={`${baseUrl}${
              movie?.backdrop_path || movie?.poster_path
            }`.toLowerCase()}
            alt="Movie Banner"
            fill
            className="object-cover"
            loading="eager"
          />
        )}
      </div>

      <h1 className="text-2xl max-w-[75%] font-bold text-shadow-md lg:text-7xl md:text-4xl">
        {movie?.title || movie?.name || movie?.original_name}
      </h1>
      <p className="max-w-xs text-xs text-justify text-shadow-md md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl">
        {movie?.overview}
      </p>

      <div className="flex max-w-xs space-x-3 md:max-w-lg">
        <button className="w-1/2 text-black bg-white bannerBtn">
          <FaPlay className="w-4 h-4 text-black md:w-7 md:h-7" />
          Play
        </button>
        <button className="bannerBtn bg-[gray]/70 w-1/2">
          <IoMdInformationCircleOutline className="w-5 h-5 md:h-8 md:w-8" />
          More Info
        </button>
      </div>
    </div>
  );
};

export default Banner;
