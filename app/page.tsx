import Gallery from "@/components/gallery";
import HomeSearchBar from "@/components/homesearchbar";

import { Montserrat } from "next/font/google";
const montserrat = Montserrat({ subsets: ["latin"], weight: "400" });
const montserratBold = Montserrat({ subsets: ["latin"], weight: "700" });

const getData = async () => {
  const images = await fetch("http://localhost:3000/api/search-images?page=1", {
    method: "GET",
    cache: "no-cache",
  });

  if (!images.ok) {
    return [];
  }

  const data = await images.json();
  return data.response;
};

export default async function Home() {
  const images = await getData();

  return (
    <main>
      <div className="bg-[url('/images/daniel-leone-v-7-da-t-kl-zzaw-unsplash-1.png')] w-full h-96 md:bg-cover grid items-center bg-no-repeat bg-bottom">
        <div
          className={`grid grid-cols-1 justify-items-center ${montserrat.className}`}
        >
          <h1
            className={`lg:text-3xl ${montserratBold.className} text-white text-2xl text-center mx-3`}
          >
            Download High Quality Images by creators
          </h1>
          <p
            className={`text-[#C4C4C4] lg:my-2 mt-2 mb-8 text-xs mx-[18%] lg:text-sm text-center ${montserrat.className}`}
          >
            Over 2.4 million+ stock Images by our talented community
          </p>
          <HomeSearchBar />
        </div>
      </div>
      <Gallery data={images} />
    </main>
  );
}
