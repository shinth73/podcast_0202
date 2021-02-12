/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EpisodesSearchInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: deleteEpisodeMutaion
// ====================================================

export interface deleteEpisodeMutaion_deleteEpisode {
  __typename: "CoreOutput";
  ok: boolean;
  error: string | null;
}

export interface deleteEpisodeMutaion {
  deleteEpisode: deleteEpisodeMutaion_deleteEpisode;
}

export interface deleteEpisodeMutaionVariables {
  input: EpisodesSearchInput;
}
