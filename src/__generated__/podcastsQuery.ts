/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PodcastCategory } from "./globalTypes";

// ====================================================
// GraphQL query operation: podcastsQuery
// ====================================================

export interface podcastsQuery_getAllPodcasts_podcasts {
  __typename: "Podcast";
  id: number;
  createdAt: any;
  title: string;
  category: PodcastCategory;
  coverImg: string;
  description: string;
}

export interface podcastsQuery_getAllPodcasts {
  __typename: "GetAllPodcastsOutput";
  podcasts: podcastsQuery_getAllPodcasts_podcasts[] | null;
}

export interface podcastsQuery {
  getAllPodcasts: podcastsQuery_getAllPodcasts;
}
