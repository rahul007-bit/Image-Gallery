import { Montserrat } from "next/font/google";
import Carousel from "@/components/carousel";
import Gallery, { Image } from "@/components/gallery";

const montserratBold = Montserrat({ subsets: ["latin"], weight: "700" });

export const dynamic = "force-dynamic";

const getImages = async (
  query: string | string[] | undefined
): Promise<[Image] | []> => {
  const images = await fetch(
    `http://localhost:3000/api/search-images?${query ? `q=${query}` : ""}`,
    {
      method: "GET",
      cache: "no-cache",
    }
  );
  if (!images.ok) {
    return [];
  }
  const data: { response: [Image] } = await images.json();
  return data.response;
};
export default async function Search({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const data = await getImages(searchParams?.q);
  const breadcrumbs = data
    ?.map((image) => {
      return image.breadcrumbs.map((breadcrumb) => breadcrumb.slug);
    })
    .flat();
  return (
    <>
      <div className="my-4 dark:bg-[#232323]">
        <Gallery data={data}>
          <h1
            className={`text-2xl md:text-4xl ${montserratBold.className} text-[#333] dark:text-white mb-5 md:mx-auto`}
          >
            {searchParams?.q ? searchParams?.q : "Search for anything"}
          </h1>
          {/* Carousel of tags */}
          <Carousel
            breadcrumbs={
              breadcrumbs?.length !== 0
                ? [...new Set(breadcrumbs)]
                : ["No tags found"]
            }
          />
        </Gallery>
      </div>
    </>
  );
}
