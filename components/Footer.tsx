import { ImFacebook, ImYoutube } from "react-icons/im";
import { GrInstagram, GrTwitter } from "react-icons/gr";
import Image from "next/image";
import tmdbLogo from "../public/tmdb_logo.svg";
import WavesBorder from "./WavesBorder";

const Footer = () => {
  return (
    <>
      <div className="max-w-5xl p-4 mx-auto space-y-4 select-none">
        <div className="flex space-x-8">
          <ImFacebook className="footerIcon" />
          <GrInstagram className="footerIcon" />
          <GrTwitter className="footerIcon" />
          <ImYoutube className="footerIcon" />
        </div>
        <div className="grid grid-cols-2 text-sm text-stone-500 md:grid-cols-4 gap-y-3">
          <div className="footerLink">Audio Description</div>
          <div className="footerLink">Help Centre</div>
          <div className="footerLink">Gift Cards</div>
          <div className="footerLink">Media Centre</div>
          <div className="footerLink">Investor Relations</div>
          <div className="footerLink">Jobs</div>
          <div className="footerLink">Terms of Use</div>
          <div className="footerLink">Privacy</div>
          <div className="footerLink">Legal Notices</div>
          <div className="footerLink">Cookie Preferences</div>
          <div className="footerLink">Corporate Information</div>
          <div className="footerLink">Contact Us</div>
        </div>
        <div className="inline-block px-2 py-1 text-sm font-light border border-gray-700 cursor-pointer text-stone-500 hover:text-white">
          Service Code
        </div>
        <div className="text-xs cursor-default text-stone-500">
          © 1997 - 2022 Netflix, Inc.
        </div>
      </div>

      <div className="relative mt-14">
        <WavesBorder />
        <div className="flex flex-col items-center justify-around pb-4 space-y-2 md:flex-row text-shadow-lg">
          <div className="flex space-x-1 text-xs font-light">
            <p>Movie data powered by </p>
            <a
              href="https://www.themoviedb.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src={tmdbLogo} width={100} height={100} alt="TMDB Logo" />
            </a>
          </div>

          <div className="text-xs font-light hover:underline">
            <a
              href="https://github.com/0xGuvnor/netflix-clone"
              target="_blank"
              rel="noopener noreferrer"
            >
              Made with ⚡️ by 0xGuvnor
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
export default Footer;
