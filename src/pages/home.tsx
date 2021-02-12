/** @format */

import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Podcast } from "../components/podcast";
import { PODCAST_FRAGMENT } from "../fragments";
import { useMe } from "../hooks/useMe";
import { podcastsQuery } from "../__generated__/podcastsQuery";
import { QueryMe_me_subsriptions } from "../__generated__/QueryMe";

const PODCASTS_QEURY = gql`
  query podcastsQuery {
    getAllPodcasts {
      podcasts {
        ...PodcastParts
      }
    }
  }
  ${PODCAST_FRAGMENT}
`;

export const Home = () => {
  const { data: userData, loading: isloading } = useMe();

  const { data, loading } = useQuery<podcastsQuery>(PODCASTS_QEURY);
  if (!data || loading || isloading) {
    return (
      <div className="h-screen flex justify-center items-center bg-black ">
        <span className="font-medium text-xl text-gray-100 tracking-wide">Loading...</span>
      </div>
    );
  }

  return (
    <>
      {userData?.me.subsriptions.length == 0 ? (
        <div className="w-full flex bg-gray-800  flex-col justify-center items-center  bg-black border-4 border-opacity-50 border-yellow-700">
          <div className="text-white text-2xl font-bold mt-4 mb-4 text-yellow-700 ">
            - No Subscriptions -
          </div>
          <div className="text-white text-4xl font-bold mt-4 mb-4 text-green-700 ">
            Try Anything You Want ...
          </div>
        </div>
      ) : (
        <div>
          <div className="w-full flex flex-col bg-gray-800 justify-center items-center  bg-black border-4 border-opacity-50 border-yellow-700">
            <div className="text-white text-2xl font-bold mt-4 mb-4 text-yellow-700 ">
              - Subscription List -
            </div>
            {!loading && (
              <div className="myGrid mb-4">
                {userData?.me.subsriptions?.map((podcast: QueryMe_me_subsriptions) => (
                  <Podcast
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
            )}
          </div>
        </div>
      )}

      <div className="w-full h-screen bg-black border-8 border-black">
        {!loading && (
          <div className="myGrid">
            {data?.getAllPodcasts.podcasts?.map((podcast) => (
              <Podcast
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
        )}
      </div>
    </>
  );
};
