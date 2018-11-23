const sendRequest = (url, query) => fetch(url, {
        credentials: 'same-origin',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(query),
    })
        .then(res => res.json()),
    queries = {
        validateUser(id, pwd) {
            return {
                query: `{validate(id:"${id}", pwd: "${pwd}") {
                USER_ID
                EMPLOYEE
            }}`,
            };
        },
    };

export { sendRequest, queries };