import { type NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const limit = searchParams.get("limit");
  const offset = searchParams.get("offset");
  const query = searchParams.get("query");

  const giphyApiKey = process.env["GIPHY_API_KEY"];
  if (!giphyApiKey) {
    return new Response(
      JSON.stringify({
        error: "Missing GIPHY_API_KEY environment variable",
      }),
      {
        status: 500,
      }
    );
  }
  const giphyApiBaseUrlUnprocessed = process.env["GIPHY_API_BASE_URL"];
  if (!giphyApiBaseUrlUnprocessed) {
    return new Response(
      JSON.stringify({
        error: "Missing GIPHY_API_BASE_URL environment variable",
      }),
      {
        status: 500,
      }
    );
  }
  const giphyApiBaseUrl = giphyApiBaseUrlUnprocessed.endsWith("/")
    ? giphyApiBaseUrlUnprocessed.slice(0, -1)
    : giphyApiBaseUrlUnprocessed;

  if (!limit || !offset || !query) {
    return new Response(
      JSON.stringify({
        error: "Missing query, limit, or offset parameters",
      }),
      {
        status: 400,
      }
    );
  }

  try {
    const response = await fetch(
      `${giphyApiBaseUrl}/v1/gifs/search?api_key=${giphyApiKey}&q=${query}&limit=${limit}&offset=${offset}`
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch search results");
    }
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(error), {
      status: 500,
    });
  }
}
