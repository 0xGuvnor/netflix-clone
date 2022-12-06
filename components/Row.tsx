import React, { useEffect, useRef, useState } from "react";
import { Movie } from "../typings";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import Thumbnail from "./Thumbnail";

interface Props {
  title: string;
  movies: Movie[];
}

const Row = ({ title, movies }: Props) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const [isMoved, setIsMoved] = useState(false);

  const handleClick = (direction: string) => {
    setIsMoved(true);

    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;

      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;

      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  const handleScroll = () => {
    if (!rowRef.current) return;

    if (rowRef.current.scrollLeft > 0) {
      setIsMoved(true);
    }
  };

  return (
    <div className="h-40 space-y-0.5 md:space-y-2">
      <h2 className="w-56 text-sm font-semibold cursor-pointer text-[#e5e5e5] transition duration-200 hover:text-white md:text-2xl">
        {title}
      </h2>
      <div className="relative overflow-hidden group md:-ml-2">
        <BsChevronLeft
          onClick={() => handleClick("left")}
          className={`absolute top-0 bottom-0 z-40 m-auto transition opacity-0 cursor-pointer left-0 h-[89.6px] w-9 hover:scale-125 group-hover:opacity-100 hover:bg-gradient-to-l hover:from-black/50 md:h-[115.2px] md:left-2 ${
            !isMoved && "hidden"
          }`}
        />

        <div
          ref={rowRef}
          onScroll={handleScroll}
          className="flex items-center space-x-0.5 overflow-x-scroll scrollbar-hide md:space-x-2.5 md:p-2 snap-x"
        >
          {movies.map((movie) => (
            <Thumbnail key={movie.id} movie={movie} />
          ))}
        </div>

        <BsChevronRight
          onClick={() => handleClick("right")}
          className="absolute top-0 bottom-0 z-40 m-auto transition opacity-0 cursor-pointer md:right-2 md:h-[115.2px] right-0 h-[89.6px] w-9 hover:scale-125 group-hover:opacity-100 hover:bg-gradient-to-r hover:from-black/50"
        />
      </div>
    </div>
  );
};

export default Row;
