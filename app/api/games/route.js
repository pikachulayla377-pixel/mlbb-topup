import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      "https://1gamestopup.com/api/v1/game",
      {
        method: "GET",
        headers: {
          "x-api-key": process.env.API_SECRET_KEY,
        },
        cache: "no-store",
      }
    );

    const data = await response.json();

    /* ================= FILTER OUT TEST GAME ================= */

    // Filter from `games`
    const filteredGames = data?.data?.games?.filter(
      (game) => game.gameSlug !== "test-1637"
    );

    // Filter from `category -> gameId`
    const filteredCategories = data?.data?.category?.map((cat) => ({
      ...cat,
      gameId: cat.gameId.filter(
        (game) => game.gameSlug !== "test-1637"
      ),
    }));

    return NextResponse.json({
      ...data,
      data: {
        ...data.data,
        games: filteredGames,
        category: filteredCategories,
        totalGames: filteredGames?.length ?? 0,
      },
    });

  } catch (error) {
    console.error("GAME API ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch game list",
      },
      { status: 500 }
    );
  }
}
