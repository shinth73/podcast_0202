/** @format */

import { gql, useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-dom";
import { Episode } from "../components/episode";
import { EpisodeTitle } from "../components/episodeTitle";
import { useEpisodes } from "../hooks/useEpisodes";

interface IPodcastParams {
  id: string;
}
export const Episodes = () => {
  const params = useParams<IPodcastParams>();
  const { data, loading, error } = useEpisodes(params.id);

  console.log(loading, data, error);

  if (!data || loading || error) {
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
                role={"listener"}
              />{" "}
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
