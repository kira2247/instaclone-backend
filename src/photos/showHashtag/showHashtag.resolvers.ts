export default {
    Query: {
        showHashtag: (_, { hashtag }, { client }) =>
            client.hashTag.findUnique({
                where: {
                    hashtag
                }
            })

    }
}