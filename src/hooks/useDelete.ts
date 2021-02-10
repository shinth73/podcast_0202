/** @format */

import { gql, useMutation } from "@apollo/client";
import {
  deletePodcastMutaion,
  deletePodcastMutaionVariables,
} from "../__generated__/deletePodcastMutaion";

const DELETE_PODCAST_MUTATION = gql`
  mutation deletePodcastMutaion($input: PodcastSearchInput!) {
    deletePodcast(input: $input) {
      ok
      error
    }
  }
`;

const [deletePodcastMutate, { loading, data: deletePodcastMutaionResult }] = useMutation<
  deletePodcastMutaion,
  deletePodcastMutaionVariables
>(DELETE_PODCAST_MUTATION);

export const useDelete = (id: number) => {
  return deletePodcastMutate({
    variables: {
      input: {
        id: id,
      },
    },
  });
};
