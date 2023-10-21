import { NextRequest, NextResponse } from "next/server";

const axios = require("axios");

async function fetchData(query: string) {
  try {
    const response = await axios.get(`https://www.google.com/complete/search`, {
      params: {
        client: "hp",
        hl: "en",
        sugexp: "msedr",
        gs_rn: "62",
        gs_ri: "hp",
        cp: "1",
        gs_id: "9c",
        q: query,
      },
    });
    const data = response.data;
    const trimmedData = data.slice("window.google.ac.h(".length, -1);
    const parsedData = JSON.parse(trimmedData);

    // Assuming the data structure is similar to what you provided in the JSONP callback
    const resultArray = parsedData[1].map((val: any[]) => ({ query: val[0] }));

    return resultArray;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("q");
  if (!query) {
    return NextResponse.json({
      result: [],
    });
  }
  try {
    const resultArray = await fetchData(query);
    return NextResponse.json({
      result: resultArray,
    });
  } catch (err: any) {
    console.error(err.message);
    return NextResponse.json({
      result: [],
    });
  }
}
