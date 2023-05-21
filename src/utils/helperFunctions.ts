import { utils } from "ethers";

export function formatProof(proof: string[]) {
  console.log("++++++++++++++++++++++++++++++")
  console.log("proof to be formated\n", proof);
  return proof.map((proo) => utils.formatBytes32String(proo));
}
export function getNumberSuffix(num: number): string {
  const lastDigit = num % 10;
  if (lastDigit === 1 && num !== 11) {
    return "st";
  } else if (lastDigit === 2 && num !== 12) {
    return "nd";
  } else if (lastDigit === 3 && num !== 13) {
    return "rd";
  } else {
    return "th";
  }
}
