/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PodcastSearchInput, PodcastCategory } from "./globalTypes";

// ====================================================
// GraphQL query operation: episodesQuery
// ====================================================

export interface episodesQuery_getPodcast_podcast {
  __typename: "Podcast";
  id: number;
  createdAt: any;
  title: string;
  category: PodcastCategory;
  coverImg: string;
  description: string;
}

export interface episodesQuery_getPodcast {
  __typename: "PodcastOutput";
  podcast: episodesQuery_getPodcast_podcast | null;
}

export interface episodesQuery_getEpisodes_episodes {
  __typename: "Episode";
  id: number;
  createdAt: any;
  title: string;
  description: string;
  length: number;
}

export interface episodesQuery_getEpisodes {
  __typename: "EpisodesOutput";
  episodes: episodesQuery_getEpisodes_episodes[] | null;
}

export interface episodesQuery {
  getPodcast: episodesQuery_getPodcast;
  getEpisodes: episodesQuery_getEpisodes;
}

export interface episodesQueryVariables {
  input: PodcastSearchInput;
}
