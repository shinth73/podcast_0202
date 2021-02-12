/** @format */

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-stars";
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
    <div className="flex flex-col w-full h-full py-3 border-b text-xs border-gray-400 hover:bg-gray-900">
      <div className="md:w-full md:h-full grid gap-5 grid-cols-2 md:grid-cols-1">
        <div
          style={{ backgroundImage: `url(${coverImg})` }}
          className="w-full h-full md:h-60  ml-2 md:ml-0 bg-cover group-hover:bg-gray-100 rounded-lg"
        ></div>
        <div className="flex flex-col justify-between mx-2">
          <h3 className="text-base font-bold text-green-400 pb-2 ">{title}</h3>
          <p className="text-sx text-white text-gray-400 pt-2"> {description}</p>
          <ReactStars className="mt-4" count={5} edit={false} value={3.5} color2={"#f39c12"} />
          <h3 className="text-xs text-white font-bold ">Created : {createdAt.split("T")[0]}</h3>
        </div>
      </div>
    </div>
  </Link>
);
