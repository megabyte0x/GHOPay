"use client";
import { CONTRACTS } from "@/constants";
import usePartnerDetails from "@/hooks/partner/usePartnerDetails";
import useApprovals from "@/hooks/useApprovals";
import useBalances from "@/hooks/useBalances";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useAccount, useContractWrite } from "wagmi";
import { waitForTransaction } from "wagmi/actions";

type BookDealModalProps = {
  onClose: () => void;
  onNext: () => void;
};

const ghoPoints = 0;
const gasFee = 0;

const BookDealModal = ({ onClose, onNext }: BookDealModalProps) => {
  const [amountPay, setAmountPay] = useState(0);
  const [tnc, setTnc] = useState(false);
  const [message, setMessage] = useState("");

  const { address } = useAccount();
  const { partnerPaymentAddr } = usePartnerDetails();
  const { approveTestGhoForMain, approveTestGhoForPartner } = useApprovals();
  const { availableGho } = useBalances();

  useEffect(() => {});

  const { writeAsync: bookService } = useContractWrite({
    account: address,
    address: partnerPaymentAddr,
    abi: CONTRACTS.PARTNER.PartnerPayment.ABI,
    functionName: "bookAService",
    args: [BigInt(0 * 10e17), BigInt(amountPay * 10e17)],
  });

  const handleAmountPay = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmountPay(parseFloat(e.target.value));
  };
  const handleTnc = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setTnc(e.target.value);
    console.log(tnc);
    console.log(e.target.value);
  };
  const handleBook = async () => {
    onNext();
    console.log({ partnerPaymentAddr });
    if (!partnerPaymentAddr) {
      throw new Error("Partner Payment Address not found");
    }
    if (!amountPay) {
      setMessage("Enter Amount");
    }
    // else if (!tnc) {
    //   setMessage("Accept TnC");
    // }
    try {
      console.info(`Approving Test GHO for partner and main vault`);
      await Promise.all([approveTestGhoForMain(), approveTestGhoForPartner()]);

      const { hash } = await bookService();
      console.info(`Book Service: Transaction hash: ${hash}`);

      await waitForTransaction({ hash, chainId: 11155111 });
      console.info(`Book Service: Transaction successful`);
    } catch (error) {
      console.error(Object.keys(error));
      console.log(Object.values(error));
      // console.error((error as any).Error);
    }
  };
  return (
    <div
      className="border-solid border-[#5720b7] border-[1px] rounded-[12px] shadow-[0px_8px_8px_-4px_rgba(16,_24,_40,_0.04),_0px_20px_24px_-4px_rgba(16,_24,_40,_0.1)] bg-[#2e125e] 
p-[24px] flex flex-col gap-[20px] h-fit max-w-[690px] w-full"
    >
      <div className="flex gap-[24px] items-center justify-between w-full">
        <div className="flex items-center justify-start gap-[24px]">
          <div
            className="bg-[#5720b7] border-solid border-[1px] border-[#6927da] shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)]
flex items-center justify-center p-[12px] rounded-[10px] h-fit w-fit"
          >
            <Image src={"/tag.svg"} height={24} width={24} alt="tag" />
          </div>
          <h2 className="text-[18px] font-semibold leading-[28px] text-[#dbd2ef]">
            Book a Deal
          </h2>
        </div>
        <Image
          src={"/unitedSq.svg"}
          alt="partner-logo"
          height={48}
          width={93}
        />
      </div>
      <div className="flex flex-col gap-[32px] w-full">
        <form className="flex flex-col gap-[16px] text-left">
          <div
            className="rounded-[8px] border-dashed border-[#6927da] border-[1px] shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] 
                text-[#A48AFB]
              flex flex-col justify-between gap-[16px] w-full
                  text-[16px] leading-[24px] px-[14px] py-[10px]"
          >
            <div className="flex justify-between">
              <div className="flex gap-2">
                <Image
                  src={"/currency-dollar-circle.svg"}
                  alt="info"
                  width={20}
                  height={20}
                />
                <h3 className="text-left">GHO Points</h3>
              </div>
              <h6 className="pr-[14px] min-w-fit text-right place-self-end">
                ${ghoPoints}
              </h6>
            </div>
            <div className="flex justify-between">
              <div className="flex gap-2">
                <Image src={"/gas.svg"} alt="info" width={20} height={20} />
                <h3 className="text-left">Gas Fees</h3>
              </div>
              <h6 className="pr-[14px] min-w-fit  text-right place-self-end">
                {gasFee} GWEI
              </h6>
            </div>
          </div>
          <div className="flex flex-col gap-[6px]">
            <label className="flex justify-between w-full">
              <h1 className="text-[14px] font-medium leading-[20px] text-[#f5f3ff]">
                Amount You Will Pay
              </h1>

              <h3 className="text-right text-[14px] leading-[20px] text-[#DBD2EFCC]">
                Available GHO: {availableGho}
              </h3>
            </label>
            <div
              className="rounded-[8px] border-solid border-[#6927da] border-[1px] shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] bg-[#491c96] 
                text-[#A48AFB]
              flex justify-between items-center gap-[8px]"
            >
              <input
                onChange={handleAmountPay}
                type="number"
                placeholder="0.00 GHO"
                className="bg-[#00000000] border-0 w-full
                  text-[16px] leading-[24px] py-[10px] px-[14px]"
              />
            </div>
          </div>
          {/* CHECK BASED ON? XX */}
          {availableGho && amountPay > availableGho && (
            <div
              className="rounded-[8px] border-solid border-[#6927da] border-[1px] shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] 
                text-[#A48AFB]
              flex justify-between gap-[8px] w-full
                  text-[16px] leading-[24px] py-[10px] pl-[14px]"
            >
              <div className="flex gap-2">
                <Image
                  src={"/info-circle.svg"}
                  alt="info"
                  width={20}
                  height={20}
                />
                <h3 className="text-left">
                  You don’t have enough GHO to stake.
                </h3>
              </div>
              <h6
                className="hover:underline-offset-[2px] cursor-pointer
                      pr-[14px] min-w-fit underline font-semibold text-right place-self-end"
              >
                Buy GHO
              </h6>
            </div>
          )}
          <div className="border-b-[1px] border-solid border-[#491C96]"></div>

          <div className="flex gap-2">
            <input
              type="checkbox"
              className="border-[0px] bg-[#000000]"
              onChange={handleTnc}
            />
            <label className="text-[14px] leading-[20px] text-medium text-[#C3B5FD]">
              I agree to all the terms and conditions of the booking.
            </label>
          </div>
        </form>
        <div className="flex flex-col">
          <h3 className="self-end text-[#ed8484cc] text-[12px]">{message}</h3>
          <div className="grid grid-cols-2 gap-[12px]">
            <button
              onClick={onClose}
              className="font-semibold leading-[24px] text-[#a48afb] text-[16px]
        border-solid border-[1px] rounded-[8px] border-[#a48afb] shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] 
        flex flex-row justify-center cursor-pointer px-[18px] py-[10px]
        hover:opacity-60"
            >
              Cancel
            </button>
            <button
              onClick={handleBook}
              className="font-semibold leading-[24px] text-white text-[16px]
          border-solid border-[1px] rounded-[8px] border-[#a48afb] shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] 
          bg-[#6941c6] 
          flex flex-row justify-center cursor-pointer px-[18px] py-[10px]
          hover:opacity-75"
            >
              Book Deal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDealModal;
