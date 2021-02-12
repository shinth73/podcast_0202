/** @format */

import { gql, useApolloClient, useMutation } from "@apollo/client";
import { useHistory, useParams } from "react-router-dom";
import { EPISODES_QUERY } from "../../hooks/useEpisodes";
import { GQL_QUERY_ME } from "../../hooks/useMe";
import {
  togglePodcastSubscribe,
  togglePodcastSubscribeVariables,
} from "../../__generated__/togglePodcastSubscribe";
import { updateEpisodeMutation } from "../../__generated__/updateEpisodeMutation";

const MUTATION_TOGGLE_SUBS = gql`
  mutation togglePodcastSubscribe($input: ToggleSubscribeInput!) {
    toggleSubscribe(input: $input) {
      error
      ok
    }
  }
`;

interface IPodcastParams {
  id: string;
}

export const Subscription = () => {
  const client = useApolloClient();
  const history = useHistory();
  const params = useParams<IPodcastParams>();

  const onCompleted = (data: togglePodcastSubscribe) => {
    console.log(data);
    const {
      toggleSubscribe: { ok },
    } = data;
    if (ok) {
      console.log("ok");
      history.push(`/podcast/${params.id}`);
    }
  };

  const [togglePodcastSubscribe, { data: toggleSubscribeResult }] = useMutation<
    togglePodcastSubscribe,
    togglePodcastSubscribeVariables
  >(MUTATION_TOGGLE_SUBS, {
    onCompleted,
    refetchQueries: [
      {
        query: GQL_QUERY_ME,
      },
    ],
  });

  togglePodcastSubscribe({
    variables: {
      input: {
        podcastId: +params.id,
      },
    },
  });

  return (
    <div className="h-screen flex justify-center items-center bg-black ">
      <span className="font-medium text-xl text-gray-100 tracking-wide">Processing...</span>
    </div>
  );
};
