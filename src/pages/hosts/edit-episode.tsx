/** @format */

import { gql, useApolloClient, useMutation } from "@apollo/client";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import { EPISODES_QUERY } from "../../hooks/useEpisodes";
import {
  updateEpisodeMutation,
  updateEpisodeMutationVariables,
} from "../../__generated__/updateEpisodeMutation";

const UPDATE_EPISODE_MUTATION = gql`
  mutation updateEpisodeMutation($updateEpisodeInput: UpdateEpisodeInput!) {
    updateEpisode(input: $updateEpisodeInput) {
      ok
      error
    }
  }
`;

interface IPodcastParams {
  podcastId: string;
  episodeId: string;
}

interface IFormProps {
  title: string;
  description: string;
  length: number;
}

export const EditEpisode = () => {
  const client = useApolloClient();
  const history = useHistory();
  const params = useParams<IPodcastParams>();
  //   console.log(params);

  // const { loading: isloading, data, error } = usePodcast(params.id);

  // console.log(isloading, data, error);
  // if (!data || isloading || error) {
  //   console.log("return");
  //   return (
  //     <div className="h-screen flex justify-center items-center">
  //       <span className="font-medium text-xl tracking-wide">Loading...</span>
  //     </div>
  //   );
  // }

  const { register, getValues, formState, handleSubmit } = useForm<IFormProps>({
    mode: "onChange",
    // defaultValues: {
    //   title: data.getPodcast.podcast.title,
    //   category: data.getPodcast.podcast.category,
    //   coverImg: data.getPodcast.podcast.coverImg,
    //   description: data.getPodcast.podcast.description,
    // },
  });

  const onCompleted = (data: updateEpisodeMutation) => {
    console.log(data);
    const {
      updateEpisode: { ok },
    } = data;
    if (ok) {
      console.log("ok");
      history.push(`/my-podcast/${params.podcastId}`);
    }
  };

  const [updateEpisodeMutation, { loading, data: updateEpisodeMutationResult }] = useMutation<
    updateEpisodeMutation,
    updateEpisodeMutationVariables
  >(UPDATE_EPISODE_MUTATION, {
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

  const onSubmit = () => {
    if (!loading) {
      //   console.log("onSubmit");
      const { title, description, length } = getValues();
      updateEpisodeMutation({
        variables: {
          updateEpisodeInput: {
            podcastId: +params.podcastId,
            episodeId: +params.episodeId,
            title,
            description,
            length: +length,
          },
        },
      });
    }
  };

  return (
    <div className="h-screen flex flex-col items-center mx-5">
      <Helmet>
        <title>Edit Episode | Podcastcom</title>
      </Helmet>
      {!loading && (
        <>
          <h4 className="font-semibold text-white text-2xl mt-6">Update Episode</h4>
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
            <br />
            <div className="text-white">Length</div>
            <input
              className="input bg-gray-300"
              type="number"
              name="length"
              placeholder="MIN"
              ref={register({ required: "Title is required." })}
            />
            <button className="py-3 px-5 bg-green-400 text-black font-bold mt-3 text-lg rounded-full focus:outline-none hover:opacity-80">
              {loading ? "Loading..." : "Update Episode"}
            </button>
            {/* {data?.createRestaurant?.error && <FormError errorMessage={data.createRestaurant.error} />} */}
          </form>
        </>
      )}
    </div>
  );
};
