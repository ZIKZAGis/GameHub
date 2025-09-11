"use client"

import ExpandableList from "./ExpandableList";
import RatingCard from "./RatingCard";
import { Rating } from "@prisma/client";

type RatingListProps = {
  ratings: Rating[];
};

export default function RatingList({ ratings }: RatingListProps) {
  return (
    <ExpandableList
      title="My ratings"
      items={ratings}
      emptyText="No ratings yet"
      initialCount={6}
      wrapperClassName="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
      renderItem={(rating) => (
        <div key={rating.id}>
          <RatingCard rating={rating} />
        </div>
      )}
    />
  );
}