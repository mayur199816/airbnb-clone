"use client";
import Container from "@/components/Container";
import { categories } from "@/components/Navbar/Categories";
import ListingHead from "@/components/listings/ListingHead";
import ListingInfo from "@/components/listings/ListingInfo";
import ListingReservation from "@/components/listings/ListingReservation";
import useLoginMdoal from "@/hooks/useLoginModal";
import { SafeListing, SafeReservation, SafeUser } from "@/types";
import axios from "axios";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import { useRouter } from "next/navigation";
import { list } from "postcss";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Range } from "react-date-range";
import toast from "react-hot-toast";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

interface ListingClientProps {
  reservations?: SafeReservation[];
  currentUser?: SafeUser | null;
  listing: SafeListing & {
    user: SafeUser;
  };
}
const ListingClient = ({
  reservations = [],
  currentUser,
  listing,
}: ListingClientProps) => {
  const loginModal = useLoginMdoal();
  const router = useRouter();

  const disabledDate = useMemo(() => {
    let dates: Date[] = [];
    reservations.forEach((res) => {
      const range = eachDayOfInterval({
        start: new Date(res.startDate),
        end: new Date(res.endDate),
      });

      dates = [...dates, ...range];
    });
    return dates;
  }, [reservations]);

  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  //create reservation
  const onCreateReservation = useCallback(async () => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    const isReserved = reservations.filter(
      (res) =>
        dateRange?.startDate >= new Date(res.startDate) &&
        dateRange.endDate <= new Date(res.endDate)
    );

    console.log(
      "isEwve",
      isReserved,
      reservations?.filter(
        (res) =>
          dateRange?.startDate >= new Date(res.startDate) &&
          dateRange.endDate <= new Date(res.endDate)
      )
    );
    if (isReserved?.length > 0) {
      toast.error("Date selected is already reserved");
      return;
    }

    setIsLoading(true);

    await axios
      .post("/api/reservations", {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing?.id,
      })
      .then(() => {
        toast.success("Listing Reserved");
        setDateRange(initialDateRange);

        //redirect to /trips
        router.push("/trips");
      })
      .catch((err) => {
        console.log("errr", err);

        toast.error(err?.response?.data || "Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [
    currentUser,
    dateRange,
    listing?.id,
    loginModal,
    reservations,
    router,
    totalPrice,
  ]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      );

      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price);
      } else {
        setTotalPrice(listing.price);
      }
    }
  }, [dateRange.endDate, dateRange.startDate, listing.price]);

  const category = useMemo(() => {
    return categories.find((item) => item.label === listing.category);
  }, [listing.category]);

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHead
            id={listing.id}
            currentUser={currentUser}
            title={listing.title}
            imageSrc={listing.imgSrc}
            locValue={listing.locationValue}
          />
          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
            <ListingInfo
              user={listing.user}
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              bathRoomCount={listing.bathroomCount}
              locationValue={listing.locationValue}
              category={category}
            />
            <div className="order-first mb-10 md:order-last md:col-span-3">
              <ListingReservation
                price={listing.price}
                totalPrice={totalPrice}
                onChangeDate={(value) => setDateRange(value)}
                dateRange={dateRange}
                onSubmit={onCreateReservation}
                disabled={isLoading}
                disabledDate={disabledDate}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
