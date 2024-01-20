import { formatUnits } from "viem";

export const toBigNumber = (value: number) => {
  return formatUnits(1000000000000000000n, value);
};
