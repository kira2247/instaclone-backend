export const processHashtags = (caption) => {
    const hashTags = caption.match(/#[\w]+/g) || [];

    return hashTags.map(hashtag => ({
        create: { hashtag },
        where: { hashtag },
    }))

}