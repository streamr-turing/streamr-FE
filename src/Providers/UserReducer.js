export const USER_INTIAL_STATE = {
    currentUser: {
        "id": 2,
        "username": "Hank",
        "avatarUrl": "https://i.natgeofe.com/n/4f5aaece-3300-41a4-b2a8-ed2708a0a27c/domestic-dog_thumb_3x2.jpg",
        "watchlist": [
            {
                "tmbdId": 10,
                "title": "Best dang show",
                "releaseYear": 2022,
                "thumbnailUrl": "https://media.gq.com/photos/5df5a3794e7a380009b83bbd/16:9/w_2560%2Cc_limit/BestShows.jpg"
            }
        ],
        "recommendations": [
            {
                "id": 10,
                "recommendeeId": 3,
                "recommender": {
                    "id": 5,
                    "username": "Hanke",
                    "avatarUrl": "https://i.natgeofe.com/n/4f5aaece-3300-41a4-b2a8-ed2708a0a27c/domestic-dog_thumb_3x2.jpg"
                },
                "show": {
                    "tmbdId": 10,
                    "title": "Best dang show",
                    "releaseYear": 2022,
                    "rating": 8,
                    "genres": [
                        "Dramady"
                    ],
                    "thumbnailUrl": "https://media.gq.com/photos/5df5a3794e7a380009b83bbd/16:9/w_2560%2Cc_limit/BestShows.jpg"
                },
                "createdAt": "2023-02-01T22:20:58Z"
            }
        ]
    }
}

const userReducer = (state, action) => {
    switch(action.type) {
        default:
            return state
    }
}

export default userReducer