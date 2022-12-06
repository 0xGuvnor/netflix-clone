import Head from "next/head";
import Image from "next/image";
import React, { useState } from "react";

const Login = () => {
  const [login, setLogin] = useState(false);

  return (
    <div className="relative flex flex-col w-screen h-screen bg-black md:items-center md:justify-center md:bg-transparent">
      <Head>
        <title>Netflix</title>
        <link rel="icon" href="/netflix_logo_icon.png" />
      </Head>

      <Image
        src="https://rb.gy/p2hphi"
        alt="Netflix Login Page Background"
        fill
        quality={100}
        className="-z-10 !hidden opacity-60 object-cover sm:!inline"
      />
      <Image
        src="https://rb.gy/ulxxee"
        width={150}
        height={150}
        alt="Netflix Logo"
        className="absolute object-contain cursor-pointer top-4 md:left-10 md:top-6 left-4"
      />

      <form className="relative px-6 py-10 mt-24 space-y-8 rounded bg-black/75 md:mt-0 md:max-w-md md:px-14">
        <h1 className="text-4xl font-semibold">Sign In</h1>

        <div className="space-y-4">
          <label className="block">
            <input type="email" placeholder="Email" className="input" />
          </label>
          <label className="block">
            <input type="password" placeholder="Password" className="input" />
          </label>
        </div>

        <button className="w-full rounded bg-[#e50914] py-3 font-semibold">
          Sign In
        </button>

        <div className="text-[gray]">
          New to Netflix?{" "}
          <button type="submit" className="text-white hover:underline">
            Sign up now
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
