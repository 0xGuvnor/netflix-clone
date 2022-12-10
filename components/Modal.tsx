import MuiModal from "@mui/material/Modal";
import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { FaPlay } from "react-icons/fa";
import {
  HiOutlineCheck,
  HiOutlinePlus,
  HiOutlineThumbUp,
  HiOutlineVolumeOff,
  HiOutlineVolumeUp,
  HiX,
} from "react-icons/hi";
import ReactPlayer from "react-player/lazy";
import { useRecoilState, useRecoilValue } from "recoil";
import { modalState, movieState } from "../atoms/modalAtom";
import { db } from "../firebase";
import useAuth from "../hooks/useAuth";
import { Genre, Movie, VideoType } from "../typings";

const Modal = () => {
  const [showModal, setShowModal] = useRecoilState(modalState);
  const modalMovie = useRecoilValue(movieState);
  const [movies, setMovies] = useState<DocumentData[] | Movie[]>([]);
  const [trailer, setTrailer] = useState("");
  const [genres, setGenres] = useState<Genre[]>([]);
  const [runtime, setRuntime] = useState<number>(0);
  const [muted, setMuted] = useState(false);
  const [addedToList, setAddedToList] = useState(false);
  const { user } = useAuth();

  const handleClose = () => {
    setShowModal(false);
  };

  const handleList = async () => {
    if (addedToList) {
      await deleteDoc(
        doc(db, "customers", user!.uid, "myList", modalMovie!.id.toString())
      );

      toast(
        `${
          modalMovie?.title || modalMovie?.original_name
        } has been removed from My List`,
        { duration: 8000 }
      );
    } else {
      await setDoc(
        doc(db, "customers", user!.uid, "myList", modalMovie!.id.toString()),
        { ...modalMovie }
      );

      toast(
        `${
          modalMovie?.title || modalMovie?.original_name
        } has been added to My List`,
        { duration: 8000 }
      );
    }
  };

  // Find all movies in the user's list
  useEffect(() => {
    if (user) {
      onSnapshot(
        collection(db, "customers", user.uid, "myList"),
        (snapshot) => {
          setMovies(snapshot.docs);
        }
      );
    }
  }, [db, modalMovie?.id]);

  // Check if the movie is already in the user's list
  useEffect(() => {
    setAddedToList(
      movies.findIndex((movie) => movie.data().id === modalMovie!.id) !== -1
    );
  }, [movies]);

  useEffect(() => {
    if (!modalMovie) return;

    const fetchMovie = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/${
            modalMovie.media_type === "tv" ? "tv" : "movie"
          }/${modalMovie.id}?api_key=${
            process.env.NEXT_PUBLIC_API_KEY
          }&language=en-US&append_to_response=videos`
        );

        const data = await res.json();
        console.log(data);

        if (data?.videos) {
          const index = data.videos.results.findIndex(
            (video: VideoType) => video.type === "Trailer"
          );
          setTrailer(data.videos.results[index].key);
        }
        if (data?.genres) {
          setGenres(data.genres);
        }
        if (data?.runtime) {
          setRuntime(data.runtime);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovie();
  }, [modalMovie]);

  return (
    <MuiModal
      open={showModal}
      onClose={handleClose}
      className="fixed left-0 right-0 !top-7 z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll rounded-md scrollbar-hide"
    >
      <div className="outline-none">
        <Toaster position="bottom-center" />
        <button
          onClick={handleClose}
          className="absolute !z-40 modalBtn top-5 h-9 bg-[#181818] hover:bg-gray-800 right-5 w-9 border-none"
        >
          <HiX className="w-6 h-6" />
        </button>
        <div className="relative pt-[56.25%]">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${trailer}`}
            width="100%"
            height="100%"
            playing
            controls
            muted={muted}
            style={{ position: "absolute", top: "0px", left: "0px" }}
          />

          <div className="absolute flex items-center justify-between w-full px-10 bottom-10">
            <div className="flex space-x-2">
              <button className="flex items-center bg-white/90 rounded gap-x-2 px-6 text-lg font-bold text-black transition hover:bg-[#e6e6e6]">
                <FaPlay className="w-4 h-4 text-black" />
                Play
              </button>

              <button onClick={handleList} className="modalBtn">
                {addedToList ? (
                  <HiOutlineCheck className="w-4 h-4 text-gray-300" />
                ) : (
                  <HiOutlinePlus className="w-4 h-4 text-gray-300" />
                )}
              </button>

              <button className="modalBtn">
                <HiOutlineThumbUp className="w-4 h-4 text-gray-300" />
              </button>
            </div>
            <button onClick={() => setMuted(!muted)} className="modalBtn">
              {muted ? (
                <HiOutlineVolumeOff className="w-4 h-4 text-gray-300" />
              ) : (
                <HiOutlineVolumeUp className="w-4 h-4 text-gray-300" />
              )}
            </button>
          </div>
        </div>
        <div className="flex space-x-16 rounded-b-xl bg-[#181818] px-10 py-8">
          <div className="space-y-6 text-lg">
            <div className="flex items-center space-x-2 text-sm">
              <p className="font-semibold text-green-400">
                {Math.round(modalMovie!.vote_average * 10)}% match
              </p>
              <p className="font-light">
                {modalMovie?.release_date || modalMovie?.first_air_date}
              </p>
              <div className="flex h-4 items-center justify-center rounded border border-white/40 px-1.5 text-xs">
                HD
              </div>
            </div>

            <div className="flex flex-col font-light gap-x-10 gap-y-4 md:flex-row">
              <div className="space-y-1 md:space-y-3">
                <p className="text-2xl font-bold">{modalMovie?.title}</p>
                <p className="w-5/6">{modalMovie?.overview}</p>
              </div>
              <div className="flex flex-col space-y-3 text-sm">
                <div>
                  <span className="text-[gray]">Runtime: </span>
                  {runtime} minutes
                </div>

                <div>
                  <span className="text-[gray]">Genres: </span>
                  {genres.map((genre) => genre.name).join(", ")}
                </div>

                <div>
                  <span className="text-[gray]">Original language: </span>
                  {modalMovie?.original_language}
                </div>

                <div>
                  <span className="text-[gray]">Total votes: </span>
                  {modalMovie?.vote_count}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MuiModal>
  );
};

export default Modal;
