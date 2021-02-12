/** @format */

import { episodesQuery, episodesQueryVariables } from "./../__generated__/episodesQuery";
/** @format */

import { EPISODE_FRAGMENT } from "./../fragments";
import { gql, useQuery } from "@apollo/client";
import { PODCAST_FRAGMENT } from "../fragments";

export const EPISODES_QUERY = gql`
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

export const useEpisodes = (id: string) => {
  return useQuery<episodesQuery, episodesQueryVariables>(EPISODES_QUERY, {
    variables: {
      input: {
        id: +id,
      },
    },
  });
};
