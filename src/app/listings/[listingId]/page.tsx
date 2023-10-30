import getCurrentUser from "@/actions/getCurrentUser";
import getListingById from "@/actions/getListingById";
import EmptyState from "@/components/EmptyState";
import React from "react";
import ListingClient from "./ListingClient";
import getReservation from "@/actions/getReservations";

interface IParams {
  listingId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
  const currentUser = await getCurrentUser();
  const listing = await getListingById(params);
  const reservations = await getReservation(params);

  if (!listing) {
    return <EmptyState />;
  }

  return (
    <ListingClient
      reservations={reservations}
      listing={listing}
      currentUser={currentUser}
    />
  );
};

export default ListingPage;
