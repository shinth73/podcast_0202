/** @format */

import React from "react";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import { FormError } from "../../components/form-error";
import { loginMutation, loginMutationVariables } from "../../__generated__/loginMutation";
import { authTokenVar, isLoggedInVar } from "../../apollo";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const LOGIN_MUTATION = gql`
  mutation loginMutation($loginInput: LoginInput!) {
    login(input: $loginInput) {
      ok
      token
      error
    }
  }
`;

interface ILoginForm {
  email: string;
  password: string;
  resultError?: string;
}

export const Login = () => {
  const { register, getValues, errors, handleSubmit } = useForm<ILoginForm>();
  const onCompleted = (data: loginMutation) => {
    const {
      login: { ok, token },
    } = data;
    if (ok && token) {
      localStorage.setItem("podcast-token", token);
      authTokenVar(token);
      isLoggedInVar(true);
    }
  };
  const [loginMutation, { data: loginMutationResult, loading }] = useMutation<
    loginMutation,
    loginMutationVariables
  >(LOGIN_MUTATION, {
    onCompleted,
  });

  const onSubmit = () => {
    if (!loading) {
      const { email, password } = getValues();
      loginMutation({
        variables: {
          loginInput: {
            email,
            password,
          },
        },
      });
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-around  bg-black">
      <Helmet>
        <title>Sign In | PodcastCom</title>
      </Helmet>
      <h3 className="md:text-5xl text-3xl font-extrabold text-green-400 mx-5">
        A New Season of the Podcast
      </h3>
      <div className="flex flex-col items-end ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col md:mt-5 md:px-5 md:w-96 w-full"
        >
          <input
            ref={register({
              required: "Email is required",
              pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
            name="email"
            required
            type="email"
            placeholder="Email"
            className=" bg-black text-white outline-none border-b-2 mb-3 py-3 px-5 "
          />
          {errors.email?.message && <FormError errorMessage={errors.email?.message} />}
          {errors.email?.type === "pattern" && (
            <FormError errorMessage={"Please enter a valid email"} />
          )}
          <input
            ref={register({ required: "Password is required", minLength: 5 })}
            required
            name="password"
            type="password"
            placeholder="Password"
            className=" bg-black shadow-inner text-white outline-none placeholder-gray-100 placeholder-opacity-75  border-b-2 mb-3 py-3 px-5 "
          />
          {errors.password?.message && <FormError errorMessage={errors.password?.message} />}
          {errors.password?.type === "minLength" && (
            <FormError errorMessage="Password must be more than 10 chars." />
          )}
          <button className="py-3 px-5 bg-green-400 text-black font-bold mt-3 text-lg rounded-full focus:outline-none hover:opacity-80">
            {loading ? "Loading..." : "Sign In"}
          </button>
          {loginMutationResult?.login.error && (
            <FormError errorMessage={loginMutationResult.login.error} />
          )}
        </form>
        <div className="mt-2 mr-5">
          <Link to="/create-account" className="hover:underline text-sm text-green-300">
            Create an Account
          </Link>
        </div>
      </div>
    </div>
  );
};
