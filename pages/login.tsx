import Head from "next/head";
import Image from "next/image";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";

interface Inputs {
  email: string;
  password: string;
}

const Login = () => {
  const { signIn, signUp } = useAuth();

  const [login, setLogin] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    if (login) {
      await signIn(email, password);
    } else {
      await signUp(email, password);
    }
  };

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
        className="-z-10 !hidden opacity-40 object-cover sm:!inline"
      />
      <Image
        src="/netflix_logo_full.svg"
        width={150}
        height={150}
        alt="Netflix Logo"
        priority
        className="absolute object-contain cursor-pointer drop-shadow-2xl top-4 md:left-10 md:top-6 left-4 "
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative px-6 py-10 mt-24 space-y-8 rounded-md md:w-full bg-black/75 md:mt-0 md:max-w-md md:px-14"
      >
        <h1 className="text-4xl font-semibold">Sign In</h1>

        <div className="space-y-4">
          <label className="block">
            <input
              {...register("email", { required: true })}
              type="email"
              placeholder="Email"
              className="input"
            />
            {errors.email && (
              <p className="p-1 text-[13px] font-light text-orange-500">
                Please enter a valid email.
              </p>
            )}
          </label>
          <label className="block">
            <input
              {...register("password", { required: true })}
              type="password"
              placeholder="Password"
              className="input"
            />
            {errors.password && (
              <p className="p-1 text-[13px] font-light text-orange-500">
                Your password must contain between 4 and 60 characters.
              </p>
            )}
          </label>
        </div>

        <button
          onClick={() => setLogin(true)}
          className="w-full rounded bg-[#e50914] py-3 font-semibold"
        >
          Sign In
        </button>

        <div className="text-[gray]">
          New to Netflix?{" "}
          <button
            onClick={() => setLogin(false)}
            type="submit"
            className="text-white hover:underline"
          >
            Sign up now
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
