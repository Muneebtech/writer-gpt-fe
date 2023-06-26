import { generateRandomColors } from "@/utils/randomColor"
import Image from "next/image"
import React from "react"
import { useRouter } from "next/router"
interface CardProps {
  data: {
    id: string
    channel: string
    category: {
      category: string
      id: string
    }
    youtubeLink: string
    discordLink: string
    photoPath: File | any
    subscribers: string
  }
  key: string
}
const Cards: React.FC<CardProps> = ({ data, key }) => {
  const { backgroundColor, textColor } = generateRandomColors()
  // const [filterText, setFilterText] = useState("");
  // const filteredItems = data.filter(
  //     data =>
  //     data.description.toLocaleLowerCase().includes(filterText) ||
  //     data.title.toLocaleLowerCase().includes(filterText)
  // );
  const router = useRouter()

  const handleCardClick = (id: string) => {
    router.push(`/brands/${id}`)
  }
  return (
    <div
      onClick={() => handleCardClick(data?.id)}
      key={key}
      className="col-span-1 flex flex-col justify-start items-center border border-gray-200 gap-2 rounded-lg mx-4 my-2 p-2 cursor-pointer"
    >
      <span
        style={{ backgroundColor: `${backgroundColor}`, color: `${textColor}` }}
        className="px-4 py-2 rounded-3xl text-xs text-center flex justify-center items-center whitespace-nowrap overflow-hidden"
      >
        {data?.category?.category}
      </span>
      <div className="w-24 h-24 relative">
        <Image
          fill
          style={{ objectFit: "cover" }}
          src="/profile.png"
          alt="none"
        />
      </div>
      <div className="flex flex-col justify-center items-center mb-5">
        <span className="text-lg font-medium text-ellipsis w-full text-center">
          {data?.channel}
        </span>
        <span className="text-xs text-gray-500">
          Subscribers {data?.subscribers}
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
  )
}
export default Cards
