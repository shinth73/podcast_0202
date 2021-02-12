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

export const MyPodcast: React.FC<IPodcastProps> = ({
  id,
  createdAt,
  title,
  coverImg,
  description,
}) => (
  <div className="flex flex-col w-full h-full py-3 border-b text-xs border-gray-400 hover:bg-gray-900">
    <div className="md:w-full md:h-full flex flex-row md:flex-col ">
      <div
        style={{ backgroundImage: `url(${coverImg})` }}
        className="w-32 md:w-full h-32 md:h-60  ml-2 md:ml-0 bg-cover group-hover:bg-gray-100 rounded-lg"
      ></div>
      <div className="flex flex-col justify-center mx-2">
        <h3 className="text-base font-bold text-green-400 pb-2 pt-4">{title}</h3>
        <p className="text-sx text-white text-gray-400 pt-2"> {description}</p>
        <div className="flex flex-row justify-space items-center ">
          <h3 className="text-xs text-white font-bold pt-6">Created : {createdAt.split("T")[0]}</h3>
        </div>
      </div>
    </div>
    <div className="container flex flex-row justify-between mt-4">
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
