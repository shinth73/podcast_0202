/** @format */

import { PODCAST_FRAGMENT } from "./../fragments";
/** @format */

import { gql, useLazyQuery, useQuery } from "@apollo/client";

export const GQL_QUERY_ME = gql`
  query QueryMe {
    me {
      id
      email
      role
      subsriptions {
        ...PodcastParts
      }
    }
  }
  ${PODCAST_FRAGMENT}
`;

export const useMe = () => {
  return useQuery(GQL_QUERY_ME);
};
