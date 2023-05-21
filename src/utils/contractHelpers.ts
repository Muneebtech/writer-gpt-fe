import { BigNumber } from "ethers";

const contractNumberBase = 1000000;

export function toContractNumber(value: number): number {
  return value * contractNumberBase;
}

export function toDecimalNumber(value: BigNumber): number {
  return parseInt(value._hex) / contractNumberBase;
}

export function runAfterTimeout(callback: () => void, seconds: number) {
  const timer = setTimeout(() => {
    callback();
  }, seconds * 1000);
  clearTimeout(timer);
  //   return () => clearTimeout(timer);
}
