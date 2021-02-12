/** @format */

import { gql } from "@apollo/client";

export const PODCAST_FRAGMENT = gql`
  fragment PodcastParts on Podcast {
    id
    createdAt
    title
    category
    coverImg
    description
    rating
  }
`;

export const EPISODE_FRAGMENT = gql`
  fragment EpisodeParts on Episode {
    id
    createdAt
    title
    description
    length
  }
`;
