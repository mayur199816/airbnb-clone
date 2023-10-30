import EmptyState from "@/components/EmptyState";

import getCurrentUser from "@/actions/getCurrentUser";
import getReservation from "@/actions/getReservations";
import TripsClient from "./PropertiesClient";
import getListings from "@/actions/getListings";
import PropertiesClient from "./PropertiesClient";

const PropertiesPage = async () => {
  const currentUSer = await getCurrentUser();

  if (!currentUSer) {
    return <EmptyState title="Unauthorized" subtitle="Please Login!" />;
  }

  const listings = await getListings({
    userId: currentUSer.id,
  });

  if (listings?.length === 0) {
    return (
      <EmptyState
        title="No Properties Found"
        subtitle="Looks like you have no properties"
      />
    );
  }

  return <PropertiesClient listings={listings} currentUSer={currentUSer} />;
};

export default PropertiesPage;
