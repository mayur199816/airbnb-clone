"use client";

import Container from "@/components/Container";
import Heading from "@/components/Heading";
import ListingCard from "@/components/listings/ListingCard";
import { SafeListing, SafeUser } from "@/types";
import React from "react";

interface FavoritesClientProps {
  currentUser?: SafeUser | null;
  listing: SafeListing[];
}

const FavoritesClient = ({ currentUser, listing }: FavoritesClientProps) => {
  return (
    <Container>
      <Heading title="Favorites" subTitle="List of places you have favorited" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listing.map((lis) => (
          <ListingCard key={lis.id} currentUser={currentUser} data={lis} />
        ))}
      </div>
    </Container>
  );
};

export default FavoritesClient;
