import { type NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const limit = searchParams.get("limit");
  const offset = searchParams.get("offset");

  const giphyApiKey = process.env["GIPHY_API_KEY"];
  if (!giphyApiKey) {
    return {
      status: 500,
      json: {
        error: "Missing GIPHY_API_KEY environment variable",
      },
    };
  }
  const giphyApiBaseUrlUnprocessed = process.env["GIPHY_API_BASE_URL"];
  if (!giphyApiBaseUrlUnprocessed) {
    return {
      status: 500,
      json: {
        error: "Missing GIPHY_API_BASE_URL environment variable",
      },
    };
  }
  const giphyApiBaseUrl = giphyApiBaseUrlUnprocessed.endsWith("/")
    ? giphyApiBaseUrlUnprocessed.slice(0, -1)
    : giphyApiBaseUrlUnprocessed;

  if (!limit || !offset) {
    return {
      status: 400,
      json: {
        error: "Missing limit or offset query parameter",
      },
    };
  }

  try {
    const response = await fetch(
      `${giphyApiBaseUrl}/v1/gifs/trending?api_key=${giphyApiKey}&limit=${limit}&offset=${offset}`
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch trending gifs");
    }
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return {
      status: 500,
      json: { error: JSON.stringify(error, null, 2) },
    };
  }
}
