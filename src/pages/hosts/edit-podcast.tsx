/** @format */

import { gql, useApolloClient, useMutation } from "@apollo/client";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import { usePodcast } from "../../hooks/usePodcast";
import { PodcastCategory } from "../../__generated__/globalTypes";
import {
  updatePodcastMutation,
  updatePodcastMutationVariables,
} from "../../__generated__/updatePodcastMutation";
import { MYPODCASTS_QEURY } from "./my-podcast";

export const UPDATE_PODCAST_MUTATION = gql`
  mutation updatePodcastMutation($updatePodcastInput: UpdatePodcastInput!) {
    updatePodcast(input: $updatePodcastInput) {
      ok
      error
    }
  }
`;

interface IPodcastParams {
  id: string;
}

interface IFormProps {
  title: string;
  category: PodcastCategory;
  coverImg: string;
  description: string;
}

export const EditPodcast = () => {
  const client = useApolloClient();
  const history = useHistory();
  const params = useParams<IPodcastParams>();
  console.log(params.id);

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

  const onCompleted = (data: updatePodcastMutation) => {
    const {
      updatePodcast: { ok },
    } = data;
    if (ok) {
      history.push("/my-podcasts");
    }
  };

  const [updatePodcastMutation, { loading, data: updatePodcastMutationResult }] = useMutation<
    updatePodcastMutation,
    updatePodcastMutationVariables
  >(UPDATE_PODCAST_MUTATION, {
    onCompleted,
    refetchQueries: [
      {
        query: MYPODCASTS_QEURY,
      },
    ],
  });

  const onSubmit = () => {
    if (!loading) {
      console.log("onSubmit");
      const { title, category, coverImg, description } = getValues();
      updatePodcastMutation({
        variables: {
          updatePodcastInput: {
            id: +params.id,
            payload: {
              title,
              category,
              coverImg,
              description,
              // rating: data.rating,
            },
          },
        },
      });
    }
  };

  return (
    <div className="h-screen flex flex-col items-center mx-5">
      <Helmet>
        <title>Edit Podcast | Podcastcom</title>
      </Helmet>
      {!loading && (
        <>
          <h4 className="font-semibold text-white text-2xl mt-6">Add Podcast</h4>
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
            <div className="text-white">Select A Category</div>
            <select
              name="category"
              ref={register({ required: true })}
              className=" bg-black text-white outline-none border-b-2 mb-3 py-3 px-5 mx-3"
            >
              {Object.keys(PodcastCategory).map((category, index) => (
                <option key={index}>{category}</option>
              ))}
            </select>
            <div className="border-bottom bg-black border-b-2 border-green-800 border-opacity-60" />
            <br />
            <div className="text-white">Add Cover Image URL</div>
            <input
              className="input bg-gray-300"
              type="text"
              name="coverImg"
              placeholder="http://"
              ref={register({ required: "Cover Image is required." })}
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
            <button className="py-3 px-5 bg-green-400 text-black font-bold mt-3 text-lg rounded-full focus:outline-none hover:opacity-80">
              {loading ? "Loading..." : "Update Podcast"}
            </button>
            {/* {data?.createRestaurant?.error && <FormError errorMessage={data.createRestaurant.error} />} */}
          </form>
        </>
      )}
    </div>
  );
};
