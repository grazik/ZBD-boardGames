const queries = {
    validateUser(id, pwd) {
        return {
            query: `{validate(id:"${id}", pwd: "${pwd}") {
                USER_ID
                EMPLOYEE
            }}`,
        };
    },

    getUserAdmin(id) {
        return {
            query: `query getUserAdmin($id: ID!) {
                getUser(id: $id) {
                    USER_ID
                    NAME
                    LAST_NAME
                }
            }`,
            variables: {
                id,
            },
        };
    },

    getAllUsers() {
        return {
            query: `{
                getUsers {
                    USER_ID
                    HasEverythingReturned
                    NAME
                    LAST_NAME
                }
            }`,
        };
    },

    getShop(id) {
        return {
            query: `query getShop($id: ID!){
                getShop(id:$id) {
                    SHOP_ID
                    NUMBER_OF_EMPLOYEES
                    isNotCentral
                    ADDRESS {
                        ADDRESS_ID
                        CITY
                        STREET
                        ZIP
                        PHONE
                    }
                    EMPLOYEES
                }
            }`,
            variables: {
                id,
            },
        };
    },

    getAllShops() {
        return {
            query: `{
                getShops {
                    SHOP_ID
                    NUMBER_OF_EMPLOYEES
                    isNotCentral
                    ADDRESS {
                        CITY
                        STREET
                        ZIP
                        PHONE
                    }
                }
            }`,
        };
    },

    getEmployees() {
        return {
            query: `{
                getEmployees {
                    EMPLOYEE_ID
                }
            }`,
        };
    },

    getAllAchievements() {
        return {
            query: `{
                getAchievements {
                    ACHIEVEMENT_ID
                    NAME
                    CONDITION
                    IMAGE
                    DESCRIPTION
                }
            }`,
        };
    },

    getAchievement(id) {
        return {
            query: `query getAchievement($id: ID!){
                getAchievement(id:$id) {
                    ACHIEVEMENT_ID
                    NAME
                    CONDITION
                    IMAGE
                    DESCRIPTION
                }
            }`,
            variables: {
                id,
            },
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

    getCategory(id) {
        return {
            query: `query getCategory($id: ID!){
                getCategory(id:$id) {
                    CATEGORY_ID
                    NAME
                }
            }`,
            variables: {
                id,
            },
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

    updateAchievement(input) {
        return {
            query: `mutation updateAchievement($input: updateAchievement!, $isEmployee: Boolean){
                updateAchievement(input: $input, isEmployee: $isEmployee)
            }`,
            variables: {
                input,
                isEmployee: '',
            },
        };
    },

    updateGame(input) {
        return {
            query: `mutation updateGame($input: updateBoardGame!, $isEmployee: Boolean){
                updateGame(input: $input, isEmployee: $isEmployee)
            }`,
            variables: {
                input,
                isEmployee: '',
            },
        };
    },

    updateCategory(input) {
        return {
            query: `mutation updateCategory($input: updateCategory!, $isEmployee: Boolean){
                updateCategory(input: $input, isEmployee: $isEmployee)
            }`,
            variables: {
                input,
                isEmployee: '',
            },
        };
    },

    updateShop(input) {
        return {
            query: `mutation updateShop($input: updateShop!, $isEmployee: Boolean){
                updateShop(input: $input, isEmployee: $isEmployee)
            }`,
            variables: {
                input,
                isEmployee: '',
            },
        };
    },

    deleteAchievement(id) {
        return {
            query: `mutation deleteAchievement($id: ID!, $isEmployee: Boolean) {
                deleteAchievement(id: $id, isEmployee: $isEmployee)
            }`,
            variables: {
                id,
                isEmployee: '',
            },
        };
    },

    deleteShop(id) {
        return {
            query: `mutation deleteShop($id: ID!, $isEmployee: Boolean) {
                deleteShop(id: $id, isEmployee: $isEmployee)
            }`,
            variables: {
                id,
                isEmployee: '',
            },
        };
    },

    deleteCategory(id) {
        return {
            query: `mutation deleteCategory($id: ID!, $isEmployee: Boolean) {
                deleteCategory(id: $id, isEmployee: $isEmployee)
            }`,
            variables: {
                id,
                isEmployee: '',
            },
        };
    },

    deleteGame(id) {
        return {
            query: `mutation deleteGame($id: ID!, $isEmployee: Boolean) {
                deleteGame(id: $id, isEmployee: $isEmployee)
            }`,
            variables: {
                id,
                isEmployee: '',
            },
        };
    },

    deleteUser(id) {
        return {
            query: `mutation deleteUser($id: ID!, $isEmployee: Boolean) {
                deleteUser(id: $id, isEmployee: $isEmployee)
            }`,
            variables: {
                id,
                isEmployee: '',
            },
        };
    },
};

export default queries;