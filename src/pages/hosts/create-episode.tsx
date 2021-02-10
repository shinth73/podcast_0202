/** @format */

import { gql, useMutation } from "@apollo/client";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import {
  createEpisodeMutaion,
  createEpisodeMutaionVariables,
} from "../../__generated__/createEpisodeMutaion";

const CREATE_EPISODE_MUTATION = gql`
  mutation createEpisodeMutaion($createEpisodeInput: CreateEpisodeInput!) {
    createEpisode(input: $createEpisodeInput) {
      ok
      error
    }
  }
`;

interface IFormProps {
  title: string;
  description: string;
  length: number;
  podcastId: number;
}

export const CreateEpisode = () => {
  const { register, getValues, watch, errors, handleSubmit, formState } = useForm<IFormProps>({
    mode: "onChange",
  });

  const history = useHistory();
  const onCompleted = (data: createEpisodeMutaion) => {
    const {
      createEpisode: { ok },
    } = data;
    if (ok) {
      history.push("/my-podcasts");
    }
  };
  const [createEpisodeMutaion, { loading, data: createEpisodeMutaionResult }] = useMutation<
    createEpisodeMutaion,
    createEpisodeMutaionVariables
  >(CREATE_EPISODE_MUTATION, {
    onCompleted,
  });

  const onSubmit = () => {
    if (!loading) {
      const { title, description, length, podcastId } = getValues();
      createEpisodeMutaion({
        variables: {
          createEpisodeInput: { title, description, length, podcastId },
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
          type="text"
          name="length"
          placeholder="Minute"
          ref={register({ required: "Cover Image is required." })}
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
