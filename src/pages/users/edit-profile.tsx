/** @format */

import { gql, useApolloClient, useMutation } from "@apollo/client";
import React from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { FormError } from "../../components/form-error";
import { useMe } from "../../hooks/useMe";
import {
  createAccountMutation,
  createAccountMutationVariables,
} from "../../__generated__/createAccountMutation";
import { editProfile, editProfileVariables } from "../../__generated__/editProfile";
import { UserRole } from "../../__generated__/globalTypes";

const EDIT_PROFILE_MUTATION = gql`
  mutation editProfile($input: EditProfileInput!) {
    editProfile(input: $input) {
      ok
      error
    }
  }
`;

interface IFormProps {
  email?: string;
  password?: string;
}

export const EditProfile = () => {
  const { data: userData } = useMe();
  const client = useApolloClient();
  const onCompleted = (data: editProfile) => {
    const {
      editProfile: { ok },
    } = data;
    if (ok && userData) {
      const {
        me: { email: prevEmail, id },
      } = userData;
      const { email: newEmail } = getValues();
      if (prevEmail !== newEmail) {
        client.writeFragment({
          id: `User:${id}`,
          fragment: gql`
            fragment EditedUser on User {
              email
            }
          `,
          data: {
            email: newEmail,
          },
        });
      }
    }
  };
  const [editProfile, { loading }] = useMutation<editProfile, editProfileVariables>(
    EDIT_PROFILE_MUTATION,
    {
      onCompleted,
    }
  );
  const { register, handleSubmit, getValues, formState } = useForm<IFormProps>({
    mode: "onChange",
    defaultValues: {
      email: userData?.me.email,
    },
  });
  const onSubmit = () => {
    const { email, password } = getValues();
    editProfile({
      variables: {
        input: {
          email,
          ...(password !== "" && { password }),
        },
      },
    });
  };
  return (
    <div className="h-screen flex flex-col items-center justify-around bg-black">
      <Helmet>
        <title>Edit Profile | PodcastCom</title>
      </Helmet>
      <h4 className="font-semibold text-white text-2xl mb-3">Edit Profile</h4>
      <div className="flex flex-col items-end">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col md:mt-5 md:px-5 md:w-96 w-full"
        >
          <colgroup></colgroup>
          <input
            ref={register({
              pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
            name="email"
            type="email"
            placeholder="Email"
            className="bg-black text-white outline-none border-b-2 mb-3 py-3 px-5 "
          />
          <input
            ref={register}
            name="password"
            type="password"
            placeholder="Password"
            className=" bg-black text-white outline-none border-b-2 mb-3 py-3 px-5 "
          />
          <button className="py-3 px-5 bg-green-400 text-black font-bold mt-3 text-lg rounded-full focus:outline-none hover:opacity-80">
            {loading ? "Loading..." : "Save Profile"}
          </button>
        </form>
      </div>
    </div>
  );
};
