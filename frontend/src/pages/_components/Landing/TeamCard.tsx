import { TeamMember } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type TeamCardProps = {
  member: TeamMember;
};

const TeamCard = ({ member }: TeamCardProps) => {
  return (
    <div className="flex flex-col gap-[20px] items-center justify-center ">
      <Image src={member.img} height={96} width={96} alt="pfp" />
      <div className="flex flex-col items-center justify-center text-center text-[#F5F5F6]">
        <h2 className="text-[16px] font-semibold leading-[24px]">
          {member.name}
        </h2>
        <h3 className="text-[16px] leading-[24px] text-[#CECFD2]">
          {member.role}
        </h3>
        <div className="flex gap-[16px] pt-[12px]">
          <Link href={`${member.twit}`}>
            <Image
              src={"/xIcon.svg"}
              height={24}
              width={24}
              alt="twitter"
              className="hover:p-[1px]"
            />
          </Link>
          <Link href={`${member.gitHub}`}>
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
