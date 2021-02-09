/** @format */

import { gql, useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-dom";
import { Episode } from "../components/episode";
import { EpisodeTitle } from "../components/episodeTitle";
import { Podcast } from "../components/podcast";
import { EPISODE_FRAGMENT, PODCAST_FRAGMENT } from "../fragments";
import { episodesQuery, episodesQueryVariables } from "../__generated__/episodesQuery";

const EPISODES_QEURY = gql`
  query episodesQuery($input: PodcastSearchInput!) {
    getPodcast(input: $input) {
      podcast {
        ...PodcastParts
      }
    }
    getEpisodes(input: $input) {
      episodes {
        ...EpisodeParts
      }
    }
  }
  ${EPISODE_FRAGMENT}
  ${PODCAST_FRAGMENT}
`;
interface IPodcastParams {
  id: string;
}

export const Episodes = () => {
  const params = useParams<IPodcastParams>();
  const { data, loading } = useQuery<episodesQuery, episodesQueryVariables>(EPISODES_QEURY, {
    variables: {
      input: {
        id: +params.id,
      },
    },
  });
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
        <>
          {data && data.getPodcast.podcast !== null ? (
            <div>
              <EpisodeTitle
                key={data.getPodcast.podcast.id}
                id={data.getPodcast.podcast.id}
                createdAt={data.getPodcast.podcast.createdAt}
                coverImg={data.getPodcast.podcast.coverImg}
                title={data.getPodcast.podcast.title}
                description={data.getPodcast.podcast.description}
                category={data.getPodcast.podcast.category}
              />{" "}
            </div>
          ) : (
            <div />
          )}
          <div className="grid bg-black lg:grid-cols-3 border-8 border-black md:grid-cols-2 gap-x-10 gap-y-10">
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
