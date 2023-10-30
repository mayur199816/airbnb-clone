"use client";

import Container from "@/components/Container";
import Heading from "@/components/Heading";
import { SafeReservation, SafeUser } from "@/types";
import React, { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import ListingCard from "@/components/listings/ListingCard";

interface TripsClientProps {
  reservation: SafeReservation[];
  currentUSer?: SafeUser | null;
}

const TripsClient = ({ reservation, currentUSer }: TripsClientProps) => {
  const router = useRouter();

  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success("Reservation canceled");
          router.refresh();
        })
        .catch((err) => {
          toast.error(err?.response?.data?.error);
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );
  return (
    <Container>
      <Heading
        title="Trips"
        subTitle="Where you've been and where you're going"
      />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {reservation?.map((res) => (
          <ListingCard
            key={res.id}
            data={res.listing}
            reservation={res}
            actionId={res.id}
            onAction={onCancel}
            disabled={deletingId === res.id}
            actionLabel={"Cancel Reservation"}
            currentUser={currentUSer}
          />
        ))}
      </div>
    </Container>
  );
};

export default TripsClient;
