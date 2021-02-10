/** @format */

import {
  faArrowAltCircleDown,
  faFolderPlus,
  faPlayCircle,
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

export const Podcast: React.FC<IPodcastProps> = ({
  id,
  createdAt,
  title,
  coverImg,
  description,
}) => (
  <Link to={`/podcast/${id}`}>
    <div className="flex flex-col h-full py-3 border-b text-xs border-gray-400 hover:bg-gray-900">
      <div className="flex flex-row mb-4">
        <div
          style={{ backgroundImage: `url(${coverImg})` }}
          className="w-16 h-16 ml-2 bg-cover group-hover:bg-gray-100 rounded-lg"
        ></div>
        <div className="flex flex-col justify-center mx-4">
          <h3 className="text-base font-bold text-green-400 pb-2">{title}</h3>
          <div className="flex flex-row justify-space items-center ">
            <h3 className="text-xs text-white font-bold">Created : {createdAt.split("T")[0]}</h3>
            <div className="flex flex-row ml-12 justify-center items-center mx-3 px-2 py-1 border border-gray-400 rounded-full">
              <FontAwesomeIcon className="text-blue-400 text-lg" icon={faPlayCircle} />
              <div className="ml-2 text-sm text-gray-300 font-bold text-sm">{length} min</div>
            </div>
            <FontAwesomeIcon className="text-blue-400 text-lg" icon={faFolderPlus} />
            <FontAwesomeIcon className="text-blue-400 text-lg mx-3" icon={faArrowAltCircleDown} />
          </div>
        </div>
      </div>
      <p className="text-sm text-white text-gray-400"> {description}</p>
    </div>
  </Link>
);
