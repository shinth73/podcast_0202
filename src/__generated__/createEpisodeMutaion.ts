/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateEpisodeInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: createEpisodeMutaion
// ====================================================

export interface createEpisodeMutaion_createEpisode {
  __typename: "CreateEpisodeOutput";
  ok: boolean;
  error: string | null;
  id: number | null;
}

export interface createEpisodeMutaion {
  createEpisode: createEpisodeMutaion_createEpisode;
}

export interface createEpisodeMutaionVariables {
  createEpisodeInput: CreateEpisodeInput;
}
