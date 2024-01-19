import React from "react";

import { publicClient } from "@/utils/contract";
import BUTTONS from "@/components/landing/Buttons";

const Testing = () => {
  const onClickHandler = async () => {
    console.log(await publicClient.getBlock());
  };
  return (
    <div>
      <BUTTONS.PURPLE style="" text="CLICK MEE" onClick={onClickHandler} />
    </div>
  );
};

export default Testing;
