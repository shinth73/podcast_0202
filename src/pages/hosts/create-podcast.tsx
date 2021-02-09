/** @format */

import { gql, useMutation } from "@apollo/client";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { FormError } from "../../components/form-error";
import {
  createPodcastMutaion,
  createPodcastMutaionVariables,
} from "../../__generated__/createPodcastMutaion";
import { PodcastCategory } from "../../__generated__/globalTypes";

const CREATE_PODCAST_MUTATION = gql`
  mutation createPodcastMutaion($createPodcastInput: CreatePodcastInput!) {
    createPodcast(input: $createPodcastInput) {
      ok
      error
    }
  }
`;

interface IFormProps {
  title: string;
  category: PodcastCategory;
  coverImg: string;
  description: string;
}

export const CreatePodcast = () => {
  const { register, getValues, watch, errors, handleSubmit, formState } = useForm<IFormProps>({
    mode: "onChange",
    defaultValues: {
      category: PodcastCategory.News,
    },
  });

  const history = useHistory();
  const onCompleted = (data: createPodcastMutaion) => {
    const {
      createPodcast: { ok },
    } = data;
    if (ok) {
      history.push("/login");
    }
  };
  const [createPodcastMutaion, { loading, data: createPodcastMutaionResult }] = useMutation<
    createPodcastMutaion,
    createPodcastMutaionVariables
  >(CREATE_PODCAST_MUTATION, {
    onCompleted,
  });

  const onSubmit = () => {
    if (!loading) {
      const { title, category, coverImg, description } = getValues();
      createPodcastMutaion({
        variables: {
          createPodcastInput: { title, category, coverImg, description },
        },
      });
    }
  };

  return (
    <div className="h-screen flex flex-col items-center">
      <Helmet>
        <title>Create Podcast | Podcastcom</title>
      </Helmet>
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
          className=" bg-black text-white outline-none border-b-2 mb-3 py-3 px-5 "
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
          {loading ? "Loading..." : "Add Podcast"}
        </button>
        {/* {data?.createRestaurant?.error && <FormError errorMessage={data.createRestaurant.error} />} */}
      </form>
    </div>
  );
};
