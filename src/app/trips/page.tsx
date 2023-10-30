import EmptyState from "@/components/EmptyState";

import getCurrentUser from "@/actions/getCurrentUser";
import getReservation from "@/actions/getReservations";
import TripsClient from "./TripsClient";

const TripsPage = async () => {
  const currentUSer = await getCurrentUser();

  if (!currentUSer) {
    return <EmptyState title="Unauthorized" subtitle="Please Login!" />;
  }

  const reservation = await getReservation({
    userId: currentUSer.id,
  });

  if (reservation?.length === 0) {
    return (
      <EmptyState
        title="No Trips Found"
        subtitle="Looks like you havent reserved any trips"
      />
    );
  }

  return <TripsClient reservation={reservation} currentUSer={currentUSer} />;
};

export default TripsPage;
