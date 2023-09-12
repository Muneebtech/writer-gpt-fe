import Image from "next/image";
import React from "react";
interface ChildProps {
  widht: number;
  height: number;
  TitleData: string;
  titleofPage: string;
}
const Skeleton: React.FC<ChildProps> = ({
  widht,
  height,
  TitleData,
  titleofPage,
}) => {
  return (
    <div>
      <Image src="/Skeleton.png" alt="skeleton" width={widht} height={height} />
      <p className="text-[#838383] font-[400]">{TitleData} :</p>
      <li className=" text-[#838383] font-[400]">{titleofPage}</li>
    </div>
  );
};

export default Skeleton;
