import { createApi } from "unsplash-js";

export const dynamic = "force-dynamic";

// get env variable
const { UNSPLASH_ACCESS_KEY } = process.env;

if (!UNSPLASH_ACCESS_KEY) {
  throw new Error("No Unsplash API key was provided");
}

let unsplash = createApi({
  accessKey: UNSPLASH_ACCESS_KEY,
  // secret: UNSPLASH_SECRET_KEY,
});

export async function GET(request: Request) {
  const searchParams = new URL(request.url).searchParams;
  const page = searchParams.get("page");
  const query = searchParams.get("q");

  if (!unsplash) {
    return Response.json({
      message: "No API key was provided",
      status: 500,
    });
  }

  const response = await unsplash.search.getPhotos({
    query: query ? query : "city",
    page: page ? parseInt(page) : 1,
    perPage: 15,
  });
  const data = response.response?.results;

  return Response.json({
    response: data,
  });
}
