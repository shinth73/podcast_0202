/** @format */

import { gql, useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-dom";
import { Podcast } from "../components/podcast";
import { PODCAST_FRAGMENT } from "../fragments";
import {
  getPodcastsByCatQuery,
  getPodcastsByCatQueryVariables,
} from "../__generated__/getPodcastsByCatQuery";
import { PodcastCategory } from "../__generated__/globalTypes";

const GETPODCASTSBYCAT_QEURY = gql`
  query getPodcastsByCatQuery($input: GetPodcastByCategoryInput!) {
    getPodcastByCategory(input: $input) {
      podcasts {
        ...PodcastParts
      }
    }
  }
  ${PODCAST_FRAGMENT}
`;

interface IPodcastParams {
  category: PodcastCategory;
}

export const Category = () => {
  const params = useParams<IPodcastParams>();
  console.log(params.category);
  const { data, loading } = useQuery<getPodcastsByCatQuery, getPodcastsByCatQueryVariables>(
    GETPODCASTSBYCAT_QEURY,
    {
      variables: {
        input: {
          category: params.category,
        },
      },
    }
  );

  if (!data || loading) {
    return (
      <div className="h-screen flex justify-center items-center bg-black ">
        <span className="font-medium text-xl text-gray-100 tracking-wide">Loading...</span>
      </div>
    );
  }
  if (!loading && data?.getPodcastByCategory.podcasts?.length === 0) {
    return (
      <div className="h-screen flex justify-center items-center bg-black ">
        <span className="font-medium text-xl text-gray-100 tracking-wide">
          No Podcats Found of {params.category} Category...
        </span>
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-black border-8 border-black">
      {!loading && (
        <div className="grid bg-black lg:grid-cols-3 border-8 border-black md:grid-cols-2 gap-x-10 gap-y-10">
          {data?.getPodcastByCategory.podcasts?.map((podcast) => (
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
