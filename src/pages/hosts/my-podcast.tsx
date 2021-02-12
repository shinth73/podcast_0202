/** @format */

import { gql, useApolloClient, useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { MyPodcast } from "../../components/mypodcast";
import { PODCAST_FRAGMENT } from "../../fragments";
import { myPodcastQuery } from "../../__generated__/myPodcastQuery";

export const MYPODCASTS_QEURY = gql`
  query myPodcastQuery {
    getPodcastByUser {
      podcasts {
        ...PodcastParts
      }
    }
  }
  ${PODCAST_FRAGMENT}
`;

export const MyPodcasts = () => {
  const { data, loading } = useQuery<myPodcastQuery>(MYPODCASTS_QEURY);
  if (!data || loading) {
    return (
      <div className="h-screen flex justify-center items-center bg-black ">
        <span className="font-medium text-xl text-gray-100 tracking-wide">Loading...</span>
      </div>
    );
  }
  // console.log(data);
  return (
    <div className="w-full h-screen bg-black border-8 border-black">
      {!loading && (
        <>
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-medium text-green-300 mb-10">Edit your podcast & infos</h2>
            <div className="flex justify-around">
              <Link
                to="/edit-profile"
                className=" mr-8 text-white rounded-lg bg-gray-800 py-1 px-10 hover:bg-gray-700"
              >
                Edit your Profile
              </Link>
              <Link
                to="/create-podcast"
                className=" mr-8 text-white bg-gray-800 rounded-lg py-1 px-10 hover:bg-gray-700"
              >
                Add Podcast
              </Link>
            </div>
            <div className="mt-10">
              {data?.getPodcastByUser.podcasts?.length === 0 ? (
                <h4 className="text-xl mb-5">Please upload a podcast!</h4>
              ) : null}
            </div>
          </div>
          <div className="border-bottom bg-black border-b-2 border-green-800 border-opacity-60" />
          <div className="myGrid mb-4">
            {data?.getPodcastByUser.podcasts?.map((podcast) => (
              <MyPodcast
                key={podcast.id}
                id={podcast.id}
                createdAt={podcast.createdAt}
                coverImg={podcast.coverImg}
                title={podcast.title}
                description={podcast.description}
                category={podcast.category}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
