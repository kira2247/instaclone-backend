import { gql } from "apollo-server";

export default gql`
    type Query {
        showPhoto(id: Int!): Photo
    }
`