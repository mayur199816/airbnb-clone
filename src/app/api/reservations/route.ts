import { NextResponse, NextRequest } from "next/server";
import prisma from "@/libs/prismadb";
import getCurrentUser from "@/actions/getCurrentUser";

export async function POST(req: NextRequest) {
  const currentUSer = await getCurrentUser();

  if (!currentUSer) {
    return NextResponse.json("Please sign in", { status: 404 });
  }

  const body = await req.json();
  const { listingId, startDate, endDate, totalPrice } = body;

  if (!listingId || !startDate || !endDate || !totalPrice) {
    return NextResponse.error();
  }
  console.log("lsiting111", startDate, endDate);
  const listingAndReservation = await prisma?.listing.update({
    where: {
      id: listingId,
    },
    data: {
      reservations: {
        create: {
          userId: currentUSer.id,
          startDate,
          endDate,
          totalPrice,
        },
      },
    },
  });
  console.log("lsiting", startDate, endDate);
  return NextResponse.json(listingAndReservation);
}
