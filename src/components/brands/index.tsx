import React from "react";
import Cards from "./Cards";
import { categories } from "@/constants/categories";
import Header from "@/common/Header/header";

const Brands = () => {
  const data = {
    catergory: "Education",
    img: "@/public/profile.png",
    title: "Morning Prayers",
    subscribers: "1.5k",
    discord: "link",
    youtube: "link",
    others: {},
  };

  return (
    <>
      <div className="flex flex-col text-black gap-5">
        <div className="flex flex-wrap gap-2 justify-between">
          {categories.map((obj) => (
            <span className="px-4 py-2 border rounded-3xl text-xs text-center">
              {obj}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(() => (
            <Cards {...data} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Brands;
