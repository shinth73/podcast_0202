/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum PodcastCategory {
  Health = "Health",
  Movie = "Movie",
  Music = "Music",
  News = "News",
  Sports = "Sports",
}

export enum UserRole {
  Host = "Host",
  Listener = "Listener",
}

export interface CreateAccountInput {
  email?: string | null;
  password?: string | null;
  role?: UserRole | null;
}

export interface CreateEpisodeInput {
  title: string;
  description: string;
  length: number;
  podcastId: number;
}

export interface CreatePodcastInput {
  title: string;
  category: PodcastCategory;
  coverImg: string;
  description: string;
}

export interface EditProfileInput {
  email?: string | null;
  password?: string | null;
}

export interface EpisodesSearchInput {
  podcastId: number;
  episodeId: number;
}

export interface GetPodcastByCategoryInput {
  category: PodcastCategory;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface PodcastSearchInput {
  id: number;
}

export interface SearchPodcastsInput {
  page?: number | null;
  titleQuery: string;
}

export interface ToggleSubscribeInput {
  podcastId: number;
}

export interface UpdateEpisodeInput {
  podcastId: number;
  episodeId: number;
  title?: string | null;
  description: string;
  length: number;
}

export interface UpdatePodcastInput {
  id: number;
  payload: UpdatePodcastPayload;
}

export interface UpdatePodcastPayload {
  title?: string | null;
  category?: PodcastCategory | null;
  rating?: number | null;
  coverImg?: string | null;
  description?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
