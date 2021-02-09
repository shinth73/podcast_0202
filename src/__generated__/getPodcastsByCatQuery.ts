/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetPodcastByCategoryInput, PodcastCategory } from "./globalTypes";

// ====================================================
// GraphQL query operation: getPodcastsByCatQuery
// ====================================================

export interface getPodcastsByCatQuery_getPodcastByCategory_podcasts {
  __typename: "Podcast";
  id: number;
  createdAt: any;
  title: string;
  category: PodcastCategory;
  coverImg: string;
  description: string;
}

export interface getPodcastsByCatQuery_getPodcastByCategory {
  __typename: "GetPodcastByCategoryOutput";
  podcasts: getPodcastsByCatQuery_getPodcastByCategory_podcasts[] | null;
}

export interface getPodcastsByCatQuery {
  getPodcastByCategory: getPodcastsByCatQuery_getPodcastByCategory;
}

export interface getPodcastsByCatQueryVariables {
  input: GetPodcastByCategoryInput;
}
