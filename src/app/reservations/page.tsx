import React from "react";
import EmptyState from "@/components/EmptyState";

import getCurrentUser from "@/actions/getCurrentUser";
import getReservation from "@/actions/getReservations";
import ReservationClient from "./ReservationClient";

const ReservationPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please Login!" />;
  }

  const reservation = await getReservation({
    authorId: currentUser?.id,
  });

  if (reservation?.length === 0) {
    return (
      <EmptyState
        title="No Reservations found"
        subtitle="Looks like you have no reservations on ypur property!"
      />
    );
  }
  return (
    <ReservationClient reservation={reservation} currentUser={currentUser} />
  );
};

export default ReservationPage;
