"use client";
import React, { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { SafeReservation, SafeUser } from "@/types";
import Heading from "@/components/Heading";
import Container from "@/components/Container";
import ListingCard from "@/components/listings/ListingCard";
import toast from "react-hot-toast";
import axios from "axios";

interface ReservationClientProps {
  reservation: SafeReservation[];
  currentUser?: SafeUser | null;
}

const ReservationClient = ({
  reservation,
  currentUser,
}: ReservationClientProps) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback(
    async (id: string) => {
      setDeletingId(id);

      await axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success("Reservation Cancelled");
          router.refresh();
        })
        .catch(() => {
          toast.error("Something went wrong");
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );
  return (
    <Container>
      <Heading title="Reservations" subTitle="Booking on your Properties!" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {reservation.map((res) => (
          <ListingCard
            key={res.id}
            data={res.listing}
            reservation={res}
            actionId={res.id}
            onAction={onCancel}
            disabled={deletingId === res.id}
            actionLabel={"Cancel guest Reservation"}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};
export default ReservationClient;
