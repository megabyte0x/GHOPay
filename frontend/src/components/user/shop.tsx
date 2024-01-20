import React, { useState } from "react";
import BookingTile from "../partner/booking-tile";
import BookDealModal from "./book-a-deal";

const Shop = () => {
  const [showBookDeal, setShowBookDeal] = useState(false);
  const onBookingHandle = () => {
    setShowBookDeal(true);
  };
  return (
    <div className="flex flex-col gap-[24px] px-20 py-[64px]">
      <div className="flex flex-col gap-[48px]">
        <div className="grid grid-cols-4 gap-[16px]">
          <BookingTile onBookingHandle={onBookingHandle} />
        </div>
      </div>
      {showBookDeal && (
        <BookDealModal
          onClose={() => setShowBookDeal(false)}
          onNext={() => setShowBookDeal(false)}
        />
      )}
    </div>
  );
};

export default Shop;
