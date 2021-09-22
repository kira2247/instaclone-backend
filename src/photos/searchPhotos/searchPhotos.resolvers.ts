export default {
    Query: {
        searchPhotos: (_, {keyword}, {client}) => client.photo.findMany({
            where: {
                caption: {
                    startsWith: keyword,
                }
            }
        })
    }
}