/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SearchPodcastsInput, PodcastCategory } from "./globalTypes";

// ====================================================
// GraphQL query operation: searchPodcasts
// ====================================================

export interface searchPodcasts_searchPodcasts_podcasts {
  __typename: "Podcast";
  id: number;
  createdAt: any;
  title: string;
  category: PodcastCategory;
  coverImg: string;
  description: string;
}

export interface searchPodcasts_searchPodcasts {
  __typename: "SearchPodcastsOutput";
  ok: boolean;
  error: string | null;
  totalPages: number | null;
  totalCount: number | null;
  podcasts: searchPodcasts_searchPodcasts_podcasts[] | null;
}

export interface searchPodcasts {
  searchPodcasts: searchPodcasts_searchPodcasts;
}

export interface searchPodcastsVariables {
  input: SearchPodcastsInput;
}
