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
  console.log(data);
  return (
    <div className="w-full h-full bg-black border-8 border-black">
      {!loading && (
        <>
          <div className="container mt-10">
            <h2 className="text-4xl font-medium text-yellow-300 mb-10">
              Edit your podcast & infos
            </h2>
            <Link
              to="/edit-profile"
              className=" mr-8 text-white bg-gray-800 py-3 px-10 hover:bg-gray-700"
            >
              Edit your Profile &rarr;
            </Link>
            <Link
              to="/create-podcast"
              className=" mr-8 text-white bg-gray-800 py-3 px-10 hover:bg-gray-700"
            >
              Add Podcast &rarr;
            </Link>

            <div className="mt-10">
              {data?.getPodcastByUser.podcasts?.length === 0 ? (
                <h4 className="text-xl mb-5">Please upload a podcast!</h4>
              ) : null}
            </div>
          </div>
          <div className="border-bottom bg-black border-b-2 border-green-800 border-opacity-60" />
          <div className="grid bg-black lg:grid-cols-3 border-8 border-black md:grid-cols-2 gap-x-10 gap-y-10">
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
