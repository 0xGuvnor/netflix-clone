import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { HiOutlineCheck } from "react-icons/hi";
import useAuth from "../hooks/useAuth";

const Plans = () => {
  const { logout } = useAuth();

  return (
    <>
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="/netflix_logo_icon.png" />
      </Head>

      <header className="border-b border-white/10 bg-[#141414]">
        <Link href="/">
          <Image
            src="https://rb.gy/ulxxee"
            alt="Netflix Logo"
            width={150}
            height={90}
            className="object-contain cursor-pointer"
          />
        </Link>
        <button
          onClick={logout}
          className="text-lg font-medium hover:underline"
        >
          Sign Out
        </button>
      </header>

      <main className="max-w-5xl px-5 pb-12 transition-all pt-28 md:px-10">
        <h1 className="mb-3 text-3xl font-medium">
          Choose the plan that's right for you
        </h1>
        <ul>
          <li className="flex items-center text-lg gap-x-2">
            <HiOutlineCheck className="h-7 w-7 text-[#e50914]" />
            Watch all you want. Ad-free.
          </li>
          <li className="flex items-center text-lg gap-x-2">
            <HiOutlineCheck className="h-7 w-7 text-[#e50914]" />
            Recommendations just for you.
          </li>
          <li className="flex items-center text-lg gap-x-2">
            <HiOutlineCheck className="h-7 w-7 text-[#e50914]" />
            Change or cancel your plan anytime.
          </li>
        </ul>

        <div className="flex flex-col mt-4 space-y-4">
          <div className="flex items-center self-end justify-end w-full md:w-3/5">
            <div className="planBox">Standard</div>
            <div className="planBox">Standard</div>
            <div className="planBox">Standard</div>
          </div>

          {/* Table */}
          <button>Subscribe</button>
        </div>
      </main>
    </>
  );
};
export default Plans;
