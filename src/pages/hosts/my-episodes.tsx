/** @format */

import { gql, useQuery } from "@apollo/client";
import React from "react";
import { Link, useParams } from "react-router-dom";
import { MyEpisode } from "../../components/myEpisode";
import { EpisodeTitle } from "../../components/episodeTitle";
import { useEpisodes } from "../../hooks/useEpisodes";

interface IPodcastParams {
  id: string;
}

export const MyEpisodes = () => {
  const params = useParams<IPodcastParams>();
  const { data, loading, error } = useEpisodes(params.id);
  let podcastId = params.id;

  console.log(loading, data, error);

  if (!data || loading || error) {
    return (
      <div className="h-screen flex justify-center items-center bg-black ">
        <span className="font-medium text-xl text-gray-100 tracking-wide">Loading...</span>
      </div>
    );
  }

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
                role={"host"}
              />{" "}
            </div>
          ) : (
            <div />
          )}
          <div className="container mt-10">
            <h2 className="text-2xl font-medium text-green-300 mb-10">Add / Edit your Episode</h2>
            <Link
              to={`/my-podcast/${podcastId}/create-episode`}
              className=" mr-8 text-white rounded-lg bg-gray-800 py-1 px-10 hover:bg-gray-700"
            >
              Add Episode
            </Link>
            <div className="mt-5">
              {data?.getEpisodes.episodes?.length === 0 ? (
                <h4 className="text-xl mb-5">Please upload a episode!</h4>
              ) : null}
            </div>
          </div>
          <div className="border-bottom bg-black border-b-2 border-green-800 border-opacity-60" />
          <div className="myGrid">
            {data?.getEpisodes.episodes?.map((episode) => (
              <MyEpisode
                key={episode.id}
                id={episode.id}
                podcastId={+podcastId}
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
