import Image from "next/image";
import Link from "next/link";
import React from "react";

const TeamCard = ({ person }: any) => {
  return (
    <div className="flex flex-col gap-[20px] items-center justify-center ">
      <Image src={`/${person.name}.png`} height={96} width={96} alt="pfp" />
      <div className="flex flex-col items-center justify-center text-center text-[#F5F5F6]">
        <h2 className="text-[16px] font-semibold leading-[24px]">
          {person.name}
        </h2>
        <h3 className="text-[16px] leading-[24px] text-[#CECFD2]">
          {person.role}
        </h3>
        <div className="flex gap-[16px] pt-[12px]">
          <Link href={`${person.twit}`}>
            <Image
              src={"/xIcon.svg"}
              height={24}
              width={24}
              alt="twitter"
              className="hover:p-[1px]"
            />
          </Link>
          <Link href={`${person.gitHub}`}>
            <Image
              src={"/linkedinIcon.svg"}
              height={24}
              width={24}
              alt="linkedin"
              className="hover:p-[1px]"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TeamCard;
