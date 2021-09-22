export default {
    Query: {
        showPhoto: async (_, { id }, { client }) => client.photo.findUnique({
            where: {
                id
            }
        })
    }
}