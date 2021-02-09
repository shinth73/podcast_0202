/** @format */

import { gql, useQuery } from "@apollo/client";
import React from "react";
import { MyPodcast } from "../../components/mypodcast";
import { PODCAST_FRAGMENT } from "../../fragments";
import { myPodcastQuery } from "../../__generated__/myPodcastQuery";

const MYPODCASTS_QEURY = gql`
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
    <div className="w-full h-screen bg-black border-8 border-black">
      {!loading && (
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
      )}
    </div>
  );
};
