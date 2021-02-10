/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PodcastSearchInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: deletePodcastMutaion
// ====================================================

export interface deletePodcastMutaion_deletePodcast {
  __typename: "CoreOutput";
  ok: boolean;
  error: string | null;
}

export interface deletePodcastMutaion {
  deletePodcast: deletePodcastMutaion_deletePodcast;
}

export interface deletePodcastMutaionVariables {
  input: PodcastSearchInput;
}
