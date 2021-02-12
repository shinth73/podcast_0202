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
  podcastId: number;
}

export const MyEpisode: React.FC<IEpisodeProps> = ({
  id,
  createdAt,
  title,
  description,
  length,
  podcastId,
}) => (
  <div className="flex flex-col justify-between h-full py-3 border-b text-xs border-gray-400">
    <div className="flex flex-col mb-4">
      <h3 className="text-lg font-bold mb-2 text-blue-500 pb-2">{title}</h3>
      <p className="text-sm text-white text-gray-400"> {description}</p>
    </div>
    <div className="flex flex-row md:flex-col justify-space items-center md:items-start">
      <h3 className="text-xs text-white font-bold">Created : {createdAt.split("T")[0]}</h3>
    </div>
    <div className="container flex flex-row justify-between mt-2">
      <Link
        to={`/my-podcasts/${podcastId}/edit-episode/${id}`}
        className=" w-20 text-white bg-gray-800 py-1 px-2 hover:bg-gray-700 flex justify-center rounded-full"
      >
        Edit
      </Link>
      <Link
        to={`/my-podcasts/${podcastId}/delete-episode/${id}`}
        className=" w-20 text-white bg-gray-800 py-1 px-2 hover:bg-gray-700 flex justify-center rounded-full"
      >
        Delete
      </Link>
    </div>
  </div>
);
