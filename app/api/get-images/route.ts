import { createApi } from "unsplash-js";

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

  if (!unsplash) {
    return Response.json({
      message: "No API key was provided",
      status: 500,
    });
  }

  const response = await unsplash.photos.getRandom({
    count: 15,
  });
  const data = response.response;

  return Response.json({
    response: data,
  });
}
