"use client";
import { useRouter } from "next/navigation";
import React from "react";
import Heading from "./Heading";
import Button from "./Button";

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showRest?: boolean;
}

const EmptyState = ({
  title = "No exact Matches",
  subtitle = "Try changing some of your filters",
  showRest,
}: EmptyStateProps) => {
  const router = useRouter();
  return (
    <div className="h-[60vh] flex flex-col gap-2 justify-center items-center">
      <Heading title={title} subTitle={subtitle} center />
      <div className="w-48 mt-4">
        {showRest && (
          <Button
            outline
            label={"Remove all filters"}
            onClick={() => router.push("/")}
          />
        )}
      </div>
    </div>
  );
};

export default EmptyState;
