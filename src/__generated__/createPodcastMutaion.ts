/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreatePodcastInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: createPodcastMutaion
// ====================================================

export interface createPodcastMutaion_createPodcast {
  __typename: "CreatePodcastOutput";
  ok: boolean;
  error: string | null;
}

export interface createPodcastMutaion {
  createPodcast: createPodcastMutaion_createPodcast;
}

export interface createPodcastMutaionVariables {
  createPodcastInput: CreatePodcastInput;
}
