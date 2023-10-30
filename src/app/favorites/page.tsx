import EmptyState from "@/components/EmptyState";

import getCurrentUser from "@/actions/getCurrentUser";

import React from "react";
import getFavorites from "@/actions/getFavorite";
import FavoritesClient from "./FavoritesClient";

const ListingPage = async () => {
  const listings = await getFavorites();
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please Login!" />;
  }

  if (listings?.length === 0) {
    return (
      <EmptyState
        title="No Favorites found"
        subtitle="Looks like you have no favorite listings."
      />
    );
  }
  return <FavoritesClient listing={listings} currentUser={currentUser} />;
};

export default ListingPage;
