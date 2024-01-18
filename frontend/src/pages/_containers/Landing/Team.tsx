import { TEAM } from "@/constants";
import { BasicHeadings } from "@/pages/_components";
import TeamCard from "@/pages/_components/Landing/TeamCard";
import React from "react";

const Team = () => {
  return (
    <div className="py-[96px] gap-[64px] flex flex-col items-center justify-center">
      <BasicHeadings
        subH1="The team"
        mainH="Meet the team behind GHOPayments"
        subH2="We’re building the incentive layer for GHO Payments."
      />
      <div className="flex gap-[48px] justify-center items-center">
        {TEAM.map((member) => (
          <TeamCard key={member.name} member={member} />
        ))}
      </div>
    </div>
  );
};

export default Team;
