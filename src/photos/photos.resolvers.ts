import client from "../client";

export default {
    Photo: {
        user: ({ userId }) => {
            return client.user.findUnique({ where: { id: userId } });
        },
        hashtags: ({ id }, { client }) => client.hashTag.findMany({
            where: {
                photos: {
                    some: {
                        id
                    }
                }
            }
        }),
        likes: ({ id }) => client.like.count({ where: { photoId: id } }),
        comments: ({ id }) => client.comment.count({ where: { photoId: id } }),
        isMine: ({ userId }, _, { loggedInUser }) => {
            if (!loggedInUser) {
                return false
            }
            return loggedInUser.id === userId
        }
    },
    Hashtag: {
        photos: ({ id }, { page }, { loggedInUser }) => {
            return client.hashTag.findUnique({
                where: {
                    id
                }
            }).photos();
        },
        totalPhotos: ({ id }) => client.photo.count({
            where: {
                hashtags: {
                    some: {
                        id
                    }
                }
            }
        })
    },

}
