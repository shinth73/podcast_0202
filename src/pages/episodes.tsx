/** @format */

import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { Episode } from "../components/episode";
import { useEpisodes } from "../hooks/useEpisodes";
import ReactStars from "react-stars";
import { faMinus, faMinusCircle, faPlus, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMe } from "../hooks/useMe";
import { QueryMe_me_subsriptions } from "../__generated__/QueryMe";
interface IPodcastParams {
  id: string;
}
export const Episodes = () => {
  const { data: userData, loading: isloading } = useMe();
  const params = useParams<IPodcastParams>();
  const { data, loading, error } = useEpisodes(params.id);
  console.log(userData);
  console.log(loading, data, error);

  if (!data || loading || error || isloading) {
    return (
      <div className="h-screen flex justify-center items-center bg-black ">
        <span className="font-medium text-xl text-gray-100 tracking-wide">Loading...</span>
      </div>
    );
  }

  const ratingChanged = (newRating: number) => {
    console.log("ratingChanged");
  };

  const isSubscribe = () => {
    for (let i = 0; i < userData.me.subsriptions.length; i++) {
      userData.me.subsriptions[i].id === +params.id;
      return true;
    }
    return false;
  };

  return (
    <div className="w-full h-screen bg-black border-8 border-black">
      {!loading && (
        <>
          {data && data.getPodcast.podcast !== null ? (
            <div>
              <div className="flex flex-col justify-around items-center h-full py-3 ">
                <div className="flex flex-row mb-3 w-full justify-center ">
                  <div
                    style={{ backgroundImage: `url(${data.getPodcast.podcast.coverImg})` }}
                    className="w-36 h-36 md:w-60 md:h-60 bg-cover rounded-lg "
                  ></div>
                  <div className="ml-8 w-8/12 flex flex-col justify-center items-center">
                    <h3 className="text-3xl font-bold text-green-400 pb-4 ">
                      {data.getPodcast.podcast.title}
                    </h3>
                    <p className="text-base text-white font-bold text-white">
                      {" "}
                      {data.getPodcast.podcast.description}
                    </p>

                    {isSubscribe() ? (
                      <Link
                        to={`/subscription/${data.getPodcast.podcast.id}`}
                        className="flex flex-row mt-4 focus-within:ml-12 cursor-pointer hover:bg-gray-800 justify-center items-center mx-3 
        px-4 py-1 border-green-800 border-2 shadow-inner border-gray-400 rounded-full"
                      >
                        <FontAwesomeIcon className="text-blue-400 text-lg" icon={faMinusCircle} />
                        <div className="ml-2 text-sm text-gray-300 font-bold text-sm">
                          Unsubscribe
                        </div>
                      </Link>
                    ) : (
                      <Link
                        to={`/subscription/${data.getPodcast.podcast.id}`}
                        className="flex flex-row mt-4 focus-within:ml-12 cursor-pointer hover:bg-gray-800 justify-center items-center mx-3 
        px-4 py-1 border-green-800 border-2 shadow-inner border-gray-400 rounded-full"
                      >
                        <FontAwesomeIcon className="text-blue-400 text-lg" icon={faPlusCircle} />
                        <div className="ml-2 text-sm text-gray-300 font-bold text-sm">
                          Subscribe
                        </div>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
              <div className="text-white flex justify-center mb-5 items-center">
                Total :
                <ReactStars
                  className="mb-2 mr-8"
                  count={5}
                  edit={false}
                  value={3.5}
                  size={24}
                  color2={"#f39c12"}
                />
                You :
                <ReactStars
                  className="mb-2"
                  count={5}
                  onChange={ratingChanged}
                  size={24}
                  color2={"#ffd700"}
                />
              </div>
              <div className="border-b text-xs border-gray-400"></div>
            </div>
          ) : (
            <div />
          )}
          <div className="myGrid">
            {data?.getEpisodes.episodes?.map((episode) => (
              <Episode
                key={episode.id}
                id={episode.id}
                createdAt={episode.createdAt}
                title={episode.title}
                description={episode.description}
                length={episode.length}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
