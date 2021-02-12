/** @format */

import { gql, useLazyQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useHistory, useLocation } from "react-router-dom";
import { Podcast } from "../components/podcast";
import { PODCAST_FRAGMENT } from "../fragments";
import { searchPodcasts, searchPodcastsVariables } from "../__generated__/searchPodcasts";

const SEARCH_RESTAURANT = gql`
  query searchPodcasts($input: SearchPodcastsInput!) {
    searchPodcasts(input: $input) {
      ok
      error
      totalPages
      totalCount
      podcasts {
        ...PodcastParts
      }
    }
  }
  ${PODCAST_FRAGMENT}
`;

export const Search = () => {
  const location = useLocation();
  const history = useHistory();
  const [callQuery, { loading, data, called }] = useLazyQuery<
    searchPodcasts,
    searchPodcastsVariables
  >(SEARCH_RESTAURANT);
  useEffect(() => {
    const [_, titleQuery] = location.search.split("?term=");
    if (!titleQuery) {
      return history.replace("/");
    }
    callQuery({
      variables: {
        input: {
          page: 1,
          titleQuery,
        },
      },
    });
  }, [history, location]);
  console.log(loading, data, called);
  if (!data || loading) {
    return (
      <div className="h-screen flex justify-center items-center bg-black ">
        <span className="font-medium text-xl text-gray-100 tracking-wide">Loading...</span>
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-black border-8 border-black">
      <Helmet>
        <title>Search | PodcastCom</title>
      </Helmet>
      {!loading && (
        <div className="myGrid">
          {data?.searchPodcasts.podcasts?.map((podcast) => (
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
