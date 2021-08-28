import { gql } from "apollo-server-express";

export default gql`
  type ShowFollowingResult {
    ok: Boolean!
    error: String
    following: [User]
  }
  type Query {
    showFollowing(username: String!, lastId: Int): ShowFollowingResult
  }
`;
