/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PodcastCategory } from "./globalTypes";

// ====================================================
// GraphQL query operation: myPodcastQuery
// ====================================================

export interface myPodcastQuery_getPodcastByUser_podcasts {
  __typename: "Podcast";
  id: number;
  createdAt: any;
  title: string;
  category: PodcastCategory;
  coverImg: string;
  description: string;
}

export interface myPodcastQuery_getPodcastByUser {
  __typename: "GetPodcastByUserOutput";
  podcasts: myPodcastQuery_getPodcastByUser_podcasts[] | null;
}

export interface myPodcastQuery {
  getPodcastByUser: myPodcastQuery_getPodcastByUser;
}
