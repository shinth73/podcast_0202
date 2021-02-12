/** @format */

import { gql, useApolloClient, useMutation } from "@apollo/client";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import { EPISODES_QUERY } from "../../hooks/useEpisodes";
import {
  createEpisodeMutaion,
  createEpisodeMutaionVariables,
} from "../../__generated__/createEpisodeMutaion";

const CREATE_EPISODE_MUTATION = gql`
  mutation createEpisodeMutaion($createEpisodeInput: CreateEpisodeInput!) {
    createEpisode(input: $createEpisodeInput) {
      ok
      error
      id
    }
  }
`;

interface IFormProps {
  title: string;
  description: string;
  length: number;
  podcastId: number;
}
interface IPodcastParams {
  id: string;
}

export const CreateEpisode = () => {
  const client = useApolloClient();
  const params = useParams<IPodcastParams>();
  const history = useHistory();
  let podcastId = params.id;

  const { register, getValues, watch, errors, handleSubmit, formState } = useForm<IFormProps>({
    mode: "onChange",
    defaultValues: {
      podcastId: +podcastId,
    },
  });

  const onCompleted = (data: createEpisodeMutaion) => {
    const {
      createEpisode: { ok, id },
    } = data;

    if (ok) {
      // const { title, description, length } = getValues();
      // const queryResult = client.readQuery({ query: EPISODES_QUERY });
      // console.log(queryResult);
      // let today = new Date();
      // today.toLocaleDateString();
      // client.writeQuery({
      //   query: EPISODES_QUERY,
      //   variables: {
      //     input: {
      //       id: +podcastId,
      //     },
      //   },
      //   data: {
      //     getEpisodes: {
      //       ...queryResult.getEpisodes,
      //       episodes: [
      //         {
      //           createdAt: today,
      //           description,
      //           id,
      //           length,
      //           title,
      //           __typename: "Episode",
      //         },
      //         ...queryResult.getEpisodes.episodes,
      //       ],
      //     },
      //     ...queryResult.getPodcast,
      //     getPodcast: {
      //       ...queryResult.getPodcast,
      //       ...queryResult.getPodcast.podcast,
      //     },
      //   },
      // });

      history.push(`/my-podcast/${podcastId}`);
    }
  };

  const [createEpisodeMutaion, { loading, data: createEpisodeMutaionResult }] = useMutation<
    createEpisodeMutaion,
    createEpisodeMutaionVariables
  >(CREATE_EPISODE_MUTATION, {
    onCompleted,
    refetchQueries: [
      {
        query: EPISODES_QUERY,
        variables: {
          input: {
            id: +podcastId,
          },
        },
      },
    ],
  });

  const onSubmit = () => {
    if (!loading) {
      const { title, description, length } = getValues();
      console.log(podcastId);
      createEpisodeMutaion({
        variables: {
          createEpisodeInput: { title, description, length: +length, podcastId: +podcastId },
        },
      });
    }
  };

  return (
    <div className="h-screen flex flex-col items-center mx-5">
      <Helmet>
        <title>Create Episode | Podcastcom</title>
      </Helmet>
      <h4 className="font-semibold text-white text-2xl mt-6">Add Episode</h4>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid max-w-screen-sm gap-3 mt-5 w-full mb-5"
      >
        <div className="text-white">Title</div>
        <input
          className="input bg-gray-300"
          type="text"
          name="title"
          placeholder="Title"
          ref={register({ required: "Title is required." })}
        />
        <div className="border-bottom bg-black border-b-2 border-green-800 border-opacity-60" />
        <br />
        <div className="text-white">Write Discription</div>
        <textarea
          className="input bg-gray-300 h-60"
          name="description"
          placeholder="Description"
          ref={register({ required: "Description is required." })}
        />
        <div className="border-bottom bg-black border-b-2 border-green-800 border-opacity-60" />
        <br />
        <div className="text-white">Content Length</div>
        <input
          className="input bg-gray-300"
          type="number"
          name="length"
          placeholder="Minute"
          ref={register({ required: "Length is required." })}
        />
        <div className="border-bottom bg-black border-b-2 border-green-800 border-opacity-60" />
        <button className="py-3 px-5 bg-green-400 text-black font-bold mt-3 text-lg rounded-full focus:outline-none hover:opacity-80">
          {loading ? "Loading..." : "Add Episode"}
        </button>
        {/* {data?.createEpisodeMutaion?.error && (
          <FormError errorMessage={data.createRestaurant.error} />
        )} */}
      </form>
    </div>
  );
};
