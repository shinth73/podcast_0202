/** @format */

import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Podcast } from "../components/podcast";
import { PODCAST_FRAGMENT } from "../fragments";
import { podcastsQuery } from "../__generated__/podcastsQuery";

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
  const { data, loading } = useQuery<podcastsQuery>(PODCASTS_QEURY);
  console.log(data);
  if (!data || loading) {
    return (
      <div className="h-screen flex justify-center items-center bg-black ">
        <span className="font-medium text-xl text-gray-100 tracking-wide">Loading...</span>
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-black border-8 border-black">
      {!loading && (
        <div className="grid bg-black lg:grid-cols-3 border-8 border-black md:grid-cols-2 gap-x-10 gap-y-10">
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
  );
};
