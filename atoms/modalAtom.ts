import { atom } from "recoil";
import { Movie } from "../typings";

const modalState = atom({ key: "modalState", default: false });

const movieState = atom<Movie | null>({ key: "movieState", default: null });

export { modalState, movieState };
