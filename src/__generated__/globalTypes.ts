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

//==============================================================
// END Enums and Input Objects
//==============================================================