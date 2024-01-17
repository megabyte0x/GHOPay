import { BasicHeadings, TeamCard } from "@/pages/_components";
import Image from "next/image";
import React from "react";

const Team = () => {
  return (
    <div className="py-[96px] gap-[64px] flex flex-col items-center justify-center">
      <BasicHeadings
        subH1="The team"
        mainH="Meet the team behind GHOPayments"
        subH2="We’re building the incentive layer for GHO Payments."
      />
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-[48px] justify-center items-center">
        {/* {team.map((person) => {
          <TeamCard person={person} />;
        })} */}
        <TeamCard person={team[0]} />
        <TeamCard person={team[0]} />
        <TeamCard person={team[0]} />
        <TeamCard person={team[0]} />
      </div>
    </div>
  );
};

export default Team;

const team = [
  {
    name: "MegaByte",
    role: "Smart Contract Dev",
    twit: "",
    gitHub: "",
  },
];
