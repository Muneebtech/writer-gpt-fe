import { generateRandomColors } from "@/utils/randomColor";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/router";
interface CardProps {
  data: {
    id: string;
    channel: string;
    category: {
      category: string;
      id: string;
    };
    youtubeLink: string;
    discordLink: string;
    photoPath: File | any;
    subscribers:string
  };
  key: string;
}
const Cards: React.FC<CardProps> = ({ data, key }) => {
  const { backgroundColor, textColor } = generateRandomColors();
  // const [filterText, setFilterText] = useState("");
  // const filteredItems = data.filter(
  //     data =>
  //     data.description.toLocaleLowerCase().includes(filterText) ||
  //     data.title.toLocaleLowerCase().includes(filterText)
  // );
  console.log(data, "data");
  const router = useRouter();

  const handleCardClick = (id: string) => {
    router.push(`/brands/${id}`);
  };
  return (
    <div
      key={key}
      className="h-60 w-52 flex flex-col justify-center items-center border border-gray-200 gap-2 rounded-lg"
    >
      <span
        style={{ backgroundColor: `${backgroundColor}`, color: `${textColor}` }}
        className="px-4 py-2 rounded-3xl text-xs text-center flex
             justify-center items-center"
      >
        {data?.category?.category}
      </span>
      <Image width={60} height={60} src="/profile.png" alt="none" />
      <div className="flex flex-col justify-center items-center mb-5">
        <span className="text-lg font-medium">{data?.channel}</span>
        <span className="text-xs text-gray-500">
          Subscribers {data?.subscribers}{" "}
        </span>
      </div>
      <div className="flex gap-2">
      <div className="rounded-2xl px-2 py-1 flex justify-center items-center border-gray-200 border">
          <Image width={20} height={20} src="/youtube.png" alt="" />
        </div>
        <div className="rounded-2xl px-2 py-1 flex justify-center items-center border-gray-200 border">
          <Image width={20} height={20} src="/discord.png" alt="" />
        </div>
        <div
          onClick={() => handleCardClick(data?.id)}
          className="rounded-2xl px-3 py-1 flex justify-center items-center border-gray-200 border"
        >
          <Image width={15} height={15} src="/dots.png" alt="" />
        </div>
      </div>
    </div>
  );
};
export default Cards;
