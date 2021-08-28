import { gql } from "apollo-server-express";

export default gql`
  type ShowFollowersResult {
    ok: Boolean!
    error: String
    followers: [User]
    totalPages: Int
  }
  type Query {
    showFollowers(username: String!, page: Int): ShowFollowersResult
  }
`;
