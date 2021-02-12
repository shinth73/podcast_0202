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

export const MyPodcast: React.FC<IPodcastProps> = ({ id, createdAt, title, coverImg }) => (
  <div className="flex flex-col h-full py-3 border-b text-xs border-gray-400">
    <div className="flex flex-row mb-4">
      <div
        style={{ backgroundImage: `url(${coverImg})` }}
        className="w-16 h-16 ml-2 bg-cover group-hover:bg-gray-100 rounded-lg"
      ></div>
      <div className="flex flex-col justify-center mx-4">
        <h3 className="text-base font-bold text-green-400 pb-2">{title}</h3>
        <div className="flex flex-row justify-space items-center ">
          <h3 className="text-xs text-white font-bold">Created : {createdAt.split("T")[0]}</h3>
        </div>
      </div>
    </div>
    <div className="container flex flex-row justify-between">
      <Link
        to={`/edit-podcast/${id}`}
        className=" w-20 text-white bg-gray-800 py-1 px-2 hover:bg-gray-700 flex justify-center rounded-full"
      >
        Edit
      </Link>
      <Link
        to={`/my-podcast/${id}`}
        className=" w-20 text-white bg-gray-800 py-1 px-2 hover:bg-gray-700 flex justify-center rounded-full"
      >
        View
      </Link>
      <Link
        to={`/delete-podcast/${id}`}
        className=" w-20 text-white bg-gray-800 py-1 px-2 hover:bg-gray-700 flex justify-center rounded-full"
      >
        Delete
      </Link>
    </div>
  </div>
);
