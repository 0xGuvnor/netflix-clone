import { getProducts, Product } from "@stripe/firestore-stripe-payments";
import { GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Membership from "../components/Membership";
import useAuth from "../hooks/useAuth";
import useSubscription from "../hooks/useSubscription";
import payments from "../lib/stripe";

interface Props {
  products: Product[];
}

const Account = ({ products }: Props) => {
  const { user, logout } = useAuth();
  const subscription = useSubscription(user);

  console.log(products);

  return (
    <div>
      <Head>
        <title>Account Settings - Netflix</title>
        <link rel="icon" href="/netflix_logo_icon.png" />
      </Head>

      <header className="bg-[#14141]">
        <Link href="/">
          <Image
            src="https://rb.gy/ulxxee"
            alt="Netflix Logo"
            width={120}
            height={120}
            className="object-contain cursor-pointer"
          />
        </Link>
        <Link href="/account">
          <Image
            src="https://rb.gy/g1pwyx"
            alt="Profile Picture"
            width={28}
            height={28}
            className="rounded cursor-pointer"
          />
        </Link>
      </header>

      <main className="max-w-6xl px-5 pt-24 pb-12 mx-auto transition-all md:px-10">
        <div className="flex flex-col gap-x-4 md:flex-row md:items-center">
          <h1 className="text-3xl md:text-4xl">Account</h1>
          <div className="-ml-0.5 flex items-center gap-x-1.5">
            <Image
              src="https://rb.gy/4vfk4r"
              alt="Play Icon"
              width={24}
              height={24}
            />
            <p className="text-xs font-semibold text-[#555]">
              Member since{" "}
              {new Date(subscription?.created as string).toDateString()}
            </p>
          </div>
        </div>

        <Membership />

        <div className="grid grid-cols-1 p-4 mt-6 border gap-x-4 md:grid-cols-4 md:border-x-0 md:border-b-0 md:px-0 md:pb-0">
          <h4 className="text-lg text-[gray]">Plan Details</h4>
          <div className="col-span-2 font-medium">
            {
              products.filter(
                (product) => product.id === subscription?.product
              )[0]?.name
            }
          </div>
          <p className="text-blue-500 cursor-pointer hover:underline md:text-right">
            Change plan
          </p>
        </div>

        <div className="grid grid-cols-1 p-4 mt-6 border gap-x-4 md:grid-cols-4 md:border-x-0 md:border-b-0 md:px-0 md:pb-0">
          <h4 className="text-lg text-[gray]">Settings</h4>
          <p
            onClick={logout}
            className="col-span-3 text-blue-500 cursor-pointer hover:underline"
          >
            Sign out of all devices
          </p>
        </div>
      </main>
    </div>
  );
};
export default Account;

export const getStaticProps: GetStaticProps = async () => {
  let products;

  try {
    products = await getProducts(payments, {
      includePrices: true,
      activeOnly: true,
    });
  } catch (error) {
    console.error(error);
  }

  return { props: { products } };
};
