/** @format */

import { gql, useApolloClient, useMutation } from "@apollo/client";
import { Helmet } from "react-helmet-async";
import { useHistory, useParams } from "react-router-dom";
import {
  deletePodcastMutaion,
  deletePodcastMutaionVariables,
} from "../../__generated__/deletePodcastMutaion";
import { MYPODCASTS_QEURY } from "./my-podcast";

interface IPodcastParams {
  id: string;
}

const DELETE_PODCAST_MUTATION = gql`
  mutation deletePodcastMutaion($input: PodcastSearchInput!) {
    deletePodcast(input: $input) {
      ok
      error
    }
  }
`;

export const DeletePodcast = () => {
  const client = useApolloClient();
  const history = useHistory();
  const params = useParams<IPodcastParams>();

  const onCompleted = (data: deletePodcastMutaion) => {
    const {
      deletePodcast: { ok },
    } = data;
    if (ok) {
      const queryResult = client.readQuery({ query: MYPODCASTS_QEURY });
      let today = new Date();
      today.toLocaleDateString();
      client.writeQuery({
        query: MYPODCASTS_QEURY,
        data: {
          getPodcastByUser: {
            ...queryResult.getPodcastByUser,
            podcasts: queryResult.getPodcastByUser.podcasts.filter(
              (pod: any) => pod.id != params.id
            ),
          },
        },
      });
      history.push("/my-podcasts");
    }
  };

  const [deletePodcastMutate, { loading, data: deletePodcastMutaionResult }] = useMutation<
    deletePodcastMutaion,
    deletePodcastMutaionVariables
  >(DELETE_PODCAST_MUTATION, {
    onCompleted,
  });

  console.log("delete");
  deletePodcastMutate({
    variables: {
      input: {
        id: +params.id,
      },
    },
  });

  return (
    <div className="h-screen flex justify-center items-center">
      <span className="font-medium text-xl text-white tracking-wide">Deleting...</span>
    </div>
  );
};
