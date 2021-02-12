/** @format */

import { gql, useApolloClient, useMutation } from "@apollo/client";
import { Helmet } from "react-helmet-async";
import { useHistory, useParams } from "react-router-dom";
import { EPISODES_QUERY } from "../../hooks/useEpisodes";
import {
  deleteEpisodeMutaion,
  deleteEpisodeMutaionVariables,
} from "../../__generated__/deleteEpisodeMutaion";

interface IPodcastParams {
  podcastId: string;
  episodeId: string;
}

const DELETE_EPISODE_MUTATION = gql`
  mutation deleteEpisodeMutaion($input: EpisodesSearchInput!) {
    deleteEpisode(input: $input) {
      ok
      error
    }
  }
`;

export const DeleteEpisode = () => {
  const client = useApolloClient();
  const history = useHistory();
  const params = useParams<IPodcastParams>();

  console.log(params);
  const onCompleted = (data: deleteEpisodeMutaion) => {
    const {
      deleteEpisode: { ok },
    } = data;
    if (ok) {
      //   const queryResult = client.readQuery({ query: MY_QEURY });
      //   let today = new Date();
      //   today.toLocaleDateString();
      //   client.writeQuery({
      //     query: MYPODCASTS_QEURY,
      //     data: {
      //       getPodcastByUser: {
      //         ...queryResult.getPodcastByUser,
      //         podcasts: queryResult.getPodcastByUser.podcasts.filter(
      //           (pod: any) => pod.id != params.id
      //         ),
      //       },
      //     },
      //   });
      console.log("ok");
      history.push(`/my-podcast/${params.podcastId}`);
    }
  };

  const [deleteEpisodeMutate, { loading, data: deleteEpisodeMutaionResult }] = useMutation<
    deleteEpisodeMutaion,
    deleteEpisodeMutaionVariables
  >(DELETE_EPISODE_MUTATION, {
    onCompleted,
    refetchQueries: [
      {
        query: EPISODES_QUERY,
        variables: {
          input: {
            id: +params.podcastId,
          },
        },
      },
    ],
  });

  console.log("delete");
  deleteEpisodeMutate({
    variables: {
      input: {
        podcastId: +params.podcastId,
        episodeId: +params.episodeId,
      },
    },
  });

  return (
    <div className="h-screen flex justify-center items-center">
      <span className="font-medium text-xl text-white tracking-wide">Deleting...</span>
    </div>
  );
};
