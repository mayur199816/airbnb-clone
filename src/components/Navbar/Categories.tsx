"use client";
import React from "react";
import Container from "../Container";
import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from "react-icons/gi";
import { MdOutlineVilla } from "react-icons/md";
import CategoryBox from "./CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";
import { FaSkiing } from "react-icons/fa";
import { BsSnow } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";

export const categories = [
  {
    label: "Beach",
    icon: TbBeach,
    description: "This property is close to the beach!",
  },
  {
    label: "Windmills",
    icon: GiWindmill,
    description: "This property has windmill!",
  },
  {
    label: "Modern",
    icon: MdOutlineVilla,
    description: "This property is Modern",
  },
  {
    label: "Countryside",
    icon: TbMountain,
    description: "This property is in the countryside",
  },
  {
    label: "Pools",
    icon: TbPool,
    description: "This property has a Pool!",
  },
  {
    label: "Islands",
    icon: GiIsland,
    description: "This property has a Island!",
  },
  {
    label: "Lake",
    icon: GiBoatFishing,
    description: "This property has a Lake!",
  },
  {
    label: "Skiing",
    icon: FaSkiing,
    description: "This property has a skiing activities!",
  },
  {
    label: "Castles",
    icon: GiCastle,
    description: "This property has Castles!",
  },
  {
    label: "Camping",
    icon: GiForestCamp,
    description: "This property has Camping activities!",
  },
  {
    label: "Arctiv",
    icon: BsSnow,
    description: "This property has Artic!",
  },
  {
    label: "Cave",
    icon: GiCaveEntrance,
    description: "This property has Caves!",
  },
  {
    label: "Desert",
    icon: GiCactus,
    description: "This property has Cactus!",
  },
  {
    label: "Barns",
    icon: GiBarn,
    description: "This property has BArns!",
  },
  {
    label: "Lux",
    icon: IoDiamond,
    description: "This property has Diamonds!",
  },
];

const Categories = () => {
  const params = useSearchParams();

  const category = params?.get("category");

  const pathName = usePathname();

  const isMainPage = pathName === "/";
  if (!isMainPage) {
    return null;
  }
  return (
    <Container>
      <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            selected={category === item.label}
            icon={item.icon}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
