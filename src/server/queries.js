const queries = {
    getUser(username) {
        return {
            query: `{
              getUser(id: "${username}") {
                  NAME
                  LAST_NAME
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
};

export default queries;