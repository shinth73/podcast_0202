/** @format */

import {
  faArrowAltCircleDown,
  faFolderPlus,
  faPlayCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

interface IEpisodeProps {
  id: number;
  createdAt: string;
  title: string;
  description: string;
  length: number;
}

export const Episode: React.FC<IEpisodeProps> = ({ id, createdAt, title, description, length }) => (
  <div className="flex flex-col justify-between h-full py-3 border-b text-xs border-gray-400">
    <div className="flex flex-col mb-4">
      <h3 className="text-lg font-bold mb-2 text-blue-500 pb-2">{title}</h3>
      <p className="text-sm text-white text-gray-400"> {description}</p>
    </div>
    <div className="flex flex-row md:flex-col justify-space items-center md:items-start">
      <h3 className="text-xs text-white font-bold">Created : {createdAt.split("T")[0]}</h3>
      <div
        className="flex flex-row ml-12 md:mt-4 cursor-pointer hover:bg-gray-800 justify-center items-center mx-3 
      px-4 py-1 border-green-800 border-2 shadow-inner border-gray-400 rounded-full"
      >
        <FontAwesomeIcon className="text-blue-400 text-lg" icon={faPlayCircle} />
        <div className="ml-2 text-sm text-gray-300 font-bold text-sm">{length} min</div>
      </div>
    </div>
  </div>
);
