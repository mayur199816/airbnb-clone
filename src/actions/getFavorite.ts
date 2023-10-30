import prisma from "@/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

export default async function getFavorites() {
  try {
    const currentUser = await getCurrentUser();

    const favorites = await prisma?.listing.findMany({
      where: {
        id: {
          in: [...(currentUser?.favoriteIds || [])],
        },
      },
    });

    console.log("fav--", favorites);

    const safeFavorites = favorites?.map((fav) => ({
      ...fav,
      createdAt: fav.createdAt.toISOString(),
    }));
    return safeFavorites;
  } catch (error: any) {
    throw new Error(error);
  }
}
