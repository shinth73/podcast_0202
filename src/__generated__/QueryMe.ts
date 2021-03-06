/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserRole, PodcastCategory } from "./globalTypes";

// ====================================================
// GraphQL query operation: QueryMe
// ====================================================

export interface QueryMe_me_subsriptions {
  __typename: "Podcast";
  id: number;
  createdAt: any;
  title: string;
  category: PodcastCategory;
  coverImg: string;
  description: string;
}

export interface QueryMe_me {
  __typename: "User";
  id: number;
  email: string;
  role: UserRole;
  subsriptions: QueryMe_me_subsriptions[];
}

export interface QueryMe {
  me: QueryMe_me;
}
