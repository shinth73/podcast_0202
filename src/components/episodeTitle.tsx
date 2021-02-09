/** @format */

import {
  faArrowAltCircleDown,
  faFolderPlus,
  faGlobeAmericas,
  faPlayCircle,
  faPlus,
  faShareAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

interface IPodcastProps {
  id: number;
  createdAt: string;
  title: string;
  category: string;
  coverImg: string;
  description: string;
}

export const EpisodeTitle: React.FC<IPodcastProps> = ({
  id,
  createdAt,
  title,
  category,
  coverImg,
  description,
}) => (
  <div className="flex flex-col justify-around items-center h-full py-3 border-b text-xs border-gray-400">
    <div className="flex flex-row mb-3 w-full justify-around">
      <div className="flex flex-col justify-center items-center">
        <h3 className="text-3xl font-bold text-green-400 pb-4 ">{title}</h3>
        <div className="w-full flex flex-row justify-start items-center ">
          <div className="flex flex-row justify-center items-center mx-3 px-4 py-1 border border-gray-400 rounded-full">
            <FontAwesomeIcon className="text-blue-400 text-lg" icon={faPlus} />
            <div className="ml-2 text-sm text-gray-300 font-bold text-xl">Subscribe</div>
          </div>
          <FontAwesomeIcon className="text-blue-400 text-lg" icon={faGlobeAmericas} />
          <FontAwesomeIcon className="text-blue-400 text-lg mx-3" icon={faShareAlt} />
        </div>
      </div>
      <div
        style={{ backgroundImage: `url(${coverImg})` }}
        className="w-36 h-36 md:w-60 md:h-60 ml-2 bg-cover group-hover:bg-gray-100 rounded-lg"
      ></div>
    </div>
    <div className="flex flex-col justify-center mx-4"></div>
    <p className="text-base text-white font-bold text-green-400"> {description}</p>
  </div>
);
