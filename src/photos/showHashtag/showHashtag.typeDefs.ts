import { gql } from "apollo-server";

export default gql`
    type Query {
        showHashtag(hashtag: String!): Hashtag
    }
`