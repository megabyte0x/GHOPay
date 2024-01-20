import React, { useState } from "react";
import BookingTile from "../partner/booking-tile";
import BookDealModal from "./book-a-deal";
import ClaimSuccessful from "./ClaimSuccessful";

const Shop = () => {
  const [showBookDeal, setShowBookDeal] = useState(false);
  const onBookingHandle = () => {
    setShowBookDeal(true);
  };
  const [rewardClaimed, setRewardClaimed] = useState(false);
  const handleClose = () => {
    setShowBookDeal(false);
    setRewardClaimed(false);
  };
  const handleNext = () => {
    setShowBookDeal(false);
    setRewardClaimed(true);
  };
  return (
    <div className="flex flex-col gap-[24px] px-20 py-[64px]">
      <div className="flex flex-col gap-[48px]">
        <div className="grid grid-cols-4 gap-[16px]">
          <BookingTile onBookingHandle={onBookingHandle} />
        </div>
      </div>
      {showBookDeal && (
        <div className="items-center justify-center bg-[#21212198] backdrop-blur-md fixed inset-0 flex">
          <BookDealModal onClose={handleClose} onNext={handleNext} />
        </div>
      )}
      {rewardClaimed && (
        <div className="items-center justify-center bg-[#21212198] backdrop-blur-md fixed inset-0 flex">
          <ClaimSuccessful onClose={handleClose} />
        </div>
      )}
    </div>
  );
};

export default Shop;
