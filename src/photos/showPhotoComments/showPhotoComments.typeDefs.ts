import { gql } from "apollo-server-express";

export default gql`
    type Query {
        showPhotoComments(id: Int!): [Comment]
    }
`