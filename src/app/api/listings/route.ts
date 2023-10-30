import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
import getCurrentUser from "@/actions/getCurrentUser";

export async function POST(req: NextRequest) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await req.json();
  const {
    title,
    description,
    imgSrc,
    category,
    roomCount,
    bathroomCount,
    guestCount,
    location,
    price,
  } = body;
  Object.keys(body).forEach((value: any) => {
    if (!body[value]) {
      console.log("coming ehre");
      return NextResponse.json(
        { error: "All field are required!!" },
        { status: 404, statusText: "All field are required!" }
      );
      //   return NextResponse.json(
      //     {
      //       message: "All fields are required!",
      //       success: false,
      //     },
      //     { status: 500 }
      //   );
    }
  });

  const listing = await prisma?.listing.create({
    data: {
      title,
      description,
      imgSrc,
      category,
      roomCount,
      bathroomCount,
      guestCount,
      locationValue: location.value,
      price: parseInt(price, 10),
      userId: currentUser.id,
    },
  });

  return NextResponse.json(listing);
}
