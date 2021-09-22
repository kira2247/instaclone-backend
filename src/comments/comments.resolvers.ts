export default {
    Comment: {
        isMine: ({ userId }, _, { loggedInUser }) => {
            if (!loggedInUser) {
                return false
            }
            return loggedInUser.id === userId
        }
    }
}