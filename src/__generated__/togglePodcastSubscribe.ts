/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ToggleSubscribeInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: togglePodcastSubscribe
// ====================================================

export interface togglePodcastSubscribe_toggleSubscribe {
  __typename: "ToggleSubscribeOutput";
  error: string | null;
  ok: boolean;
}

export interface togglePodcastSubscribe {
  toggleSubscribe: togglePodcastSubscribe_toggleSubscribe;
}

export interface togglePodcastSubscribeVariables {
  input: ToggleSubscribeInput;
}
