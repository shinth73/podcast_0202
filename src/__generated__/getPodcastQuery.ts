/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PodcastSearchInput, PodcastCategory } from "./globalTypes";

// ====================================================
// GraphQL query operation: getPodcastQuery
// ====================================================

export interface getPodcastQuery_getPodcast_podcast {
  __typename: "Podcast";
  title: string;
  description: string;
  category: PodcastCategory;
  coverImg: string;
}

export interface getPodcastQuery_getPodcast {
  __typename: "PodcastOutput";
  error: string | null;
  ok: boolean;
  podcast: getPodcastQuery_getPodcast_podcast | null;
}

export interface getPodcastQuery {
  getPodcast: getPodcastQuery_getPodcast;
}

export interface getPodcastQueryVariables {
  input: PodcastSearchInput;
}
