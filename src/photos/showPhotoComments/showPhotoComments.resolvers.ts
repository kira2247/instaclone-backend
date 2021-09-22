export default {
    Query: {
        showPhotoComments: (_, { id }, { client }) => {
            return client.comment.findMany({
                where: {
                    photoId: id
                },
                orderBy: {
                    createdAt: "asc"
                }
            })
        }
    }
}