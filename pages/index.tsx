import { getProducts, Product } from "@stripe/firestore-stripe-payments";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useRecoilValue } from "recoil";
import { modalState } from "../atoms/modalAtom";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Modal from "../components/Modal";
import Plans from "../components/Plans";
import Row from "../components/Row";
import useAuth from "../hooks/useAuth";
import useList from "../hooks/useList";
import useSubscription from "../hooks/useSubscription";
import payments from "../lib/stripe";
import { Movie } from "../typings";
import requests from "../utils/requests";

interface Props {
  netflixOriginals: Movie[];
  trendingNow: Movie[];
  topRated: Movie[];
  actionMovies: Movie[];
  comedyMovies: Movie[];
  horrorMovies: Movie[];
  romanceMovies: Movie[];
  documentaries: Movie[];
  products: Product[];
}

const Home: NextPage<Props> = ({
  netflixOriginals,
  trendingNow,
  topRated,
  actionMovies,
  comedyMovies,
  horrorMovies,
  romanceMovies,
  documentaries,
  products,
}) => {
  const { loading, user } = useAuth();
  const showModal = useRecoilValue(modalState);
  const subscription = useSubscription(user);
  const list = useList(user?.uid);

  if (loading || subscription === null) return null;

  return subscription ? (
    <div className="relative h-screen bg-gradient-to-b lg:h-[140vh]">
      <Head>
        <title>Home - Netflix</title>
        <link rel="icon" href="/netflix_logo_icon.png" />
      </Head>

      <Header />
      <main className="relative pb-24 pl-4 overflow-hidden lg:space-y-24 lg:pl-16">
        <Banner trendingNow={trendingNow} />
        <section className="md:space-y-16">
          <Row title="Trending Now" movies={trendingNow} />
          <Row title="Top Rated" movies={topRated} />
          <Row title="Netflix Originals" movies={netflixOriginals} />
          {/* myList */}
          {list.length > 0 && <Row title="My List" movies={list} />}
          <Row title="Action Thrillers" movies={actionMovies} />
          <Row title="Comedies" movies={comedyMovies} />
          <Row title="Horror" movies={horrorMovies} />
          <Row title="Romance" movies={romanceMovies} />
          <Row title="Documentaries" movies={documentaries} />
        </section>
      </main>
      <Footer />

      {showModal && <Modal />}
    </div>
  ) : (
    <Plans products={products} />
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const products = await getProducts(payments, {
    includePrices: true,
    activeOnly: true,
  });

  const [
    netflixOriginals,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries,
  ] = await Promise.all([
    fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
    fetch(requests.fetchTrending).then((res) => res.json()),
    fetch(requests.fetchTopRated).then((res) => res.json()),
    fetch(requests.fetchActionMovies).then((res) => res.json()),
    fetch(requests.fetchComedyMovies).then((res) => res.json()),
    fetch(requests.fetchHorrorMovies).then((res) => res.json()),
    fetch(requests.fetchRomanceMovies).then((res) => res.json()),
    fetch(requests.fetchDocumentaries).then((res) => res.json()),
  ]);

  return {
    props: {
      netflixOriginals: netflixOriginals.results,
      trendingNow: trendingNow.results,
      topRated: topRated.results,
      actionMovies: actionMovies.results,
      comedyMovies: comedyMovies.results,
      horrorMovies: horrorMovies.results,
      romanceMovies: romanceMovies.results,
      documentaries: documentaries.results,
      products,
    },
  };
};
