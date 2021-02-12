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
  role: string;
}

export const EpisodeTitle: React.FC<IPodcastProps> = ({
  id,
  createdAt,
  title,
  category,
  coverImg,
  description,
  role,
}) => (
  <div className="flex flex-col justify-around items-center h-full py-3 border-b text-xs border-gray-400">
    <div className="flex flex-row mb-3 w-full justify-center">
      <div
        style={{ backgroundImage: `url(${coverImg})` }}
        className="w-36 h-36 md:w-60 md:h-60 bg-cover rounded-lg "
      ></div>
      <div className="ml-8 w-8/12 flex flex-col justify-center items-center">
        <h3 className="text-3xl font-bold text-green-400 pb-4 ">{title}</h3>
        <p className="text-base text-white font-bold text-white"> {description}</p>
        {role === "listener" ? (
          <Link
            to={`/subscription/${id}`}
            className="flex flex-row mt-4 focus-within:ml-12 cursor-pointer hover:bg-gray-800 justify-center items-center mx-3 
      px-4 py-1 border-green-800 border-2 shadow-inner border-gray-400 rounded-full"
          >
            <FontAwesomeIcon className="text-blue-400 text-lg" icon={faPlus} />
            <div className="ml-2 text-sm text-gray-300 font-bold text-sm"> Subscribe </div>
          </Link>
        ) : (
          <></>
        )}
      </div>
      ;
    </div>
  </div>
);
