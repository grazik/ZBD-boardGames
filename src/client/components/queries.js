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
                    NAME
                    LAST_NAME
                    ADDRESS{
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
};

export default queries;