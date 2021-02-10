/** @format */

import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { PODCAST_FRAGMENT } from "../fragments";

const QUERY_PODCAST = gql`
  query getPodcastQuery($input: PodcastSearchInput!) {
    getPodcast(input: $input) {
      error
      ok
      podcast {
        title
        description
        category
        coverImg
        rating
      }
    }
  }
`;

export const usePodcast = (id: string) => {
  return useQuery(QUERY_PODCAST, {
    variables: {
      input: {
        id: +id,
      },
    },
  });
};
