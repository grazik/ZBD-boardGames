const queries = {
    validateUser(id, pwd) {
        return {
            query: `{validate(id:"${id}", pwd: "${pwd}") {
                USER_ID
                EMPLOYEE
            }}`,
        };
    },

    getUserData() {
        return {
            query: `query getUserData($username: ID!) {
                getUser(id: $username) {
                    USER_ID
                    NAME
                    LAST_NAME
                    ADDRESS{
                        ADDRESS_ID
                        CITY
                        ZIP
                        PHONE
                        STREET
                    }
                }
            }`,
            variables: {
                username: '',
            },
        };
    },

    getUserGames() {
        return {
            query: `query getUserGames($username: ID!){
                getRentedGames(id: $username) {
                    RENT_DATE
                    RETURN_DATE
                    Returned
                    GAME {
                        TITLE
                        AVAILABILITY
                        GAME_ID
                    }
                }
            }`,
            variables: {
                username: '',
            },
        };
    },
    getAllGames() {
        return {
            query: `{
                getGames {
                    GAME_ID
                    TITLE
                    DESCRIPTION
                    NUMBER_OF_PLAYERS
                    AVAILABILITY
                    BAIL
                    OPINION
                    CATEGORY
                    IMAGE
                }
            }`,
        };
    },

    getFilteredGames(categories, availability, min, max) {
        return {
            query: `{
                getFilteredGames(categories: "${categories}", availability: "${availability}", min: "${min}", max: "${max}") {
                    GAME_ID
                    TITLE
                    DESCRIPTION
                    NUMBER_OF_PLAYERS
                    AVAILABILITY
                    BAIL
                    OPINION
                    CATEGORY
                    IMAGE
                }
            }`,
        };
    },

    getCategories() {
        return {
            query: `{
                getCategories {
                    CATEGORY_ID 
                    NAME
                }
            }`,
        };
    },

    rentGame(gameID) {
        return {
            query: `query rentGame($username: ID!, $game:ID!){
                rentGame(clientID:$username, gameID: $game)
            }`,
            variables: {
                username: '',
                game: gameID,
            },
        };
    },

    getGame(gameID) {
        return {
            query: `query getGame($username: ID!, $gameID: ID!){
                getGame(id: $gameID, username: $username) {
                    GAME_ID
                    GAME_TIME
                    TITLE
                    DESCRIPTION
                    NUMBER_OF_PLAYERS
                    AVAILABILITY
                    BAIL
                    YOUR_OPINION
                    OPINION
                    CATEGORY
                    IMAGE   
                }
            }`,
            variables: {
                username: '',
                gameID,
            },
        };
    },

    returnGame(gameID) {
        return {
            query: `{
                returnGame(gameID: ${gameID})
            }`,
        };
    },

    rateGame(gameID, rating) {
        return {
            query: `mutation rateGame($gameID: ID!, $username: ID!, $rating: Float!) {
                        rateGame(gameID: $gameID, username: $username, rating: $rating){
                            OPINION
                            YOUR_OPINION
                        }
                    }`,
            variables: {
                username: '',
                gameID,
                rating,
            },
        };
    },

    updateUser(input) {
        return {
            query: `mutation updateUser($input: updateUser){
                updateUser(input: $input){
                    USER_ID
                    NAME
                    LAST_NAME
                    ADDRESS {
                        ADDRESS_ID
                        ZIP
                        STREET
                        CITY
                        PHONE
                    }
                }
            }`,
            variables: {
                input,
            },
        };
    },
};

export default queries;