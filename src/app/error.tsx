"use client";
import EmptyState from "@/components/EmptyState";
import Error from "next/error";
import { useEffect } from "react";

interface ErrorStateProps {
  error: Error;
}

import React from "react";

const Errorstate = ({ error }: ErrorStateProps) => {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return <EmptyState title="Uh Oh!" subtitle="Something went wrong" />;
};

export default Errorstate;
